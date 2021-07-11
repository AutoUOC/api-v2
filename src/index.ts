import fastify, { FastifyReply } from "fastify";
import { TopicManager, PostManager, RequestManager } from "./routes";

const server = fastify();

// routes
server.get('/', async (request, reply) => { reply.send('hello'); });


server.get('/posts/:tid/:page', async (request: RequestManager.GetPosts, reply: FastifyReply) => {
    reply.send(await new PostManager().getPosts(parseInt(request.params?.tid), parseInt(request.params?.page)))
});

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