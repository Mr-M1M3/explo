import type { Processed } from "$lib/types/Processed.type";
import { error } from "@sveltejs/kit";
import type { ClientResponseError } from "pocketbase";

export default function generate_pb_error_msg(err: ClientResponseError): Processed<never, never>{
    // if pocketbase server is not up
    if(err.originalError?.cause?.code === "ECONNREFUSED"){
        console.error('ECONNREFUSED: Pocketbase instance may not be running');
        throw error(500, "Something went wrong on the sever");
    }

    if((err.status >= 400) && (err.status < 500)){
        return {
            ok: false,
            reason: "client-error",
            message: err.message
        }
    }

    console.error(`An error other than client-error occurred in pocketbase. Reporting.`, err);
    throw error(500, "something went wrong the server");
}