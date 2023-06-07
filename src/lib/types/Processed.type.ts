/*

       ### Any load function or form action return Processed<T, Schema> ###
       
 * Usage
       * Generic T is the actual type that was intended to return
       * Generic Schema is the shape of the data that was being processed. If user sends invalid data, it can be used to show the user which fields were invalid.
*/

import type { z } from "zod";

interface SuccessMessage<T> {
  ok: true;
  data: T;
}

interface InvalidMessage<Schema extends z.ZodTypeAny> {
  ok: false;
  reason: "invalid"
  invalids: Record<keyof z.infer<Schema>, string>;
}

interface ClientErrorMessage {
  ok: false;
  reason: "client-error"
  message: string;
}

export type Processed<T, Schema extends z.ZodTypeAny> =
  | SuccessMessage<T>
  | InvalidMessage<Schema>
  | ClientErrorMessage;
