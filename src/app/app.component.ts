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
  showMenu:any;
  menu:boolean=false;
  constructor(router:Router) {
    router.events.forEach((event) => {
        if(event instanceof NavigationStart) {
            this.showMenu = event.url !== "/Login";
        }
      });
    }

}
