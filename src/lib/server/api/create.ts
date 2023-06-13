import type { PbProps } from '$lib/types/PbProps.type';
import type { Result } from '$lib/types/Result.types';
import type Pocketbase from "pocketbase";

export default async function insert<Payload extends Record<PropertyKey, unknown>>(args: {into: string, payload: Payload}, pb_instance: Pocketbase): Promise<Result<Payload & PbProps, unknown>>{
    try{
        const created = await pb_instance.collection(args.into).create<Payload & PbProps>(args.payload);
        return {
            result: "success",
            original: created
        }
    }catch(e){
        return{
            result: "error",
            error: e
        }
    }
};