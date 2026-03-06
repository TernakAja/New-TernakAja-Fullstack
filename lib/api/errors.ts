import { NextResponse } from "next/server";
import type { ZodError } from "zod";

/**
 * Standardized API error response helpers.
 * Ensures a consistent error shape across all API routes.
 */

export function unauthorizedResponse(message = "Unauthorized") {
  return NextResponse.json({ error: message }, { status: 401 });
}

export function validationErrorResponse(error: ZodError) {
  return NextResponse.json(
    {
      error: "Validation failed",
      details: error.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    },
    { status: 400 }
  );
}

export function serverErrorResponse(message = "Internal server error") {
  return NextResponse.json({ error: message }, { status: 500 });
}

export function notFoundResponse(message = "Not found") {
  return NextResponse.json({ error: message }, { status: 404 });
}

export function conflictResponse(message: string) {
  return NextResponse.json({ error: message }, { status: 409 });
}
