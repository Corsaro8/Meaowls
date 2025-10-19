import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { pets } from '@/db/schema';
import { eq, like, and, or, desc, asc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single pet by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json({ 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        }, { status: 400 });
      }

      const pet = await db.select()
        .from(pets)
        .where(eq(pets.id, parseInt(id)))
        .limit(1);

      if (pet.length === 0) {
        return NextResponse.json({ 
          error: 'Pet not found',
          code: 'PET_NOT_FOUND' 
        }, { status: 404 });
      }

      return NextResponse.json(pet[0]);
    }

    // List pets with pagination and search
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'createdAt';
    const order = searchParams.get('order') || 'desc';

    let query = db.select().from(pets);

    // Apply search filters
    if (search) {
      query = query.where(
        or(
          like(pets.name, `%${search}%`),
          like(pets.breed, `%${search}%`),
          like(pets.petType, `%${search}%`)
        )
      );
    }

    // Apply sorting
    const orderBy = order === 'asc' ? asc : desc;
    if (sort === 'name') {
      query = query.orderBy(orderBy(pets.name));
    } else if (sort === 'breed') {
      query = query.orderBy(orderBy(pets.breed));
    } else if (sort === 'petType') {
      query = query.orderBy(orderBy(pets.petType));
    } else if (sort === 'age') {
      query = query.orderBy(orderBy(pets.age));
    } else if (sort === 'updatedAt') {
      query = query.orderBy(orderBy(pets.updatedAt));
    } else {
      query = query.orderBy(orderBy(pets.createdAt));
    }

    const results = await query.limit(limit).offset(offset);

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
      name,
      petType, 
      breed, 
      weight, 
      age, 
      movement, 
      allergies, 
      intolerances, 
      sensitivities, 
      clinicalHistory, 
      photoUrl 
    } = requestBody;

    // Validation
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json({ 
        error: "Name is required and must be a non-empty string",
        code: "MISSING_NAME" 
      }, { status: 400 });
    }

    if (!petType || (petType !== 'cane' && petType !== 'gatto')) {
      return NextResponse.json({ 
        error: "Pet type is required and must be either 'cane' or 'gatto'",
        code: "INVALID_PET_TYPE" 
      }, { status: 400 });
    }

    if (!breed || typeof breed !== 'string' || breed.trim() === '') {
      return NextResponse.json({ 
        error: "Breed is required and must be a non-empty string",
        code: "MISSING_BREED" 
      }, { status: 400 });
    }

    if (!weight || typeof weight !== 'string' || weight.trim() === '') {
      return NextResponse.json({ 
        error: "Weight is required and must be a non-empty string",
        code: "MISSING_WEIGHT" 
      }, { status: 400 });
    }

    if (!age || typeof age !== 'string' || age.trim() === '') {
      return NextResponse.json({ 
        error: "Age is required and must be a non-empty string",
        code: "MISSING_AGE" 
      }, { status: 400 });
    }

    if (!movement || typeof movement !== 'string' || movement.trim() === '') {
      return NextResponse.json({ 
        error: "Movement is required and must be a non-empty string",
        code: "MISSING_MOVEMENT" 
      }, { status: 400 });
    }

    // Validate arrays and provide defaults
    const validatedAllergies = Array.isArray(allergies) ? allergies : [];
    const validatedIntolerances = Array.isArray(intolerances) ? intolerances : [];
    const validatedClinicalHistory = Array.isArray(clinicalHistory) ? clinicalHistory : [];

    const insertData = {
      name: name.trim(),
      petType: petType.trim(),
      breed: breed.trim(),
      weight: weight.trim(),
      age: age.trim(),
      movement: movement.trim(),
      allergies: validatedAllergies,
      intolerances: validatedIntolerances,
      sensitivities: sensitivities || null,
      clinicalHistory: validatedClinicalHistory,
      photoUrl: photoUrl || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const newPet = await db.insert(pets)
      .values(insertData)
      .returning();

    return NextResponse.json(newPet[0], { status: 201 });

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

    // Check if pet exists
    const existingPet = await db.select()
      .from(pets)
      .where(eq(pets.id, parseInt(id)))
      .limit(1);

    if (existingPet.length === 0) {
      return NextResponse.json({ 
        error: 'Pet not found',
        code: 'PET_NOT_FOUND' 
      }, { status: 404 });
    }

    const requestBody = await request.json();
    const updates: any = {};

    // Validate and update name if provided
    if (requestBody.name !== undefined) {
      if (!requestBody.name || typeof requestBody.name !== 'string' || requestBody.name.trim() === '') {
        return NextResponse.json({ 
          error: "Name must be a non-empty string",
          code: "INVALID_NAME" 
        }, { status: 400 });
      }
      updates.name = requestBody.name.trim();
    }

    // Validate and update fields if provided
    if (requestBody.petType !== undefined) {
      if (requestBody.petType !== 'cane' && requestBody.petType !== 'gatto') {
        return NextResponse.json({ 
          error: "Pet type must be either 'cane' or 'gatto'",
          code: "INVALID_PET_TYPE" 
        }, { status: 400 });
      }
      updates.petType = requestBody.petType.trim();
    }

    if (requestBody.breed !== undefined) {
      if (!requestBody.breed || typeof requestBody.breed !== 'string' || requestBody.breed.trim() === '') {
        return NextResponse.json({ 
          error: "Breed must be a non-empty string",
          code: "INVALID_BREED" 
        }, { status: 400 });
      }
      updates.breed = requestBody.breed.trim();
    }

    if (requestBody.weight !== undefined) {
      if (!requestBody.weight || typeof requestBody.weight !== 'string' || requestBody.weight.trim() === '') {
        return NextResponse.json({ 
          error: "Weight must be a non-empty string",
          code: "INVALID_WEIGHT" 
        }, { status: 400 });
      }
      updates.weight = requestBody.weight.trim();
    }

    if (requestBody.age !== undefined) {
      if (!requestBody.age || typeof requestBody.age !== 'string' || requestBody.age.trim() === '') {
        return NextResponse.json({ 
          error: "Age must be a non-empty string",
          code: "INVALID_AGE" 
        }, { status: 400 });
      }
      updates.age = requestBody.age.trim();
    }

    if (requestBody.movement !== undefined) {
      if (!requestBody.movement || typeof requestBody.movement !== 'string' || requestBody.movement.trim() === '') {
        return NextResponse.json({ 
          error: "Movement must be a non-empty string",
          code: "INVALID_MOVEMENT" 
        }, { status: 400 });
      }
      updates.movement = requestBody.movement.trim();
    }

    if (requestBody.allergies !== undefined) {
      if (!Array.isArray(requestBody.allergies)) {
        return NextResponse.json({ 
          error: "Allergies must be an array",
          code: "INVALID_ALLERGIES" 
        }, { status: 400 });
      }
      updates.allergies = requestBody.allergies;
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

    if (requestBody.sensitivities !== undefined) {
      updates.sensitivities = requestBody.sensitivities;
    }

    if (requestBody.clinicalHistory !== undefined) {
      if (!Array.isArray(requestBody.clinicalHistory)) {
        return NextResponse.json({ 
          error: "Clinical history must be an array",
          code: "INVALID_CLINICAL_HISTORY" 
        }, { status: 400 });
      }
      updates.clinicalHistory = requestBody.clinicalHistory;
    }

    if (requestBody.photoUrl !== undefined) {
      updates.photoUrl = requestBody.photoUrl;
    }

    // Always update timestamp
    updates.updatedAt = new Date().toISOString();

    const updatedPet = await db.update(pets)
      .set(updates)
      .where(eq(pets.id, parseInt(id)))
      .returning();

    return NextResponse.json(updatedPet[0]);

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

    // Check if pet exists
    const existingPet = await db.select()
      .from(pets)
      .where(eq(pets.id, parseInt(id)))
      .limit(1);

    if (existingPet.length === 0) {
      return NextResponse.json({ 
        error: 'Pet not found',
        code: 'PET_NOT_FOUND' 
      }, { status: 404 });
    }

    const deletedPet = await db.delete(pets)
      .where(eq(pets.id, parseInt(id)))
      .returning();

    return NextResponse.json({
      message: 'Pet deleted successfully',
      pet: deletedPet[0]
    });

  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}