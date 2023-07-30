import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CompletePostService } from "./shared/completeposts.service";
import { IPost } from "./shared/post.model";

@Component({
    templateUrl: './create-post.component.html',
    styles:[`
    em{ float: right; color: #E05C65; padding-left: 10px;}
    .error input{background-color: #E3C3C5;}
    .error ::-webkit-input-placeholder {color: #999}
    .error ::-moz-placeholder {color: #999}
    .error :-moz-placeholder {color: #999}
    .error :ms-input-placeholder {color: #999}
    `]
})
export class CreatePostComponent implements OnInit{
    post : any
    isDirty:boolean
    userId: string
    id: string
    title: string
    body: string
    url: string
    thumbnailUrl: string
    constructor (private router:Router, private postService : CompletePostService){
        
    }
    cancel(){
        this.router.navigate(['/posts']);
    }
    savePost(formValue:any){
        this.isDirty=false;
        this.postService.savePost(formValue)
        this.postService.savePost(
            new IPost(this.userId,this.id,this.title,this.body,this.url,this.thumbnailUrl)
        )
        this.router.navigate(['/posts']);
    }
    ngOnInit(): void {
    }
}