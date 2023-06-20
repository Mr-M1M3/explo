import authenticate from '$lib/server/api/auth.js';
import { redirect } from '@sveltejs/kit';

export async function load({cookies, locals: {pb}}){
    
    const session = cookies.serialize('pb_auth', cookies.get('pb_auth') || '');
    // initiate auth store
    pb.authStore.loadFromCookie(session);
    
    if(pb.authStore.isValid){
        const authenticated = await authenticate(pb);
        if(authenticated.result === "success"){
            throw redirect(303, '/');
        }
        return {}
    }
    return {}
}