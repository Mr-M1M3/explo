import type { Result } from "$lib/types/Result.types";
import type Pocketbase from 'pocketbase';

// ATTENTION: This function should only be passed the validated data
export default async function update<D extends Record<PropertyKey, unknown>>(collection: string, args: {where: {id: string}, with: D}, pb_instance: Pocketbase): Promise<Result<Omit<D, "oldPassword" | "password" | "passwordConfirm">, unknown>>{
    try{
      const updated = await pb_instance.collection(collection).update<D>(args.where.id, args.with);
      return {
        result: "success",
        original: updated
      }
    }catch(e){
      return {
        result: "error",
        error: e
      }
    }
  
  };