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
        <div *ngFor="let post of posts" class="col-md-5">
          <post-thumbnail [post]="post" >
          </post-thumbnail>
        </div>
      </div>
    </div>
    `,
})
export class PostsListComponent implements OnInit{
  posts: Photo[] = []
  constructor(private postlistservice : PostListService, private route:ActivatedRoute){
  }
  ngOnInit(){
    this.postlistservice.getPhotos().subscribe(data=>{this.posts=data})
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
}