import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { petHistory, pets } from '@/db/schema';
import { eq, desc, count } from 'drizzle-orm';

interface Params {
  id: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = params;

    // Validate id
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid pet ID is required',
          code: 'INVALID_PET_ID' 
        },
        { status: 400 }
      );
    }

    const petIdInt = parseInt(id);

    // Verify pet exists
    const petExists = await db.select()
      .from(pets)
      .where(eq(pets.id, petIdInt))
      .limit(1);

    if (petExists.length === 0) {
      return NextResponse.json(
        { 
          error: 'Pet not found',
          code: 'PET_NOT_FOUND' 
        },
        { status: 404 }
      );
    }

    // Get pagination parameters
    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');

    // Get total count
    const totalCount = await db.select({ count: count() })
      .from(petHistory)
      .where(eq(petHistory.petId, petIdInt));

    const total = totalCount[0]?.count || 0;

    // Get history records
    const history = await db.select()
      .from(petHistory)
      .where(eq(petHistory.petId, petIdInt))
      .orderBy(desc(petHistory.createdAt))
      .limit(limit)
      .offset(offset);

    const hasMore = offset + history.length < total;

    return NextResponse.json({
      history,
      meta: {
        total,
        count: history.length,
        limit,
        offset,
        hasMore
      }
    });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = params;

    // Validate id
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid pet ID is required',
          code: 'INVALID_PET_ID' 
        },
        { status: 400 }
      );
    }

    const petIdInt = parseInt(id);

    // Verify pet exists
    const petExists = await db.select()
      .from(pets)
      .where(eq(pets.id, petIdInt))
      .limit(1);

    if (petExists.length === 0) {
      return NextResponse.json(
        { 
          error: 'Pet not found',
          code: 'PET_NOT_FOUND' 
        },
        { status: 404 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { userName, modificationType, oldValue, newValue } = body;

    // Validate required fields
    if (!userName || typeof userName !== 'string' || userName.trim() === '') {
      return NextResponse.json(
        { 
          error: 'userName is required and must be a non-empty string',
          code: 'INVALID_USER_NAME' 
        },
        { status: 400 }
      );
    }

    if (!modificationType || typeof modificationType !== 'string' || modificationType.trim() === '') {
      return NextResponse.json(
        { 
          error: 'modificationType is required and must be a non-empty string',
          code: 'INVALID_MODIFICATION_TYPE' 
        },
        { status: 400 }
      );
    }

    // Validate optional fields if provided
    if (oldValue !== undefined && oldValue !== null && typeof oldValue !== 'string') {
      return NextResponse.json(
        { 
          error: 'oldValue must be a string if provided',
          code: 'INVALID_OLD_VALUE' 
        },
        { status: 400 }
      );
    }

    if (newValue !== undefined && newValue !== null && typeof newValue !== 'string') {
      return NextResponse.json(
        { 
          error: 'newValue must be a string if provided',
          code: 'INVALID_NEW_VALUE' 
        },
        { status: 400 }
      );
    }

    // Prepare insert data
    const insertData = {
      petId: petIdInt,
      userName: userName.trim(),
      modificationType: modificationType.trim(),
      oldValue: oldValue || null,
      newValue: newValue || null,
      createdAt: new Date().toISOString()
    };

    // Insert new history record
    const newHistory = await db.insert(petHistory)
      .values(insertData)
      .returning();

    return NextResponse.json(newHistory[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}