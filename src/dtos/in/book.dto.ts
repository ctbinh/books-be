import S from 'fluent-json-schema';

export type CreateBookDto = {
    title: string;
    description: string;
    price: number;
};

export const createBookSchema = S.object()
    .prop('title', S.string().required().minLength(2).maxLength(50))
    .prop('description', S.string().required().minLength(10).maxLength(1000))
    .prop('price', S.number().required())