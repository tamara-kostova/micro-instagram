import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Photo } from "./photo.model";

@Injectable({
    providedIn: 'root'
  })
  
  export class PhotosService {
    private src = "https://jsonplaceholder.typicode.com/photos"
    constructor(private httpClient: HttpClient) { 

    }
    public getPhotos(): Observable<Photo[]>{
      return this.httpClient.get<Photo[]>(this.src).pipe(map(data => data))
    }
    public getPhoto(id:number): Observable<Photo>{
      return this.httpClient.get<Photo>(this.src+'/'+id).pipe(map(data => data))
    }
  }