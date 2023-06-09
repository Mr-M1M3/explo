export const ALPHANUMERIC_REGEX = /^[a-zA-Z0-9]+$/; // only alphanumeric characters
export const ALPHANUMERIC_CONSECUTIVE_SPACE_REGEX = /^(?:[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*)?$/; // only alphanumeric characters and one space in a row
export const MIN_8_CHARACTERS_REGEX = /^.{8,}$/; // at least 8 characters, with no restrictions on the character set
export const MIN_1_UPPERCASE_REGEX = /^(?=.*[A-Z]).+$/; // at least one smaller case letter
export const MIN_1_LOWERCASE_REGEX = /^(?=.*[a-z]).+$/; // at least one lowercase letter
export const MIN_1_SPECIAL_CHAR_REGEX = /^(?=.*[\W_]).+$/; // at least one special character
export const MIN_1_DIGIT_REGEX = /^(?=.*\d).+$/; // at least one digit