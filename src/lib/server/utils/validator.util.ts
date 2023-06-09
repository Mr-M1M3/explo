/*
 * validate data using any schema

       ### Any data that needs to be validated should use this module ###
       
 * Usage
       * Generic `Schema` is the typeof schema created by zod.
        ### ATTENTION: Schema is the actual typeof schema you get from `typeof Schema`. 
        ### ATTENTION: It's not what you get by using `z.infer<typeof Schema>`
       * Argument operand is the data you want the validator to validate
       * Argument schema is the actual zod schema
       * It returns `operand` or `ZodError` object wrapped inside Result<T, E>
*/
import type { Result } from "$lib/types/Result.types";
import type { z } from "zod";

export default async function validate<Schema extends z.ZodTypeAny>(operand: unknown, schema: Schema ): Promise<Result<z.infer<Schema>, z.ZodError>> {
  const parsed = await schema.safeParseAsync(operand);
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