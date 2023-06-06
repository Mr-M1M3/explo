import Pocketbase from "pocketbase";
export async function handle({event, resolve}){
    event.locals.pb = new Pocketbase('http://127.0.0.1:8090');
    const RESPONSE = await resolve(event);
    return RESPONSE;
}