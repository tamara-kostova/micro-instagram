import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule} from '@angular/router'

import{
  PostsListComponent,
  PostThumbnailComponent,
  PostDetailsComponent,
  PostRouteActivator,
  CreatePostComponent
}from './posts/index'

import { PostsAppComponent } from './posts-app.component';
import { NavBarComponent } from './nav/navbar.component';
import { TOASTER_TOKEN, Toastr } from './common/toastr.service';
import { appRoutes } from './routes';
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollapsibleWellComponent } from './common/collapsible-well.component';
import { PhotosService } from './posts/shared/photos.service';
import { HttpClientModule } from '@angular/common/http';
import { EditPostComponent } from './posts/edit-post.component';
import { PostDetailsService } from './posts/shared/postdetails.service';
import { PostListService } from './posts/shared/postlist.service';
import { AngularPaginatorModule } from 'angular-paginator';
import { NgxPaginationModule } from 'ngx-pagination';

declare let toastr : Toastr

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    NgxPaginationModule
  ],
  declarations: [
    PostsAppComponent,
    PostThumbnailComponent,
    NavBarComponent,
    PostDetailsComponent,
    CreatePostComponent,
    CollapsibleWellComponent,
    EditPostComponent,
    PostsListComponent
  ],
  providers:[
    {
      provide: TOASTER_TOKEN,
      useValue: toastr
    }, 
    PhotosService,
    PostRouteActivator,
    AuthService,
    PostDetailsService,
    PostListService,
  {provide: 
    'canDeactivateCreateEvent', 
    useValue: checkDirtyState}],
  bootstrap: [PostsAppComponent]
})
export class AppModule { 
}
export function checkDirtyState(component : CreatePostComponent){
  if (component.isDirty)
    return window.confirm('You have not saved this post, do you really want to cancel?')
  return true
}
