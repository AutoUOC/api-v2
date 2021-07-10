export interface ScratchUser {
    username: string,
    id: number,
    sys_id: number,
    joined: string,
    country: string,
    bio: string,
    work: string,
    status: string,
    school: null | String,
    statistics: {
        ranks: {
            country: {
                loves: number
                favorites: number,
                comments: number,
                views: number,
                followers: number,
                following: number
            },
            loves: number
            favorites: number,
            comments: number,
            views: number,
            followers: number,
            following: number
        },
        loves: number
        favorites: number,
        comments: number,
        views: number,
        followers: number,
        following: number
    }
}