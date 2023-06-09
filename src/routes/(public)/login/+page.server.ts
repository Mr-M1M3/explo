import login from '$lib/api/login';
import LoginCredentialSchema from '$lib/schemas/login-credential.schema.js';
import type { Student } from '$lib/types/Student.type.js';
import read from '$lib/utils/read.util.js'
import respond from '$lib/utils/respond.util.js';
import validate from '$lib/utils/validator.util.js';
import { error, fail } from '@sveltejs/kit';
import type { z } from 'zod';

export const actions = {
    default: async ({request}) => {

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
        // ATTENTION: data returned from this action can vary to ts due to returning Processed<T, S> where T is different (never) everytime.
        // So, ide cannot show code suggestion properly
        return respond<Student, typeof LoginCredentialSchema>(student);
    }
}