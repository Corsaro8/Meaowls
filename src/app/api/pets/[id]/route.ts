import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { pets, petHistory } from '@/db/schema';
import { eq } from 'drizzle-orm';

interface PetParams {
  id: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: PetParams }
) {
  try {
    const id = params.id;
    
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
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: PetParams }
) {
  try {
    const id = params.id;
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

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
      photoUrl,
      userName
    } = requestBody;

    // Validate name if provided
    if (name !== undefined && (typeof name !== 'string' || name.trim() === '')) {
      return NextResponse.json({ 
        error: "Name must be a non-empty string",
        code: "INVALID_NAME" 
      }, { status: 400 });
    }

    // Validate petType if provided
    if (petType !== undefined && petType !== 'cane' && petType !== 'gatto') {
      return NextResponse.json({ 
        error: "Pet type must be either 'cane' or 'gatto'",
        code: "INVALID_PET_TYPE" 
      }, { status: 400 });
    }

    // Validate required fields if provided (must be non-empty strings)
    const requiredStringFields = { breed, weight, age, movement };
    for (const [fieldName, value] of Object.entries(requiredStringFields)) {
      if (value !== undefined && (typeof value !== 'string' || value.trim() === '')) {
        return NextResponse.json({ 
          error: `${fieldName} must be a non-empty string`,
          code: `INVALID_${fieldName.toUpperCase()}` 
        }, { status: 400 });
      }
    }

    // Validate arrays if provided
    const arrayFields = { allergies, intolerances, clinicalHistory };
    for (const [fieldName, value] of Object.entries(arrayFields)) {
      if (value !== undefined && !Array.isArray(value)) {
        return NextResponse.json({ 
          error: `${fieldName} must be an array`,
          code: `INVALID_${fieldName.toUpperCase()}` 
        }, { status: 400 });
      }
    }

    // Track changes for history
    const changes = [];
    const oldPet = existingPet[0];
    const currentTimestamp = new Date().toISOString();

    // Build update object with only provided fields
    const updates: any = {
      updatedAt: currentTimestamp
    };

    if (name !== undefined) {
      updates.name = name.trim();
      if (oldPet.name !== name.trim()) {
        changes.push({
          modificationType: 'Nome modificato',
          oldValue: oldPet.name,
          newValue: name.trim()
        });
      }
    }

    if (petType !== undefined) {
      updates.petType = petType;
      if (oldPet.petType !== petType) {
        changes.push({
          modificationType: 'Tipo di animale modificato',
          oldValue: oldPet.petType,
          newValue: petType
        });
      }
    }
    
    if (breed !== undefined) {
      updates.breed = breed.trim();
      if (oldPet.breed !== breed.trim()) {
        changes.push({
          modificationType: 'Razza modificata',
          oldValue: oldPet.breed,
          newValue: breed.trim()
        });
      }
    }
    
    if (weight !== undefined) {
      updates.weight = weight.trim();
      if (oldPet.weight !== weight.trim()) {
        changes.push({
          modificationType: 'Peso modificato',
          oldValue: oldPet.weight,
          newValue: weight.trim()
        });
      }
    }
    
    if (age !== undefined) {
      updates.age = age.trim();
      if (oldPet.age !== age.trim()) {
        changes.push({
          modificationType: 'Età modificata',
          oldValue: oldPet.age,
          newValue: age.trim()
        });
      }
    }
    
    if (movement !== undefined) {
      updates.movement = movement.trim();
      if (oldPet.movement !== movement.trim()) {
        changes.push({
          modificationType: 'Movimento modificato',
          oldValue: oldPet.movement,
          newValue: movement.trim()
        });
      }
    }
    
    if (allergies !== undefined) {
      updates.allergies = allergies;
      const oldAllergiesStr = JSON.stringify(oldPet.allergies || []);
      const newAllergiesStr = JSON.stringify(allergies);
      if (oldAllergiesStr !== newAllergiesStr) {
        changes.push({
          modificationType: 'Allergie aggiornate',
          oldValue: oldAllergiesStr,
          newValue: newAllergiesStr
        });
      }
    }
    
    if (intolerances !== undefined) {
      updates.intolerances = intolerances;
      const oldIntolerancesStr = JSON.stringify(oldPet.intolerances || []);
      const newIntolerancesStr = JSON.stringify(intolerances);
      if (oldIntolerancesStr !== newIntolerancesStr) {
        changes.push({
          modificationType: 'Intolleranze modificate',
          oldValue: oldIntolerancesStr,
          newValue: newIntolerancesStr
        });
      }
    }
    
    if (sensitivities !== undefined) {
      updates.sensitivities = sensitivities;
      if (oldPet.sensitivities !== sensitivities) {
        changes.push({
          modificationType: 'Sensibilità modificate',
          oldValue: oldPet.sensitivities || '',
          newValue: sensitivities || ''
        });
      }
    }
    
    if (clinicalHistory !== undefined) {
      updates.clinicalHistory = clinicalHistory;
      const oldHistoryStr = JSON.stringify(oldPet.clinicalHistory || []);
      const newHistoryStr = JSON.stringify(clinicalHistory);
      if (oldHistoryStr !== newHistoryStr) {
        changes.push({
          modificationType: 'Storia clinica aggiornata',
          oldValue: oldHistoryStr,
          newValue: newHistoryStr
        });
      }
    }
    
    if (photoUrl !== undefined) {
      updates.photoUrl = photoUrl;
      if (oldPet.photoUrl !== photoUrl) {
        changes.push({
          modificationType: 'Foto profilo modificata',
          oldValue: oldPet.photoUrl || '',
          newValue: photoUrl || ''
        });
      }
    }

    const updatedPet = await db.update(pets)
      .set(updates)
      .where(eq(pets.id, parseInt(id)))
      .returning();

    if (updatedPet.length === 0) {
      return NextResponse.json({ 
        error: 'Pet not found',
        code: 'PET_NOT_FOUND' 
      }, { status: 404 });
    }

    // Create history entries for all changes
    if (changes.length > 0) {
      const historyEntries = changes.map(change => ({
        petId: parseInt(id),
        userName: userName || 'Sistema',
        modificationType: change.modificationType,
        oldValue: change.oldValue,
        newValue: change.newValue,
        createdAt: currentTimestamp
      }));

      await db.insert(petHistory).values(historyEntries);
    }

    return NextResponse.json(updatedPet[0]);
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: PetParams }
) {
  try {
    const id = params.id;
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

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

    if (deletedPet.length === 0) {
      return NextResponse.json({ 
        error: 'Pet not found',
        code: 'PET_NOT_FOUND' 
      }, { status: 404 });
    }

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