import type { Result } from '$lib/types/Result.types';
import type Pocketbase from 'pocketbase';
import { error } from '@sveltejs/kit';
export default async function remove(collection: string, args: {where: {id: string}}, pb_instance: Pocketbase): Promise<Result<null, unknown>>{
    try{
        await pb_instance.collection(collection).delete(args.where.id);
        return {
            result: "success",
            original: null
        }
    }catch(e){
        return {
            result: "error",
            error: e
        }
    }
}