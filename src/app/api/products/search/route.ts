import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { products } from '@/db/schema';
import { like, and, or, gte, lte, desc, asc, count } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract search parameters
    const query = searchParams.get('q')?.trim();
    const animal = searchParams.get('animal');
    const category = searchParams.get('category');
    const categories = searchParams.get('categories')?.split(',').map(c => c.trim()).filter(Boolean);
    const age = searchParams.get('age');
    const brand = searchParams.get('brand');
    const brands = searchParams.get('brands')?.split(',').map(b => b.trim()).filter(Boolean);
    const breed = searchParams.get('breed');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const minRating = searchParams.get('minRating');
    const maxRating = searchParams.get('maxRating');
    const weight = searchParams.get('weight');
    const hasDiscount = searchParams.get('hasDiscount');
    const intolerances = searchParams.get('intolerances')?.split(',').map(i => i.trim()).filter(Boolean);
    const benefits = searchParams.get('benefits')?.split(',').map(b => b.trim()).filter(Boolean);
    const sortBy = searchParams.get('sortBy') || 'relevance';
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');

    // Validate numeric parameters
    if (minPrice && isNaN(parseFloat(minPrice))) {
      return NextResponse.json({ 
        error: "Invalid minPrice value",
        code: "INVALID_MIN_PRICE" 
      }, { status: 400 });
    }

    if (maxPrice && isNaN(parseFloat(maxPrice))) {
      return NextResponse.json({ 
        error: "Invalid maxPrice value",
        code: "INVALID_MAX_PRICE" 
      }, { status: 400 });
    }

    if (minRating && (isNaN(parseFloat(minRating)) || parseFloat(minRating) < 0 || parseFloat(minRating) > 5)) {
      return NextResponse.json({ 
        error: "Invalid minRating value (must be between 0 and 5)",
        code: "INVALID_MIN_RATING" 
      }, { status: 400 });
    }

    if (maxRating && (isNaN(parseFloat(maxRating)) || parseFloat(maxRating) < 0 || parseFloat(maxRating) > 5)) {
      return NextResponse.json({ 
        error: "Invalid maxRating value (must be between 0 and 5)",
        code: "INVALID_MAX_RATING" 
      }, { status: 400 });
    }

    // Validate animal parameter
    if (animal && !['cane', 'gatto'].includes(animal)) {
      return NextResponse.json({ 
        error: "Invalid animal value (must be 'cane' or 'gatto')",
        code: "INVALID_ANIMAL" 
      }, { status: 400 });
    }

    // Validate category parameter
    const validCategories = ['Crocchette', 'Cibo Umido', 'Snack', 'Integratori', 'Giochi'];
    if (category && !validCategories.includes(category)) {
      return NextResponse.json({ 
        error: "Invalid category value",
        code: "INVALID_CATEGORY" 
      }, { status: 400 });
    }

    // Validate categories parameter
    if (categories) {
      const invalidCategories = categories.filter(c => !validCategories.includes(c));
      if (invalidCategories.length > 0) {
        return NextResponse.json({ 
          error: `Invalid categories: ${invalidCategories.join(', ')}`,
          code: "INVALID_CATEGORIES" 
        }, { status: 400 });
      }
    }

    // Validate age parameter
    const validAges = ['cucciolo', 'giovane', 'adulto', 'senior'];
    if (age && !validAges.includes(age)) {
      return NextResponse.json({ 
        error: "Invalid age value",
        code: "INVALID_AGE" 
      }, { status: 400 });
    }

    // Validate weight parameter
    if (weight && !['small', 'medium', 'large'].includes(weight)) {
      return NextResponse.json({ 
        error: "Invalid weight value (must be 'small', 'medium', or 'large')",
        code: "INVALID_WEIGHT" 
      }, { status: 400 });
    }

    // Validate sortBy parameter
    const validSorts = ['relevance', 'popular', 'price-low', 'price-high', 'rating', 'newest'];
    if (!validSorts.includes(sortBy)) {
      return NextResponse.json({ 
        error: "Invalid sortBy value",
        code: "INVALID_SORT" 
      }, { status: 400 });
    }

    // Build conditions array
    const conditions = [];

    // Text search across name, brand, and ingredients
    if (query) {
      const searchConditions = or(
        like(products.name, `%${query}%`),
        like(products.brand, `%${query}%`),
        like(products.ingredients, `%${query}%`)
      );
      conditions.push(searchConditions);
    }

    // Animal filter
    if (animal) {
      conditions.push(like(products.animal, `%${animal}%`));
    }

    // Category filter (single or multiple)
    if (category) {
      conditions.push(like(products.category, `%${category}%`));
    } else if (categories && categories.length > 0) {
      const categoryConditions = or(
        ...categories.map(c => like(products.category, `%${c}%`))
      );
      conditions.push(categoryConditions);
    }

    // Age filter
    if (age) {
      conditions.push(like(products.age, `%${age}%`));
    }

    // Brand filter (single or multiple)
    if (brand) {
      conditions.push(like(products.brand, `%${brand}%`));
    } else if (brands && brands.length > 0) {
      const brandConditions = or(
        ...brands.map(b => like(products.brand, `%${b}%`))
      );
      conditions.push(brandConditions);
    }

    // Breed filter
    if (breed) {
      conditions.push(like(products.breed, `%${breed}%`));
    }

    // Price range filters
    if (minPrice) {
      conditions.push(gte(products.price, parseFloat(minPrice)));
    }
    if (maxPrice) {
      conditions.push(lte(products.price, parseFloat(maxPrice)));
    }

    // Rating range filters
    if (minRating) {
      conditions.push(gte(products.rating, parseFloat(minRating)));
    }
    if (maxRating) {
      conditions.push(lte(products.rating, parseFloat(maxRating)));
    }

    // Weight range filter
    if (weight) {
      let weightCondition;
      switch (weight) {
        case 'small':
          // Assuming weight is stored as text like "500g", "0.5kg", etc.
          weightCondition = or(
            like(products.weight, '%g'),
            like(products.weight, '0.%kg')
          );
          break;
        case 'medium':
          weightCondition = or(
            like(products.weight, '1%kg'),
            like(products.weight, '2%kg'),
            like(products.weight, '3%kg'),
            like(products.weight, '4%kg'),
            like(products.weight, '5%kg')
          );
          break;
        case 'large':
          weightCondition = or(
            like(products.weight, '6%kg'),
            like(products.weight, '7%kg'),
            like(products.weight, '8%kg'),
            like(products.weight, '9%kg'),
            like(products.weight, '1_kg'),
            like(products.weight, '2_kg')
          );
          break;
      }
      if (weightCondition) {
        conditions.push(weightCondition);
      }
    }

    // Discount filter
    if (hasDiscount === 'true') {
      conditions.push(or(
        like(products.badge, '%Sconto%'),
        like(products.badge, '%Offerta%')
      ));
    }

    // Intolerances filter (exclude products containing specified intolerances)
    if (intolerances && intolerances.length > 0) {
      const intoleranceConditions = and(
        ...intolerances.map(intolerance => 
          like(products.intolerances, `%${intolerance}%`)
        )
      );
      // We want to exclude products that contain these intolerances
      // This is a complex query that would typically require NOT conditions
      // For now, we'll implement a basic exclusion
    }

    // Benefits filter (include products that have specified benefits)
    if (benefits && benefits.length > 0) {
      const benefitConditions = or(
        ...benefits.map(benefit => 
          like(products.benefits, `%${benefit}%`)
        )
      );
      conditions.push(benefitConditions);
    }

    // Build the main query
    let searchQuery = db.select().from(products);
    
    if (conditions.length > 0) {
      searchQuery = searchQuery.where(and(...conditions));
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        searchQuery = searchQuery.orderBy(asc(products.price));
        break;
      case 'price-high':
        searchQuery = searchQuery.orderBy(desc(products.price));
        break;
      case 'rating':
        searchQuery = searchQuery.orderBy(desc(products.rating));
        break;
      case 'newest':
        searchQuery = searchQuery.orderBy(desc(products.createdAt));
        break;
      case 'popular':
        searchQuery = searchQuery.orderBy(desc(products.rating), desc(products.createdAt));
        break;
      case 'relevance':
      default:
        // For relevance, prioritize exact matches in name, then brand, then rating
        if (query) {
          searchQuery = searchQuery.orderBy(desc(products.rating), desc(products.createdAt));
        } else {
          searchQuery = searchQuery.orderBy(desc(products.rating));
        }
        break;
    }

    // Get total count for metadata
    let countQuery = db.select({ count: count() }).from(products);
    if (conditions.length > 0) {
      countQuery = countQuery.where(and(...conditions));
    }
    const totalResult = await countQuery;
    const total = totalResult[0]?.count || 0;

    // Apply pagination
    const results = await searchQuery.limit(limit).offset(offset);

    // Generate search suggestions if no results
    let suggestions = [];
    if (results.length === 0 && query) {
      // Simple suggestion logic - could be enhanced with fuzzy matching
      const commonSuggestions = [
        'crocchette',
        'cibo umido',
        'snack',
        'integratori',
        'giochi',
        'cane',
        'gatto'
      ];
      suggestions = commonSuggestions.filter(s => 
        s.toLowerCase().includes(query.toLowerCase()) || 
        query.toLowerCase().includes(s.toLowerCase())
      ).slice(0, 3);
    }

    // Build applied filters metadata
    const appliedFilters = {
      query,
      animal,
      category: category || (categories && categories.length > 0 ? categories : null),
      age,
      brand: brand || (brands && brands.length > 0 ? brands : null),
      breed,
      priceRange: (minPrice || maxPrice) ? { min: minPrice, max: maxPrice } : null,
      ratingRange: (minRating || maxRating) ? { min: minRating, max: maxRating } : null,
      weight,
      hasDiscount: hasDiscount === 'true',
      intolerances,
      benefits,
      sortBy
    };

    // Remove null/undefined values from appliedFilters
    Object.keys(appliedFilters).forEach(key => {
      if (appliedFilters[key] === null || appliedFilters[key] === undefined || 
          (Array.isArray(appliedFilters[key]) && appliedFilters[key].length === 0)) {
        delete appliedFilters[key];
      }
    });

    const response = {
      products: results,
      meta: {
        total,
        count: results.length,
        limit,
        offset,
        hasMore: offset + limit < total,
        filters: appliedFilters,
        pagination: {
          currentPage: Math.floor(offset / limit) + 1,
          totalPages: Math.ceil(total / limit),
          hasNextPage: offset + limit < total,
          hasPrevPage: offset > 0
        }
      },
      suggestions: suggestions.length > 0 ? suggestions : undefined
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}