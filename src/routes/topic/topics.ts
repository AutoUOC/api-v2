import { FourmTopic } from '../typings/topic.js';

export class TopicManager {

    public async getPosts(topicId: Number): Promise<Array<FourmTopic>> {
        return ((await fetch(`hhttps://scratchdb.lefty.one/v3/forum/topic/info/${topicId}`)).json());
    }

}