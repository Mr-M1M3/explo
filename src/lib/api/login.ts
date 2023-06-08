import type { Result } from "$lib/types/Result.types";
import Pocketbase from "pocketbase";

export default async function login<Data>(credentials: {email: string, password: string}): Promise<Result<Data, unknown>>{
    const pb = new Pocketbase('http://127.0.0.1:8090');
    try{
        const authorized =  await pb.collection('students').authWithPassword<Data>(credentials.email, credentials.password);
        return {
            result: "success",
            original: authorized.record
        }
    }catch(e){
        return {
            result: "error",
            error: e
        }
    }
}