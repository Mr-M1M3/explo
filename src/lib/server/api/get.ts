import type { Result } from "$lib/types/Result.types";
import type Pocketbase from "pocketbase";
interface GetArgs<D> {
  from: string;
  where: {
    id: string;
  };
  select?: Array<keyof D | null>;
}

export default async function get<D>(args: GetArgs<D>, pb_instance: Pocketbase): Promise<Result<D, unknown>> {
  try {
    const data = await pb_instance
      .collection(args.from)
      .getOne<D>(args.where.id, {
        fields: args.select?.join() ?? "",
      });

    return {
        result: "success",
        original: data
    };
  } catch (e) {
    return {
        result: "error",
        error: e
    }
  }
}