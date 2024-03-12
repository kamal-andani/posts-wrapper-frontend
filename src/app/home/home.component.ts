import {Component} from '@angular/core';
import {COMMA, ENTER, F} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { KeyValue } from '@angular/common';
import { PostsService } from '../_services/posts.service';
import { PostResponseModel, postsQuery } from '../_models/posts';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  fetchedPosts: PostResponseModel = { };
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];
  loading:boolean = false;

  sortByField: KeyValue<string,string>[] = [
    {key:'Id', value: 'id'},
    {key:'Reads', value: 'reads'},
    {key:'Likes', value: 'likes'},
    {key:'Popularity', value: 'popularity'},
  ];
  sortDirections: KeyValue<string,string>[] = [
    {key: 'Ascending', value: 'asc'},
    {key: 'Descending', value: 'desc'},
  ] ;

  selectedSortByField: string = this.sortByField[0].value;
  selectedSortDirection: string = this.sortDirections[0].value;
  queryData: postsQuery =  {
    tags: this.tags.toString(),
    sortBy: this.selectedSortByField,
    direction: this.selectedSortDirection
  }


  constructor(private postService: PostsService, private toastr: ToastrService) {

  }
  // Tag chips related functions

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add tag to list
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  removeTag(tag:string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);

    }
  }

  // Get required posts based on inputs
  getPosts(){

    // construct query data
    this.queryData.tags = this.tags.toString();
    this.queryData.sortBy = this.selectedSortByField;
    this.queryData.direction = this.selectedSortDirection;

    this.loading = true;
    this.postService.fetchPosts(this.queryData).subscribe({
      next: response => {
        this.fetchedPosts = response;
        this.toastr.success("Posts retrieved successfully");
        this.loading = false;
      },
      error: err => {
        console.log("Error retrieving posts", err);
        this.fetchedPosts=err.error;
        this.loading = false;
      }
    });
  }

}
