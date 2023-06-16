import type { Result } from "$lib/types/Result.types";
import type Pocketbase from "pocketbase";
import type { ListResult } from "pocketbase";
interface SearchParams<D> {
  where?: string;
  sort?: string;
  select?: Array<keyof D | null>;
  query_params?: {
    page?: number;
    per_page?: number;
  };
}
export default async function search<D>(collection: string,filter: SearchParams<D>,pb_instance: Pocketbase): Promise<Result<ListResult<D>, unknown>> {
    try{
        const data = await pb_instance
          .collection(collection)
          .getList<D>(filter.query_params?.page, filter?.query_params?.per_page, {
            filter: filter.where ?? '',
            sort: filter.sort ?? '',
            fields: filter.select?.join() || ''
          });
          
          return {
            result: "success",
            original: data
          }
    }catch(e){
        return{
            result: "error",
            error: e
        }
    }
}