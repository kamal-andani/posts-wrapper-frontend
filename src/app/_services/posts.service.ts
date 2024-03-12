import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { postsQuery } from '../_models/posts';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  readonly backendBaseURL = "https://localhost:7016/api"
  constructor(private http: HttpClient) { }

  fetchPosts(queryParams:postsQuery){
    return this.http.get(this.backendBaseURL+"/posts",{
      params: {
        tags: queryParams.tags,
        sortBy: queryParams.sortBy,
        direction: queryParams.direction
      }
    });
  }
}
