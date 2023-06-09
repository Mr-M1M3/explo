import type SignupPayloadSchema from '$lib/server/schemas/signup-payload.schema';
import type { Result } from '$lib/types/Result.types';
import type { ClientResponseError } from 'pocketbase';
import type { z } from 'zod';
import Pocketbase from 'pocketbase';
export default async function register(payload: z.infer<typeof SignupPayloadSchema>): Promise<Result<{session: string}, unknown>>{
    const pb = new Pocketbase('http://127.0.0.1:8090');
    try{
        await pb.collection('students').create<z.infer<typeof SignupPayloadSchema>>({...payload, emailVisibility: true});
        return {
            result: "success",
            original: {session: pb.authStore.exportToCookie()}
        }
    }catch(e){
        return {
            result: "error",
            error: e
        }
    }

}