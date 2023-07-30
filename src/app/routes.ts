import { Routes } from '@angular/router'
import{
    PostDetailsComponent,
    CreatePostComponent,
    PostsListComponent,
    PostRouteActivator
} from './posts/index'
import { Error404Component } from './errors/404.component';

export const appRoutes : Routes = [
    {path: 'posts/new', component: CreatePostComponent,
canDeactivate: ['canDeactivateCreateEvent']},
    {path: 'posts', component: PostsListComponent},
    {path: 'posts/:id', component: PostDetailsComponent,
canActivate:[PostRouteActivator]},
    {path: '404', component: Error404Component},
    {path: '', redirectTo :'/posts', pathMatch: 'full'},
    {
        path: 'user', 
        loadChildren: ()=> import('./user/user.module').
        then(m=>m.UserModule)
    }
]