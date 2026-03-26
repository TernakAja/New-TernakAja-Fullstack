import type { SupabaseClient } from "@supabase/supabase-js";
import type { CreateLivestockInput } from "@/model/schemas/livestock";
import { toTitleCase } from "@/lib/helpers/toTitleCase";

interface CreateLivestockResult {
  livestock: Record<string, unknown>;
  device: Record<string, unknown>;
}

/**
 * Creates a new livestock record and its associated device.
 *
 * Since the Supabase JS client doesn't support native SQL transactions,
 * we insert sequentially and roll back manually on failure.
 *
 * @param supabase — Authenticated Supabase server client (carries the user's session)
 * @param userId  — Authenticated user's ID (from session, NOT from request body)
 * @param data    — Validated input data (already passed through Zod)
 */
export async function createLivestock(
  supabase: SupabaseClient,
  userId: string,
  data: CreateLivestockInput
): Promise<CreateLivestockResult> {
  const now = new Date().toISOString();

  // --- Step 1: Insert livestock ---
  const { data: livestock, error: livestockError } = await supabase
    .from("livestock")
    .insert({
      user_id: userId,
      name: data.name,
      species: toTitleCase(data.species),
      breed: data.breed,
      gender: data.gender,
      birth_date: data.birth_date,
      photo_url: data.photo_url ?? null,
      status: data.status,
      height: data.height,
      weight: data.weight,
      body_condition_score: data.body_condition_score,
      notes: data.notes ?? null,
      recorded_at: data.recorded_at ? new Date(data.recorded_at).toISOString() : null,
      created_at: now,
      updated_at: now,
    })
    .select()
    .single();

  if (livestockError) {
    console.error("[createLivestock] Failed to insert livestock:", livestockError);
    throw new Error(`Failed to create livestock: ${livestockError.message}`);
  }

  // --- Step 2: Insert device ---
  const { data: device, error: deviceError } = await supabase
    .from("devices")
    .insert({
      livestock_id: livestock.id,
      device_id: data.device_id,
      last_update: null,
    })
    .select()
    .single();

  if (deviceError) {
    // Rollback: delete the livestock we just inserted
    console.error("[createLivestock] Failed to insert device, rolling back livestock:", deviceError);

    const { error: rollbackError } = await supabase
      .from("livestock")
      .delete()
      .eq("id", livestock.id);

    if (rollbackError) {
      console.error("[createLivestock] Rollback failed:", rollbackError);
    }

    throw new Error(`Failed to create device: ${deviceError.message}`);
  }

  return { livestock, device };
}

export async function getLivestockById(
  supabase: SupabaseClient,
  userId: string,
  livestockId: string
) {
  const { data, error } = await supabase
    .from("livestock")
    .select("*")
    .eq("id", livestockId)
    .eq("user_id", userId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getAllLivestock(
  supabase: SupabaseClient,
  userId: string
) {
  const { data, error } = await supabase
    .from("livestock")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[getAllLivestock]", error);
    throw new Error(error.message);
  }

  return data;
}

export async function getLiveStockWithSensorData(
  supabase: SupabaseClient,
  userId: string
) {
  const { data, error } = await supabase
    .from("livestock_with_latest_sensor")
    .select("*")
    .eq("user_id", userId); 

  if (error) {
    console.error("[getLiveStockWithSensorData]", error);
    throw new Error(error.message);
  }  
  return data;
}

export async function getLiveStockWithSensorDataById(
  supabase: SupabaseClient,
  livestockId: string,
  userId: string
) {
  const { data, error } = await supabase
    .from("livestock_with_latest_sensor")
    .select("*")
    .eq("id", livestockId)
    .eq("user_id", userId); 

  if (error) {
    console.error("[getLiveStockWithSensorData]", error);
    throw new Error(error.message);
  }  
  return data;
}

