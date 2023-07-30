import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, CanActivate } from "@angular/router";
import { CompletePostService } from "../shared/completeposts.service";

@Injectable()
export class PostRouteActivator implements CanActivate{
    constructor(private postService:CompletePostService, private router : Router){

    }
    canActivate(route:ActivatedRouteSnapshot){
        const postExists = !!this.postService.getPost(+route.params['id'])
        if (!postExists)
            this.router.navigate(['/404'])
        return postExists
    }
}