import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from './post-short.model';
import { IPost } from './post.model';
import { Photo } from './photo.model';

@Injectable({
  providedIn: 'root'
})
export class PostDetailsService {
  private src = "https://jsonplaceholder.typicode.com/posts"
  private src2 = "https://jsonplaceholder.typicode.com/photos"
  url : string
  constructor(private httpClient: HttpClient) { 

  }
  public getPost(id:number): Observable<IPost>{
    return this.httpClient.get<IPost>(this.src+'/'+id).pipe(map(data => data))
  }
  public getUrl(id:number): Observable<Photo>{
    return this.httpClient.get<Photo>(this.src2+'/'+id).pipe(map(data => data))
  }
}