import fastify from 'fastify';
import { envs, swaggerConfig, swaggerUIConfig } from '@configs';
import { authRoute, bookPlugin } from './routes';
import type { FastifyCookieOptions } from '@fastify/cookie';

export function createServer(config: ServerConfig) {
    const app = fastify({ logger: true });

    app.register(import('@fastify/sensible'));
    app.register(import('@fastify/helmet'));
    app.register(import('@fastify/cors'), {
        origin: envs.CORS_WHITE_LIST
    });
    app.register(import('@fastify/cookie'), {
        secret: envs.COOKIE_SECRET, // for cookies signature
        hook: 'onRequest'
    } as FastifyCookieOptions);

    // Swagger on production will be turned off in the future
    if (envs.NODE_ENV === 'development' || envs.NODE_ENV === 'staging' || envs.NODE_ENV === 'production') {
        app.register(import('@fastify/swagger'), swaggerConfig);
        app.register(import('@fastify/swagger-ui'), swaggerUIConfig);
    }

    app.register(authRoute, { prefix: '/auth' });
    app.register(bookPlugin, { prefix: '/books' });

    app.ready().then(() => {
        app.swagger({ yaml: true });
        app.log.info(`Swagger documentation is on http://${config.host}:${config.port}/docs`);
    });

    const listen = () => {
        app.listen(
            {
                host: config.host,
                port: config.port
            },
            function (err) {
                if (err) {
                    app.log.error(err);
                }
            }
        );
        process.on('SIGINT', () => {
            app.log.info('Exited program');
            process.exit(0);
        });
    };

    return {
        ...app,
        listen
    };
}