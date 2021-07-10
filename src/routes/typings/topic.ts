export interface FourmTopic {
    id: number
    title: string,
    category: string,
    closed: number,
    deleted: number
    time: {
        first_checked: string,
        last_checked: string
    },
    post_count: number
}