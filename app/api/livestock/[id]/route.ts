import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { unauthorizedResponse, notFoundResponse, serverErrorResponse } from "@/lib/api/errors";
import { livestockListResponseSchema, livestockResponseSchema } from "@/model/schemas/livestock";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const livestockId = params.id;

    // --- 2. Query ---
    const { data, error } = await supabase
      .from("livestock")
      .select("*")
      .eq("id", livestockId)
      .eq("user_id", user.id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return notFoundResponse("Livestock not found");
      }

      console.error("[GET /api/livestock/:id]", error);
      return serverErrorResponse();
    }

    const parsed = livestockListResponseSchema.safeParse([data]);

    if (!parsed.success) {
    console.error(parsed.error);
    return serverErrorResponse("Invalid response shape");
    }

    return NextResponse.json({
    message: "Livestock retrieved successfully",
    data: parsed.data,
    });

  } catch (err) {
    console.error("[GET /api/livestock/:id] Unhandled error:", err);
    return serverErrorResponse();
  }
}