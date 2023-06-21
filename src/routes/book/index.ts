import { FastifyInstance } from 'fastify';
import { bookRoute } from './book.route';

export async function bookPlugin(app: FastifyInstance) {
    app.register(bookRoute);
}
