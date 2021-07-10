export interface ForumPost {
    id: number,
    username: string,
    editor: null | string,
    deleted: number,
    time: {
        posted: string,
        first_checked: string,
        html_last_checked: string,
        bbcode_last_checked: string,
        edited: null | string
    },
    content: {
        html: string
        bb: string
    },
    parser: {
        version: number,
        highest: number
    }
    topic: {
        id: number,
        title: string,
        category: string,
        closed: number,
        deleted: number,
        time: {
            first_checked: string,
            last_checked: string
        }
    }
}