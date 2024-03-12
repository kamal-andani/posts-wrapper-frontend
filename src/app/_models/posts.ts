
export interface postsQuery
{
  tags:string,
  sortBy: string,
  direction: string
}

export interface PostDetailsModel{
  author: string,
  authorId: number,
  id: number,
  likes: number,
  popularity: number,
  reads: number,
  tags: string[]
}

export interface PostResponseModel{
  posts?: PostDetailsModel[]
}
