import { MIN_EMAIL_LENGTH, MIN_PASSWORD_LENGTH } from "@constants";
import S from "fluent-json-schema";

export const authInputSchema = S
    .object()
    .prop('email', S.string().required().minLength(MIN_EMAIL_LENGTH).format('email'))
    .prop('password', S.string().required().minLength(MIN_PASSWORD_LENGTH));

export type AuthInputDto = {
    email: string;
    password: string;
};