import type { Result } from '$lib/types/Result.types';
import Pocketbase from 'pocketbase';
export default async function select_first<T>(collection: string, filter: string): Promise<Result<T, unknown>>{
    const pb = new Pocketbase('http://127.0.0.1:8090');
    try{
        const item = await pb.collection(collection).getFirstListItem<T>(filter);
        return {
            result: 'success',
            original: item
        }
    }catch(e){
        return {
            result: "error",
            error: e
        }
    }
}