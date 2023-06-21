import { S } from 'fluent-json-schema';

export const bookResultSchema = S.object()
    .prop('id', S.string().required())
    .prop('title', S.string().required().minLength(2).maxLength(50))
    .prop('author', S.string().required())
    .prop('publishedDate', S.integer().required().minimum(1))
    .prop('description', S.string().required().minLength(10).maxLength(1000))
    .prop('price', S.number().required())
    .prop('imageUrl', S.string())

export type BookRawResultDto = {
    title: string;
    author: string;
    publishedDate: number;
    description: string;
    price: number;
    imageUrl?: string;
};

export type BookResultDto = {
    id: string,
    title: string;
    author: string;
    publishedDate: number;
    description: string;
    price: number;
    imageUrl?: string;
};