import { verifyToken } from '@middlewares';
import { FastifyInstance } from 'fastify';
import { bookRoute } from './book.route';

export async function bookPlugin(app: FastifyInstance) {
    app.addHook('preHandler', verifyToken);
    app.register(bookRoute);
}
