import { Component } from '@angular/core';
import {LoginService} from './login/login.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular';
  showMenu:boolean=true;
  constructor(router:Router) {
    debugger; 
    router.events.forEach((event) => {
        if(event instanceof NavigationStart) {
          this.showMenu=true;
          if(event.url=='/Login')
          {
            this.showMenu = event.url !== "/Login";
          }
          if(event.url=='/')
          {
            this.showMenu = event.url !== "/";
          }
            
        }
      });
    }

}
