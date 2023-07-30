import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CompletePostService } from "./shared/completeposts.service";
import { IPost } from "./shared/post.model";

@Component({
    selector:'posts',
    template: `
    <div>
      <h1>Posts</h1>
      <hr/>
      <div class="row">
        <div *ngFor="let post of posts" class="col-md-5">
          <post-thumbnail [post]="post" >
          </post-thumbnail>
        </div>
      </div>
    </div>
    `
})
export class PostsListComponent implements OnInit{
  posts: IPost[]
  constructor(private postService : CompletePostService, private route:ActivatedRoute){
  }
  ngOnInit(){
    this.posts = this.postService.getAllPosts()
  }
}