import { ForumPost, ShopOrder } from '../typings/post.js';
import petitio from "petitio";

export class PostManager {

    public async getPosts(topicId: Number): Promise<Array<ForumPost>> {
        return (await petitio(`https://scratchdb.lefty.one/v3/forum/topic/posts/${topicId}/?o=newest`).json()).filter((e: ForumPost) => e.content.html.includes('--uoc'));;
    }

    public getShopOrders(posts: Array<ForumPost>): Array<ShopOrder> {
        const orders: Array<ShopOrder> = [];
        for (const post of posts) {
            const postSplit = post.content.bb.split('--uoc ')[post.content.bb.split('--uoc ').length-1];
            let orderStatus: string | null = null;
            if (postSplit?.startsWith('new')) {
                orderStatus = 'unclaimed';
            } else if (postSplit?.startsWith('take')) {
                orderStatus = 'claimed';
            } else if (postSplit?.startsWith('finish')) {
                orderStatus = 'finished';
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