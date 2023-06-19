import { ID_LENGTH } from '@constants';
import s from 'fluent-json-schema';

export const idSchema = s.string().examples(['1646498qwe1q5we46498']).minLength(ID_LENGTH).maxLength(ID_LENGTH);
export const nullable = { nullable: true };