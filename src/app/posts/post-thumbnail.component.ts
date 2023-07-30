import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IPost } from "./shared/post.model";

@Component({
    selector: 'post-thumbnail',
    template:`
    <div [routerLink]="['/posts',post.id]" class="well hoverwell thumbnail">
        <h2>{{post?.title | uppercase}}</h2>
        <div>{{post?.body}}</div>
        <div *ngIf="post?.url">
            <img src="{{post?.thumbnailUrl}}">
        </div>
    </div>
    `,
    styles:[`
        .thumbnail{ height: 450px; text-align: center; align-items: center; display: flex; flex-direction: column;}
        .pad-left{margin-left: 10px;}
        .well div{color: #bbb;}
        img{height:150px; margin-top:5px}
    `]
})
export class PostThumbnailComponent{
    @Input() post: IPost 
}