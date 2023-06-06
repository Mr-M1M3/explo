/*

       ### Any load function or form action return Processed<T, Schema> ###
       
 * Usage
       * Generic T is the actual type that was intended to return
       * Generic Schema is the shape of the data that was being processed. If user sends invalid data, it can be used to show the user which fields were invalid.
*/

interface SuccessMessage<T> {
  ok: true;
  data: T;
}

interface InvalidMessage<Schema> {
  ok: false;
  invalids: Schema;
}

interface ClientErrorMessage {
  ok: false;
  message: string;
}

export type Processed<T, Schema> =
  | SuccessMessage<T>
  | InvalidMessage<Schema>
  | ClientErrorMessage;
