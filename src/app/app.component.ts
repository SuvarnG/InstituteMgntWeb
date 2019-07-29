import { Component } from '@angular/core';
import { Router, NavigationStart, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isLoginPage: boolean = false;

  constructor(router: Router, private route: ActivatedRoute) {
    
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event.url.toLowerCase() == "/login" || event.url.toLowerCase() == "/") {
          this.isLoginPage = true;
          console.log('page:', this.isLoginPage);
        }
        else{
          this.isLoginPage=false;
        }
      }
    });
  }

}
