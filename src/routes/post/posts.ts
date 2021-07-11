import { FourmTopic } from '../typings/topic.js';
import petitio from "petitio";

export class PostManager {

    public async getPosts(topicId: Number, pageNum: Number): Promise<Array<FourmTopic>> {
        return ((await petitio(`https://scratchdb.lefty.one/v3/forum/topic/posts/${topicId}/${pageNum}`)).json());
    }

}