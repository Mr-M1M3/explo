import type { Result } from "$lib/types/Result.types";
import type { z } from "zod";

type Validated<Schema extends z.ZodTypeAny> = z.SafeParseSuccess<z.infer<Schema>>['data'];

export default function validate<Schema extends z.ZodTypeAny>(operand: unknown, schema: Schema ): Result<Validated<Schema>, z.ZodError> {
  const parsed = schema.safeParse(operand);
  if (parsed.success === true) {
    return {
      result: "success",
      original: parsed.data,
    };
  }else{
    return {
      result: "error",
      error: parsed.error
    }
  }
}