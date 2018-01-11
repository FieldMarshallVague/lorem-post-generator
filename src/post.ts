/**
 * A single post, comprising date, title, body, author etc.
 */
export interface Post {
    creationDate: Date,
    author: string,
    title: string,
    body: string,
    tags: string
}