import { Component } from '@angular/core';

@Component({
  selector: 'app-home-layout',
  template: `<!-- Add top navigation componant -->
  <app-authorised-top-nav></app-authorised-top-nav>

  <div class="app-body">
    <!-- Add left navigation componant -->
    <app-authorised-side-nav ></app-authorised-side-nav>
    <main class="main">
      <router-outlet></router-outlet>
    </main>

  </div>

  <app-footer ></app-footer>
  `,
  styles: []
})
export class HomeLayoutComponent {}