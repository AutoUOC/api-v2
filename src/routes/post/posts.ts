import { ForumPost } from '../typings/post.js';
import petitio from "petitio";

export class PostManager {

    public async getPosts(topicId: Number): Promise<Array<ForumPost>> {
        return (await petitio(`https://scratchdb.lefty.one/v3/forum/topic/posts/${topicId}/?o=newest`).json());
    }

}