import { ForumPost, ShopOrder } from '../typings/post.js';
import petitio from "petitio";

const commands: Array<string> = ['new', 'take', 'finish'];

const commandRegex = new RegExp(`((?<=--uoc +)(${commands.join('|')}))(?![\s\S]*(--uoc (${commands.join('|')})))`);

export class PostManager {

    public async getPosts(topicId: Number): Promise<Array<ForumPost>> {
        return (await petitio(`https://scratchdb.lefty.one/v3/forum/topic/posts/${topicId}/?o=newest`).json()).filter((e: ForumPost) => commandRegex.test(e.content.html));
    }

    public getShopOrders(posts: Array<ForumPost>): Array<ShopOrder> {
        const orders: Array<ShopOrder> = [];
        for (const post of posts) {
            const command = post.content.bb.match(commandRegex).slice(-1)[0];
            let orderStatus: string | null = null;
            switch (command) {
              case 'new':
                orderStatus = 'unclaimed';
                break;
              case 'take':
                orderStatus = 'claimed';
                break;
              case 'finish':
                orderStatus = 'finished';
                break;
            }
            let prevPostNum: number = -1;
            for (const [index, order] of orders.entries()) {
                if (post.content.bb.includes(order.latestBB)) {
                    prevPostNum = index;
                }
            }
            if (!orderStatus) continue;
            if (prevPostNum !== -1) {
                orders[prevPostNum]?.posts.push(post);
                orders[prevPostNum] = {
                    customer: post.username,
                    posted: post.time.posted,
                    link: `https://scratch.mit.edu/discuss/post/${post.id}`,
                    status: orderStatus!,
                    posts: orders[prevPostNum]?.posts!,
                    latestBB: post.content.bb
                }
            } else {
                orders.push({
                    customer: post.username,
                    posted: post.time.posted,
                    link: `https://scratch.mit.edu/discuss/post/${post.id}`,
                    status: orderStatus!,
                    posts: [post],
                    latestBB: post.content.bb
                });
            }
        }
        return orders;
    }

}
