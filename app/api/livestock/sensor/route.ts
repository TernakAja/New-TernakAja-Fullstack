import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { unauthorizedResponse, serverErrorResponse } from "@/lib/api/errors";
import { getLiveStockWithSensorData } from "@/lib/services/livestock";
import { livestockWithSensorDataListSchema } from "@/model/schemas/livestock";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // --- Auth ---
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return unauthorizedResponse();
    }

    // --- Query view ---
    const livestock = await getLiveStockWithSensorData(supabase, user.id);

    console.log("[GET /api/livestock/sensor] Retrieved livestock with sensor data:", livestock);

    const parsed = livestockWithSensorDataListSchema.safeParse(livestock);

    if (!parsed.success) {
      console.error(parsed.error);
      return serverErrorResponse("Invalid response shape");
    }

    return NextResponse.json({
      message: "Livestock and latest sensor data retrieved successfully",
      data: parsed.data,
    });
  } catch (err) {
    console.error("[GET /api/livestock/sensor]", err);
    return serverErrorResponse();
  }
}