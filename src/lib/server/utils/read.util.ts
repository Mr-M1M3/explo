/*
 * Read data form the browser Request API made available by svelte

       ### Any data received as Request API of browser should be read by read<Data>(request) ###
       
 * Usage
       * Generic Data is the shape of the expected data
       * Argument request of type Request is the request object to read.
       * As this function can wun into error, it will return Result<Data, unknown>;
*/
// import types
import type { Result } from "$lib/types/Result.types";

export default async function read<Data extends Record<PropertyKey, unknown>>(request: Request): Promise<Result<Data, unknown>>{

    // ATTENTION: Currently, only reads data from form data

    const to_return: Partial<Data> = {};

    const form_data = await request.formData();
    for(let [name, value] of form_data.entries()){
        to_return[name as keyof Data] = value as Data[keyof Data];
    }

    return {
        result: "success",
        original: to_return as Data
    }
}