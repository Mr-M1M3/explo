import login from '$lib/server/api/login';
import LoginCredentialSchema from '$lib/server/schemas/login-credential.schema.js';
import type { Student } from '$lib/types/Student.type.js';
import read from '$lib/server/utils/read.util.js'
import respond from '$lib/server/utils/respond.util.js';
import validate from '$lib/server/utils/validator.util.js';
import { error, fail, redirect } from '@sveltejs/kit';
import type { z } from 'zod';

export const actions = {
    default: async ({request, cookies}) => {

        const credentials = await read(request);
        if(credentials.result === "error"){
            throw error(500, "something went wrong on the server");
        }
        const validated_credentials = validate<typeof LoginCredentialSchema>(credentials.original, LoginCredentialSchema);
        if(validated_credentials.result === "error"){
            return fail(400, respond<z.infer<typeof LoginCredentialSchema>, typeof LoginCredentialSchema>(validated_credentials));
        }
        
        const student = await login<Student>(validated_credentials.original);
        if(student.result === "error"){
            return respond(student);
        }
        cookies.set('pb_auth', student.original.session.substring('pb_auth'.length + 1), {
            path: '/',
            encode: (v) => v
        });
        throw redirect(303, '/');
    }
}