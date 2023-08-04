import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Photo } from "./shared/photo.model";
import { PostListService } from "./shared/postlist.service";

@Component({
    selector:'posts',
    template: `
    <div>
      <h1>Posts</h1>
      <hr/>
      <div class="row">
        <div *ngFor="let post of posts | paginate
              : {
                  itemsPerPage: 10,
                  currentPage: pagenumber,
                  totalItems: 100
                }" class="col-md-5">
          <post-thumbnail [post]="post">
          </post-thumbnail>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
    <pagination-controls
      (pageChange)="renderPage($event)"
    ></pagination-controls>
  </div>
    `,
})
export class PostsListComponent implements OnInit{

  posts: Photo[] = []
  pagenumber : number = 1
  constructor(private postlistservice : PostListService, private route:ActivatedRoute){
  }
  ngOnInit(){
    this.postlistservice.getPhotos(this.pagenumber).subscribe(data=>{this.posts=data})
  }
  deletePost(id:any){
    if (window.confirm("Are you sure you want to delete this post?")) {
      this.postlistservice.deletePost(id).subscribe()
      this.posts=this.posts.filter(post=> post.id!=id)
    }
  }
  edit(id:any){
    this.postlistservice.getIdforEdit(id)
  }
  renderPage(event: number) {
    this.pagenumber = event;
    this.postlistservice.getPhotos(this.pagenumber).subscribe(data=>{this.posts=data});
  }
}