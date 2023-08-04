import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Photo } from "./shared/photo.model";
import { PostDetailsService } from "./shared/postdetails.service";

@Component({
    selector: 'post-thumbnail',
    template:`
    <div [routerLink]="['/posts',post.id]" (click)="getUrl(post.url)" class="well hoverwell thumbnail">
        <h2>{{post.title | uppercase}}</h2>
        <div *ngIf="post?.thumbnailUrl">
            <img src="{{post.thumbnailUrl}}">
        </div>
    </div>
    `,
    styles:[`
        .thumbnail{ height: 380px; text-align: center; align-items: center; display: flex; flex-direction: column;background-color:#014f86}
        .pad-left{margin-left: 10px;}
        .well div{color: #bbb;}
        img{height:150px; margin-top:10px}
        .hoverwell:hover{background-color:#2c7da0;}
    `]
})
export class PostThumbnailComponent{
    @Input() post: Photo
    constructor(private postdetailsservice : PostDetailsService){
    }
    getUrl(url:string){
        console.log("Vo thumbnail "+url)
        this.postdetailsservice.setUrl(url);
    }
}