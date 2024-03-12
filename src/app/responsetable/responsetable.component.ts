import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { PostDetailsModel, PostResponseModel } from '../_models/posts';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-responsetable',
  templateUrl: './responsetable.component.html',
  styleUrls: ['./responsetable.component.css']
})
export class ResponsetableComponent implements OnChanges{

  postDetails? : PostDetailsModel;
  @Input() loadingTable: boolean = true;
  @Input() fetchedPosts: any = {};
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['id', 'author', 'likes', 'popularity', 'reads','tags'];
  dataSource: any = {}

  constructor(){
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource<any>(this.fetchedPosts.posts);
    this.dataSource.paginator = this.paginator;
  }

}
