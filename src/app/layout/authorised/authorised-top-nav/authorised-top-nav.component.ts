import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-authorised-top-nav',
  templateUrl: './authorised-top-nav.component.html',
  styleUrls: ['./authorised-top-nav.component.css']
})
export class AuthorisedTopNavComponent implements OnInit {
  _cookieService: any;

  constructor(private router: Router,) { }

  ngOnInit() {
  }

  Logout(){
    console.log(1);
    localStorage.removeItem('CurrentUser');
    this.router.navigate(['/Login']);
  }

  

}
