export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createLivestockInputSchema } from "@/model/schemas/livestock";
import { createLivestock, getAllLivestock } from "@/features/livestock/services/livestock";
import {
  unauthorizedResponse,
  validationErrorResponse,
  serverErrorResponse,
} from "@/lib/api/errors";

/**
 * POST /api/livestock
 *
 * Creates a new livestock record with an associated device.
 * Requires an authenticated Supabase session.
 *
 * Request body: see `createLivestockInputSchema` for the full shape.
 * Returns: 201 with { message, data: { livestock, device } }
 */
export async function POST(request: NextRequest) {
  try {
    // --- 1. Auth ---
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return unauthorizedResponse();
    }

    // --- 2. Parse & validate body ---
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const parsed = createLivestockInputSchema.safeParse(body);

    if (!parsed.success) {
      return validationErrorResponse(parsed.error);
    }

    // --- 3. Execute business logic ---
    const result = await createLivestock(supabase, user.id, parsed.data);

    // --- 4. Respond ---
    return NextResponse.json(
      {
        message: "Livestock and device created successfully",
        data: result,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/livestock] Unhandled error:", error);
    return serverErrorResponse();
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // --- 1. Auth ---
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return unauthorizedResponse();
    }

    // --- 2. Service ---
    const livestock = await getAllLivestock(supabase, user.id);

    // --- 3. Response ---
    return NextResponse.json({
      message: "Livestock retrieved successfully",
      data: livestock,
    });
  } catch (error) {
    console.error("[GET /api/livestock]", error);
    return serverErrorResponse();
  }
}
