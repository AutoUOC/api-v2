import { FourmTopic } from '../typings/topic.js';
import petitio from "petitio";

export class TopicManager {

    public async getPosts(topicId: Number): Promise<Array<FourmTopic>> {
        return ((await petitio(`hhttps://scratchdb.lefty.one/v3/forum/topic/info/${topicId}`)).json());
    }

}