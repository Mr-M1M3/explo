import {z} from "zod";
const LoginCredentialSchema = z.object({
    email: z.string().email('invalid email'),
    password: z.string().nonempty('cannot be empty')
});

export default LoginCredentialSchema;