import fastify from "fastify";

declare module "fastify" {
    interface FastifyReply {
        view(page: string, data?: object): FastifyReply;
        sendFile(file: string, data?: object): FastifyReply;
    }
};
const server = fastify();

// routes
server.get('/', async (request, reply) => { reply.send('hello'); });

// start
const start = async () => {
    try {
        await server.listen(3000);
        const address = server.server.address();
        const port = typeof address === 'string' ? address : address?.port;
        console.log(`server live at localhost:${port}`);
    } catch (err) {
        console.error(err);
        server.log.error(err);
        process.exit(1);
    }
};
start();