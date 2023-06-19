import { FastifyReply, FastifyRequest, RouteGenericInterface } from "fastify";

type Result<T> = Promise<T | void>;
/**
 * Unauthorized handler
 * @param RS Response data type
 * @param RQ Request data type
 */
export type RawHandler<RS = unknown, RQ extends RouteGenericInterface = Record<string, never>> = (
    req: FastifyRequest<RQ>,
    res: FastifyReply
) => Result<RS>;

interface DefaultAuthRequestInterface {
    Headers: {
        userId: string;
        [header: string]: unknown;
    };
}

type AuthRequest<T extends RouteGenericInterface = DefaultAuthRequestInterface> = FastifyRequest<DefaultAuthRequestInterface & T>;

/**
 * Authorized handler
 * @param RS Response data type
 * @param RQ Request data type
 */
export type AuthorizedHandler<RS = unknown, RQ extends RouteGenericInterface = Record<string, never>> = (
    req: AuthRequest<RQ>,
    res: FastifyReply
) => Result<RS>;