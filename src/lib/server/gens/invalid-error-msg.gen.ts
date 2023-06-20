import type { Processed } from "$lib/types/Processed.type";
import type { z } from "zod";

export default function generate_invalid_error_msg<Schema extends z.ZodTypeAny>(
  e: z.ZodError
): Processed<never, Schema> {
    
  const flatten = e.flatten();

  // there should not be any form errors
  if (flatten.formErrors.length > 0) {
    console.error(`Found form errors, reporting.`, flatten);
  }

  const invalids: Partial<Record<keyof z.infer<Schema>, string>> = {};

  for (let [invalid_key, message] of Object.entries(flatten.fieldErrors)) {
    invalids[invalid_key as keyof typeof invalids] = Array.isArray(message) ? message[0] : "";
  }

  return {
    ok: false,
    reason: "invalid",
    invalids,
  };
}

