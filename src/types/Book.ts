export interface Book {
    _id?: string
    title: string
    author: string
    isbn?: string
    publishedDate?: string
    genre?: string
    description?: string
    copiesAvailable: number
    profileImage?: string
    createdAt?: string
}
