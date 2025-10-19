import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { products } from '@/db/schema';
import { eq, like, and, or, desc, asc, gte, lte } from 'drizzle-orm';

const VALID_CATEGORIES = ['Crocchette', 'Cibo Umido', 'Snack', 'Integratori', 'Giochi'];
const VALID_ANIMALS = ['cane', 'gatto'];
const VALID_AGES = ['cucciolo', 'giovane', 'adulto', 'senior'];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single product fetch by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json({ 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        }, { status: 400 });
      }

      const product = await db.select()
        .from(products)
        .where(eq(products.id, parseInt(id)))
        .limit(1);

      if (product.length === 0) {
        return NextResponse.json({ 
          error: 'Product not found' 
        }, { status: 404 });
      }

      return NextResponse.json(product[0]);
    }

    // List products with filtering
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search');
    const animal = searchParams.get('animal');
    const category = searchParams.get('category');
    const age = searchParams.get('age');
    const brand = searchParams.get('brand');
    const breed = searchParams.get('breed');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sortBy = searchParams.get('sortBy') || 'popular';
    const intolerancesFilter = searchParams.get('intolerances');

    let query = db.select().from(products);
    const conditions = [];

    // Animal filter
    if (animal && VALID_ANIMALS.includes(animal)) {
      conditions.push(eq(products.animal, animal));
    }

    // Category filter
    if (category && VALID_CATEGORIES.includes(category)) {
      conditions.push(eq(products.category, category));
    }

    // Age filter
    if (age && VALID_AGES.includes(age)) {
      conditions.push(eq(products.age, age));
    }

    // Brand filter
    if (brand) {
      conditions.push(eq(products.brand, brand));
    }

    // Breed filter
    if (breed) {
      conditions.push(eq(products.breed, breed));
    }

    // Price range filters
    if (minPrice && !isNaN(parseFloat(minPrice))) {
      conditions.push(gte(products.price, parseFloat(minPrice)));
    }
    if (maxPrice && !isNaN(parseFloat(maxPrice))) {
      conditions.push(lte(products.price, parseFloat(maxPrice)));
    }

    // Search filter
    if (search) {
      const searchCondition = or(
        like(products.name, `%${search}%`),
        like(products.ingredients, `%${search}%`)
      );
      conditions.push(searchCondition);
    }

    // Apply all conditions
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        query = query.orderBy(asc(products.price));
        break;
      case 'price-high':
        query = query.orderBy(desc(products.price));
        break;
      case 'rating':
        query = query.orderBy(desc(products.rating));
        break;
      case 'popular':
      default:
        query = query.orderBy(desc(products.rating));
        break;
    }

    let results = await query.limit(limit).offset(offset);

    // Client-side intolerance filtering (since SQLite JSON querying is limited)
    if (intolerancesFilter) {
      const intolerancesToAvoid = intolerancesFilter.split(',').map(i => i.trim());
      results = results.filter(product => {
        const productIntolerances = Array.isArray(product.intolerances) ? product.intolerances : [];
        return !intolerancesToAvoid.some(avoid => 
          productIntolerances.some(intolerance => 
            intolerance.toLowerCase().includes(avoid.toLowerCase())
          )
        );
      });
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const {
      name, price, weight, badge, rating, category, subcategory,
      animal, age, brand, breed, intolerances, tags, ingredients,
      benefits, contraindications, usage
    } = requestBody;

    // Validate required fields
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ 
        error: "Product name is required",
        code: "MISSING_NAME" 
      }, { status: 400 });
    }

    if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      return NextResponse.json({ 
        error: "Valid price greater than 0 is required",
        code: "INVALID_PRICE" 
      }, { status: 400 });
    }

    if (!weight || typeof weight !== 'string' || !weight.trim()) {
      return NextResponse.json({ 
        error: "Weight is required",
        code: "MISSING_WEIGHT" 
      }, { status: 400 });
    }

    if (!rating || isNaN(parseFloat(rating)) || parseFloat(rating) < 0 || parseFloat(rating) > 5) {
      return NextResponse.json({ 
        error: "Rating must be between 0 and 5",
        code: "INVALID_RATING" 
      }, { status: 400 });
    }

    if (!category || !VALID_CATEGORIES.includes(category)) {
      return NextResponse.json({ 
        error: "Category must be one of: " + VALID_CATEGORIES.join(', '),
        code: "INVALID_CATEGORY" 
      }, { status: 400 });
    }

    if (!animal || !VALID_ANIMALS.includes(animal)) {
      return NextResponse.json({ 
        error: "Animal must be 'cane' or 'gatto'",
        code: "INVALID_ANIMAL" 
      }, { status: 400 });
    }

    if (!brand || typeof brand !== 'string' || !brand.trim()) {
      return NextResponse.json({ 
        error: "Brand is required",
        code: "MISSING_BRAND" 
      }, { status: 400 });
    }

    if (!intolerances || !Array.isArray(intolerances)) {
      return NextResponse.json({ 
        error: "Intolerances must be an array",
        code: "INVALID_INTOLERANCES" 
      }, { status: 400 });
    }

    if (!tags || !Array.isArray(tags)) {
      return NextResponse.json({ 
        error: "Tags must be an array",
        code: "INVALID_TAGS" 
      }, { status: 400 });
    }

    if (!ingredients || typeof ingredients !== 'string' || !ingredients.trim()) {
      return NextResponse.json({ 
        error: "Ingredients are required",
        code: "MISSING_INGREDIENTS" 
      }, { status: 400 });
    }

    if (!benefits || !Array.isArray(benefits)) {
      return NextResponse.json({ 
        error: "Benefits must be an array",
        code: "INVALID_BENEFITS" 
      }, { status: 400 });
    }

    if (!usage || typeof usage !== 'string' || !usage.trim()) {
      return NextResponse.json({ 
        error: "Usage instructions are required",
        code: "MISSING_USAGE" 
      }, { status: 400 });
    }

    // Validate age if provided
    if (age && !VALID_AGES.includes(age)) {
      return NextResponse.json({ 
        error: "Age must be one of: " + VALID_AGES.join(', '),
        code: "INVALID_AGE" 
      }, { status: 400 });
    }

    const newProduct = await db.insert(products).values({
      name: name.trim(),
      price: parseFloat(price),
      weight: weight.trim(),
      badge: badge ? badge.trim() : null,
      rating: parseFloat(rating),
      category,
      subcategory: subcategory ? subcategory.trim() : null,
      animal,
      age: age || null,
      brand: brand.trim(),
      breed: breed ? breed.trim() : null,
      intolerances,
      tags,
      ingredients: ingredients.trim(),
      benefits,
      contraindications: contraindications ? contraindications.trim() : null,
      usage: usage.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }).returning();

    return NextResponse.json(newProduct[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    const requestBody = await request.json();
    const {
      name, price, weight, badge, rating, category, subcategory,
      animal, age, brand, breed, intolerances, tags, ingredients,
      benefits, contraindications, usage
    } = requestBody;

    // Check if product exists
    const existingProduct = await db.select()
      .from(products)
      .where(eq(products.id, parseInt(id)))
      .limit(1);

    if (existingProduct.length === 0) {
      return NextResponse.json({ 
        error: 'Product not found' 
      }, { status: 404 });
    }

    // Validate fields if provided
    if (price !== undefined && (isNaN(parseFloat(price)) || parseFloat(price) <= 0)) {
      return NextResponse.json({ 
        error: "Valid price greater than 0 is required",
        code: "INVALID_PRICE" 
      }, { status: 400 });
    }

    if (rating !== undefined && (isNaN(parseFloat(rating)) || parseFloat(rating) < 0 || parseFloat(rating) > 5)) {
      return NextResponse.json({ 
        error: "Rating must be between 0 and 5",
        code: "INVALID_RATING" 
      }, { status: 400 });
    }

    if (category !== undefined && !VALID_CATEGORIES.includes(category)) {
      return NextResponse.json({ 
        error: "Category must be one of: " + VALID_CATEGORIES.join(', '),
        code: "INVALID_CATEGORY" 
      }, { status: 400 });
    }

    if (animal !== undefined && !VALID_ANIMALS.includes(animal)) {
      return NextResponse.json({ 
        error: "Animal must be 'cane' or 'gatto'",
        code: "INVALID_ANIMAL" 
      }, { status: 400 });
    }

    if (age !== undefined && age !== null && !VALID_AGES.includes(age)) {
      return NextResponse.json({ 
        error: "Age must be one of: " + VALID_AGES.join(', '),
        code: "INVALID_AGE" 
      }, { status: 400 });
    }

    if (intolerances !== undefined && !Array.isArray(intolerances)) {
      return NextResponse.json({ 
        error: "Intolerances must be an array",
        code: "INVALID_INTOLERANCES" 
      }, { status: 400 });
    }

    if (tags !== undefined && !Array.isArray(tags)) {
      return NextResponse.json({ 
        error: "Tags must be an array",
        code: "INVALID_TAGS" 
      }, { status: 400 });
    }

    if (benefits !== undefined && !Array.isArray(benefits)) {
      return NextResponse.json({ 
        error: "Benefits must be an array",
        code: "INVALID_BENEFITS" 
      }, { status: 400 });
    }

    // Build update object with only provided fields
    const updateData: any = {
      updatedAt: new Date().toISOString()
    };

    if (name !== undefined) updateData.name = name.trim();
    if (price !== undefined) updateData.price = parseFloat(price);
    if (weight !== undefined) updateData.weight = weight.trim();
    if (badge !== undefined) updateData.badge = badge ? badge.trim() : null;
    if (rating !== undefined) updateData.rating = parseFloat(rating);
    if (category !== undefined) updateData.category = category;
    if (subcategory !== undefined) updateData.subcategory = subcategory ? subcategory.trim() : null;
    if (animal !== undefined) updateData.animal = animal;
    if (age !== undefined) updateData.age = age;
    if (brand !== undefined) updateData.brand = brand.trim();
    if (breed !== undefined) updateData.breed = breed ? breed.trim() : null;
    if (intolerances !== undefined) updateData.intolerances = intolerances;
    if (tags !== undefined) updateData.tags = tags;
    if (ingredients !== undefined) updateData.ingredients = ingredients.trim();
    if (benefits !== undefined) updateData.benefits = benefits;
    if (contraindications !== undefined) updateData.contraindications = contraindications ? contraindications.trim() : null;
    if (usage !== undefined) updateData.usage = usage.trim();

    const updatedProduct = await db.update(products)
      .set(updateData)
      .where(eq(products.id, parseInt(id)))
      .returning();

    return NextResponse.json(updatedProduct[0]);
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    // Check if product exists
    const existingProduct = await db.select()
      .from(products)
      .where(eq(products.id, parseInt(id)))
      .limit(1);

    if (existingProduct.length === 0) {
      return NextResponse.json({ 
        error: 'Product not found' 
      }, { status: 404 });
    }

    const deletedProduct = await db.delete(products)
      .where(eq(products.id, parseInt(id)))
      .returning();

    return NextResponse.json({
      message: 'Product deleted successfully',
      product: deletedProduct[0]
    });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}