import { Component } from '@angular/core';

@Component({
  selector: 'posts-app',
  template: `
  <nav-bar></nav-bar>
  <router-outlet></router-outlet>`
})
export class PostsAppComponent {
  title = 'app';
}
