import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from './post-short.model';
import { IPost } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostDetailsService {
  private src = "https://jsonplaceholder.typicode.com/posts"
  constructor(private httpClient: HttpClient) { 

  }
  public getPost(id:number): Observable<IPost>{
    return this.httpClient.get<IPost>(this.src+'/'+id).pipe(map(data => data))
  }
  
}