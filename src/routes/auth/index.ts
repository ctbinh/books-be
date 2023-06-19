import { HandlerTag } from '@constants';
import { authHandler } from '@handlers';
import { authInputSchema } from '@dtos/in';
import { authResultSchema } from '@dtos/out';
import { createRoute } from '@utils';
import S from 'fluent-json-schema';

export const authRoute = createRoute(HandlerTag.AUTH, [
    {
        method: 'POST',
        url: '/login',
        schema: {
            body: authInputSchema,
            response: {
                200: authResultSchema
            }
        },
        handler: authHandler.login
    },
    {
        method: 'POST',
        url: '/signup',
        schema: {
            body: authInputSchema,
            response: {
                200: authResultSchema
            }
        },
        handler: authHandler.signup
    },
    {
        method: 'POST',
        url: '/logout',
        schema: {
            response: {
                200: S.null()
            }
        },
        handler: authHandler.logout
    }
]);