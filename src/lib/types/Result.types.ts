/*
 * Rust Result enum like discriminated union to distinguish between error and success making error handling cuter like your crush ^_^

       ### Any function that can throw error should return Result<T, E> ###
       
 * Usage
       * Generic T is the actual type that the function was written to return
       * Generic E is the error that was thrown
*/

interface Ok<T> {
  result: "success";
  original: T;
}

interface Err<E> {
  result: "error";
  error: E;
}

export type Result<T, E> = Ok<T> | Err<E>;
