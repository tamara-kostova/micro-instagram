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
    posts:Post[]=[]
    photos:Photo[]=[]
    completeposts:IPost[]=[]
    idforEdit : any
    
    constructor(private postService: PostsService, private photoService: PhotosService){
      this.loadPosts()
    }
    getAllPosts(){
      return this.completeposts;
    }
    getPost(id: any): Observable<IPost> {
      if (this.completeposts.filter(post=>post.id==id)[0] === undefined) {
        return from(this.postService.getPost(id)).pipe(
          flatMap((post) => {
            return this.photoService.getPhoto(id).pipe(
              map((photo) => {
                const completepost = new IPost(
                  post.userId,
                  post.id,
                  post.title,
                  post.body,
                  photo.url,
                  photo.thumbnailUrl
                );
                return completepost;
              })
            );
          })
        );
      } else {
        return of(this.completeposts.filter(post=>post.id==id)[0]);
      }
    }
    loadPosts(): void{
      this.postService.getPosts().subscribe(data=>{this.posts=data; this.loadPhotos();})
    }
    loadPhotos(){
      this.photoService.getPhotos().subscribe(data=>{this.photos=data.slice(0,100); this.updatePosts()})
    }
    updatePosts(){
      for(let i=0; i<this.posts.length && i<this.photos.length; i++){
          this.completeposts.push(
              new IPost(
                  this.posts[i].userId,
                  this.posts[i].id,
                  this.posts[i].title,
                  this.posts[i].body,
                  this.photos[i].url,
                  this.photos[i].thumbnailUrl
              )
          )
      }
    }
    savePost(post:IPost){
      this.completeposts.push(post)
    }
    getIdforEdit(id:any){
      this.idforEdit = id
    }
    editPost(post:IPost){
      console.log("id for edit: "+this.idforEdit)
      if (this.idforEdit)
        {
          post.id=this.idforEdit
          console.log("editing")
          console.log("postUserid: "+post.userId)
          console.log("body: "+post.body)
          console.log("url: "+post.url)
          this.removePost(this.idforEdit)
          this.completeposts.push(
            new IPost(
              post.userId,
              post.id,
              post.title,
              post.body,
              post.url,
              post.thumbnailUrl
            ))
          // this.updatePosts()
        }
      else
        this.completeposts.push(post)
    }
    removePost(id:any){
      this.completeposts.filter(post=>post.id!=id)
    }
}