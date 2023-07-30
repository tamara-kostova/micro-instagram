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
          <button (click)="deletePost(post.id)" class="btn btn-default">DELETE POST</button>
          <button (click)="edit(post.id)" [routerLink]="['/posts/edit',post.id]" class="btn btn-default">EDIT POST</button>
        </div>
      </div>
    </div>
    `,
    styles:[`
      button{
        margin-bottom: 20px;
        background-color: #014f86;
        margin-left:2.5px;
        margin-right:2.5px;
      }
      button:hover{background-color:#2c7da0}
    `]
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