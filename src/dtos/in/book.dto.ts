import S from 'fluent-json-schema';

export type CreateBookDto = {
    title: string;
    author: string;
    description: string;
    price: number;
    imageUrl?: string;
};

export const createBookSchema = S.object()
    .prop('title', S.string().required().minLength(2).maxLength(50))
    .prop('author', S.string().required())
    .prop('description', S.string().required().minLength(10).maxLength(1000))
    .prop('price', S.number().required())
    .prop('imageUrl', S.string())