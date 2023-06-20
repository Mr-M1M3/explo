import { z } from "zod";
import {
  ALPHANUMERIC_CONSECUTIVE_SPACE_REGEX,
  ALPHANUMERIC_REGEX,
  MIN_1_LOWERCASE_REGEX,
  MIN_1_SPECIAL_CHAR_REGEX,
  MIN_1_UPPERCASE_REGEX,
} from "../constants/regex";
import select_first from "../api/select";

const SignupPayloadSchema = z
  .object({
    nickname: z
      .string()
      .nonempty("cannot be empty")
      .regex(ALPHANUMERIC_REGEX, "can only contain letters and numbers"),
    full_name: z
      .string()
      .nonempty("cannot be empty")
      .regex(
        ALPHANUMERIC_CONSECUTIVE_SPACE_REGEX,
        "can only contain letters, numbers and 1 consecutive space"
      ),
    school: z
      .string()
      .nonempty("cannot be empty")
      .regex(
        ALPHANUMERIC_CONSECUTIVE_SPACE_REGEX,
        "can only contain letters, numbers and 1 consecutive space"
      ),
    ssc_batch: z
      .number()
      .gte(2019, "must be greater than or equal to 2019")
      .lte(2023, "must be less than or equal to 2023"),
    email: z.string().email("invalid email"),
    password: z
      .string()
      .nonempty("cannot be empty")
      .min(8, "must contain at least 8 characters")
      .regex(MIN_1_UPPERCASE_REGEX, "must contain at least 1 uppercase letter")
      .regex(MIN_1_LOWERCASE_REGEX, "must contain at least 1 lowercase letter")
      .regex(MIN_1_SPECIAL_CHAR_REGEX, "must contain 1 special character"),
    passwordConfirm: z.string().nonempty("cannot be empty"),
  })
  .refine(
    (schema) => {
      return schema.password === schema.passwordConfirm;
    },
    { message: `passwords don't match`, path: ["passwordConfirm", "password"] }
  ).refine(async schema => {
    const existing_user = await select_first('students', `email="${schema.email}"`);
    if(existing_user.result === "error"){
      return true;
    }else{
      return false;
    }
  }, {
    message: 'an account with this email already exists',
    path: ['email']
  });

export default SignupPayloadSchema;
