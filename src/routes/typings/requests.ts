import { FastifyRequest } from 'fastify';

export namespace RequestManager {
    export type GetPosts = FastifyRequest<{
        Params: {
            tid: string,
            page: string
        }
    }>
}