import { FourmTopic } from '../typings/topic.js';

export class PostManager {

    public async getPosts(topicId: Number, pageNum: Number): Promise<Array<FourmTopic>> {
        return ((await fetch(`https://scratchdb.lefty.one/v3/forum/topic/posts/${topicId}/${pageNum}`)).json());
    }

}