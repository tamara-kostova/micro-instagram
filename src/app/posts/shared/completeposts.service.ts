import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { Post } from './post-short.model';
import { IPost } from './post.model';
import { Photo } from './photo.model';
import { PhotosService } from './photos.service';
import { PostsService } from './post.service';

@Injectable({
  providedIn: 'root'
})
export class CompletePostService{
    postsList:Post[]=[]
    photoList:Photo[]=[]
    fullPostList:IPost[]=[]
    
    constructor(private postService: PostsService, private photoService: PhotosService){
      this.loadPosts()
    }

    getPost(id: any): Observable<IPost> {
      if (this.fullPostList.filter(post=>post.id==id)[0] === undefined) {
        return from(this.postService.getPost(id)).pipe(
          flatMap((post) => {
            return this.photoService.getPhoto(id).pipe(
              map((photo) => {
                const fullPost = new IPost(
                  post.userId,
                  post.id,
                  post.title,
                  post.body,
                  photo.url,
                  photo.thumbnailUrl
                );
                return fullPost;
              })
            );
          })
        );
      } else {
        return of(this.fullPostList.filter(post=>post.id==id)[0]);
      }
    }
loadPosts(): void{
    this.postService.getPosts().subscribe(
        data=>{
          console.log("Data:")
            this.postsList=data;
            this.loadPhotos();
        }
    )
    
}
loadPhotos(){
  this.photoService.getPhotos().subscribe(
      data=>{
          this.photoList=data.slice(0,100)
          this.showPosts()
      }
  )
}
showPosts(){
  console.log("Full post list:"+this.fullPostList)
  for(let i=0;i<this.postsList.length && i<this.photoList.length;i++ ){
      this.fullPostList.push(
          new IPost(
              this.postsList[i].userId,
              this.postsList[i].id,
              this.postsList[i].title,
              this.postsList[i].body,
              this.photoList[i].url,
              this.photoList[i].thumbnailUrl
          )
      )
  }
}
getAllPosts(){
  return this.fullPostList;
  console.log("Full post list:"+this.fullPostList)
}
savePost(post:IPost){
  this.fullPostList.push(post)
}
updatePosts(id:any){
  this.fullPostList.filter(post=>post.id!=id)
}
}

