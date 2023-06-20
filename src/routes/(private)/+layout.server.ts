import authenticate from '$lib/server/api/auth.js';
import respond from '$lib/server/utils/respond.util.js';
import type { Student } from '$lib/types/Student.type.js';
import { redirect } from '@sveltejs/kit';

export async function load({cookies, locals: {pb}, url}){
    const session = cookies.serialize('pb_auth', cookies.get('pb_auth') || '');
    // initiate auth store
    pb.authStore.loadFromCookie(session);

    if(pb.authStore.isValid){
        
        // ATTENTION: Potential Security Bug
        const authenticated = await authenticate(pb);
        cookies.set('pb_auth', pb.authStore.exportToCookie().substring('pb_auth'.length + 1), {
            path: '/',
            encode: v => v
        });
        return respond<Student, never>(authenticated);
    }
    
    pb.authStore.clear();
    cookies.set('pb_auth', '', {path: '/', encode: v => v});
    throw redirect(303, `/login?from=${Buffer.from(url.pathname.substring(1)).toString('base64url')}`);
}