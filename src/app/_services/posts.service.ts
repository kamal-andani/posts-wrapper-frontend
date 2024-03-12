import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { postsQuery } from '../_models/posts';

import config from "../../assets/config.json";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  readonly backendBaseURL = config.backendBaseUrl;
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
