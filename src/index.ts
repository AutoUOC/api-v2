import fastify, { FastifyReply } from "fastify";
import { TopicManager, PostManager, RequestManager, ForumPost } from "./routes";

const server = fastify();

// routes
server.get('/', async (request, reply) => { reply.send('hello'); });


server.get('/posts/:tid/', async (request: RequestManager.GetPosts, reply: FastifyReply) => {
    const postList = await new PostManager().getPosts(parseInt(request.params?.tid), parseInt(request.params?.page));
    const filteredPostList = postList.filter(e => e.content.html.includes('Username:'));
    reply.send({length: postList.length, list: filteredPostList});
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