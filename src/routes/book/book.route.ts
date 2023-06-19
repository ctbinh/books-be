import { HandlerTag } from '@constants';
import { idSchema } from '@dtos/common';
import { createRoute } from '@utils';
import { bookHandler } from 'src/handlers/books.handler';

export const bookRoute = createRoute(HandlerTag.BOOK, [
    {
        method: 'POST',
        url: '',
        schema: {
            response: {
                200: idSchema.description('Book ID')
            }
        },
        handler: bookHandler.create
    }
]);