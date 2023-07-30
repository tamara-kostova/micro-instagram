import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from './post-short.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private source = "http://jsonplaceholder.typicode.com/posts"
  constructor(private httpClient: HttpClient) { }

  public getPosts(): Observable<Post[]>{
    return this.httpClient.get<Post[]>(this.source).pipe(
      map(data => data)
    );
  }
  public getPost(id:number): Observable<Post>{
    return this.httpClient.get<Post>(this.source+'/'+id).pipe(map(data => data))
  }
  
}