import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-authorised-top-nav',
  templateUrl: './authorised-top-nav.component.html',
  styleUrls: ['./authorised-top-nav.component.css']
})
export class AuthorisedTopNavComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
  }

  Logout(){
    console.log(1);
    sessionStorage.removeItem('CurrentUser');
    this.router.navigate(['']);
  }

}
