import type { Result } from '$lib/types/Result.types';
import type { Student } from '$lib/types/Student.type';
import type Pocketbase from 'pocketbase';
export default async function authenticate(pb: Pocketbase): Promise<Result<Student, unknown>>{
    try{
        const student = structuredClone(await pb.collection('students').authRefresh<Student>());
        return {
            result: "success",
            original: student.record
        }
    }catch(err){
        pb.authStore.clear();
        return {
            result: "error",
            error: err
        }
    }
}