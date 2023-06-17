import register from '$lib/server/api/register.js';
import SignupPayloadSchema from '$lib/server/schemas/signup-payload.schema.js';
import read from '$lib/server/utils/read.util.js'
import respond from '$lib/server/utils/respond.util.js';
import validate from '$lib/server/utils/validator.util.js';
import { error, fail, redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({request, cookies}) => {

        const payload = await read(request);
        if(payload.result === "error"){
            throw error(500, "Something went wrong on the server");
        }
        
        const validated_payload = await validate({...payload.original, ssc_batch: Number(payload.original.ssc_batch)}, SignupPayloadSchema);
        if(validated_payload.result === "error"){
            return fail(400, respond<never, typeof SignupPayloadSchema>(validated_payload));
        }
        
        const registered = await register(validated_payload.original);
        
        if(registered.result === "error"){
            return fail(400, respond<never, typeof SignupPayloadSchema>(registered));
        }
        cookies.set('pb_auth', registered.original.session.substring('pb_auth'.length + 1), {
            encode: v => v,
            path: '/'
        });
        throw redirect(303, '/');
    }
}