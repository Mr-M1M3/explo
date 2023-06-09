/*
 * Generate responses to respond

       ### Any server only load function or form actions should use respond<T, Schema>(result: Result):Processed<T, Schema> to generate and return response ###
       
 * Usage
       * Generic T is the shape of the actual data that was intended to respond
       * Generic Schema is the schema of the user input which will be used to ensure type-safety if the input was invalid
       * Argument result of type Result is used to determine whether it was a success or error
       * As the return value of this function would be returned to the user, it returns data of type Processed<T, Scheme>;
*/

import generate_invalid_error_msg from "$lib/server/gens/invalid-error-msg.gen";
import type { Processed } from "$lib/types/Processed.type";
import type { Result } from "$lib/types/Result.types";
import { error } from "@sveltejs/kit";
import { ClientResponseError } from "pocketbase";
import { ZodError, type ZodTypeAny } from "zod";
import generate_pb_error_msg from "$lib/server/gens/pb-error-msg.gen";

export default function respond<T, Schema extends ZodTypeAny>(result: Result<T, unknown>): Processed<T, Schema>{
    if(result.result === "success"){
        return {
            ok: true,
            data: result.original
        }
    }
    if(result.error instanceof ZodError){
        return generate_invalid_error_msg<Schema>(result.error);
    }
    if(result.error instanceof ClientResponseError){
        return generate_pb_error_msg(result.error);
    }

    throw error(500, "Something went wrong on the server");
}