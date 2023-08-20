export interface Fund {
    id : number
    name : string

}

export interface Topic {
    id : number
    name : string
}

export interface Post {
    id : number
    title : string
    content : string
    slug : string
    thumbnail_url : string
    read_minute : number
    word_count : number
    status : number
    fund : Fund | null
    topic : Topic
}