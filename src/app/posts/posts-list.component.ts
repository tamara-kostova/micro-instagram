import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CompletePostService } from "./shared/completeposts.service";
import { IPost } from "./shared/post.model";
import { style } from "@angular/animations";

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
    `,
})
export class PostsListComponent implements OnInit{
  posts: IPost[]
  constructor(private postService : CompletePostService, private route:ActivatedRoute){
  }
  ngOnInit(){
    this.posts = this.postService.getAllPosts()
  }
  deletePost(id:any){
    if (window.confirm("Are you sure you want to delete this post?")) {
      this.posts=this.posts.filter(post=> post.id!=id)
      this.postService.removePost(id)
  }
}
  edit(id:any){
    this.postService.getIdforEdit(id)
  }
}