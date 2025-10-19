import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { products } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

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
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    const requestBody = await request.json();

    // Validate required fields if provided
    const updates: any = {};

    if (requestBody.name !== undefined) {
      if (!requestBody.name || typeof requestBody.name !== 'string' || requestBody.name.trim().length === 0) {
        return NextResponse.json({ 
          error: "Product name is required and must be a non-empty string",
          code: "INVALID_NAME" 
        }, { status: 400 });
      }
      updates.name = requestBody.name.trim();
    }

    if (requestBody.price !== undefined) {
      if (typeof requestBody.price !== 'number' || requestBody.price <= 0) {
        return NextResponse.json({ 
          error: "Price must be a positive number",
          code: "INVALID_PRICE" 
        }, { status: 400 });
      }
      updates.price = requestBody.price;
    }

    if (requestBody.weight !== undefined) {
      if (!requestBody.weight || typeof requestBody.weight !== 'string' || requestBody.weight.trim().length === 0) {
        return NextResponse.json({ 
          error: "Weight is required and must be a non-empty string",
          code: "INVALID_WEIGHT" 
        }, { status: 400 });
      }
      updates.weight = requestBody.weight.trim();
    }

    if (requestBody.rating !== undefined) {
      if (typeof requestBody.rating !== 'number' || requestBody.rating < 0 || requestBody.rating > 5) {
        return NextResponse.json({ 
          error: "Rating must be a number between 0 and 5",
          code: "INVALID_RATING" 
        }, { status: 400 });
      }
      updates.rating = requestBody.rating;
    }

    if (requestBody.category !== undefined) {
      if (!requestBody.category || typeof requestBody.category !== 'string' || requestBody.category.trim().length === 0) {
        return NextResponse.json({ 
          error: "Category is required and must be a non-empty string",
          code: "INVALID_CATEGORY" 
        }, { status: 400 });
      }
      updates.category = requestBody.category.trim();
    }

    if (requestBody.animal !== undefined) {
      if (!requestBody.animal || typeof requestBody.animal !== 'string' || requestBody.animal.trim().length === 0) {
        return NextResponse.json({ 
          error: "Animal is required and must be a non-empty string",
          code: "INVALID_ANIMAL" 
        }, { status: 400 });
      }
      updates.animal = requestBody.animal.trim();
    }

    if (requestBody.brand !== undefined) {
      if (!requestBody.brand || typeof requestBody.brand !== 'string' || requestBody.brand.trim().length === 0) {
        return NextResponse.json({ 
          error: "Brand is required and must be a non-empty string",
          code: "INVALID_BRAND" 
        }, { status: 400 });
      }
      updates.brand = requestBody.brand.trim();
    }

    if (requestBody.intolerances !== undefined) {
      if (!Array.isArray(requestBody.intolerances)) {
        return NextResponse.json({ 
          error: "Intolerances must be an array",
          code: "INVALID_INTOLERANCES" 
        }, { status: 400 });
      }
      updates.intolerances = requestBody.intolerances;
    }

    if (requestBody.tags !== undefined) {
      if (!Array.isArray(requestBody.tags)) {
        return NextResponse.json({ 
          error: "Tags must be an array",
          code: "INVALID_TAGS" 
        }, { status: 400 });
      }
      updates.tags = requestBody.tags;
    }

    if (requestBody.ingredients !== undefined) {
      if (!requestBody.ingredients || typeof requestBody.ingredients !== 'string' || requestBody.ingredients.trim().length === 0) {
        return NextResponse.json({ 
          error: "Ingredients is required and must be a non-empty string",
          code: "INVALID_INGREDIENTS" 
        }, { status: 400 });
      }
      updates.ingredients = requestBody.ingredients.trim();
    }

    if (requestBody.benefits !== undefined) {
      if (!Array.isArray(requestBody.benefits)) {
        return NextResponse.json({ 
          error: "Benefits must be an array",
          code: "INVALID_BENEFITS" 
        }, { status: 400 });
      }
      updates.benefits = requestBody.benefits;
    }

    if (requestBody.usage !== undefined) {
      if (!requestBody.usage || typeof requestBody.usage !== 'string' || requestBody.usage.trim().length === 0) {
        return NextResponse.json({ 
          error: "Usage is required and must be a non-empty string",
          code: "INVALID_USAGE" 
        }, { status: 400 });
      }
      updates.usage = requestBody.usage.trim();
    }

    // Handle optional fields
    if (requestBody.badge !== undefined) {
      updates.badge = requestBody.badge ? requestBody.badge.trim() : null;
    }

    if (requestBody.subcategory !== undefined) {
      updates.subcategory = requestBody.subcategory ? requestBody.subcategory.trim() : null;
    }

    if (requestBody.age !== undefined) {
      updates.age = requestBody.age ? requestBody.age.trim() : null;
    }

    if (requestBody.breed !== undefined) {
      updates.breed = requestBody.breed ? requestBody.breed.trim() : null;
    }

    if (requestBody.contraindications !== undefined) {
      updates.contraindications = requestBody.contraindications ? requestBody.contraindications.trim() : null;
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

    // Always update updatedAt timestamp
    updates.updatedAt = new Date().toISOString();

    const updated = await db.update(products)
      .set(updates)
      .where(eq(products.id, parseInt(id)))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json({ 
        error: 'Product not found' 
      }, { status: 404 });
    }

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    // Check if product exists before deleting
    const existingProduct = await db.select()
      .from(products)
      .where(eq(products.id, parseInt(id)))
      .limit(1);

    if (existingProduct.length === 0) {
      return NextResponse.json({ 
        error: 'Product not found' 
      }, { status: 404 });
    }

    const deleted = await db.delete(products)
      .where(eq(products.id, parseInt(id)))
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json({ 
        error: 'Product not found' 
      }, { status: 404 });
    }

    return NextResponse.json({ 
      message: 'Product deleted successfully',
      product: deleted[0]
    });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}