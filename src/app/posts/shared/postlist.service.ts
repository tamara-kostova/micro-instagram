import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Photo } from './photo.model';
import { IPost } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostListService {
  private src = "https://jsonplaceholder.typicode.com/photos"
  //http://jsonplaceholder.typicode.com/photos?_page=10
  idforEdit : any
  constructor(private httpClient: HttpClient) { 

  }
  public getPhotos(pagenumber:number): Observable<Photo[]>{
    return this.httpClient.get<Photo[]>(this.src+"?_page="+pagenumber).pipe(map(data => data))
  }  
  savePost(post:IPost){
    let options = {headers:new HttpHeaders({'Content-Type':'application/json'})}
    return this.httpClient.post<IPost>(this.src,post,options).pipe(catchError(this.handleError<IPost>('savePost')));
  }
  getIdforEdit(id:any){
    this.idforEdit = id
  }
  editPost(post:IPost){
    if (this.idforEdit){
      let options = {headers:new HttpHeaders({'Content-Type':'application/json'})}
      return this.httpClient.put<IPost>(this.src+"/"+this.idforEdit,post,options).pipe(catchError(this.handleError<IPost>('editPost')));
    }
  }
  deletePost(id:any){
    return this.httpClient.delete(this.src+id).pipe(catchError(this.handleError<IPost>('deletePost')));
  }
  private handleError<T>(operation='operation',result?:T){
    return (error:any):Observable<T>=>{
      console.error(error)
      return of(result as T)
    }
  }
}