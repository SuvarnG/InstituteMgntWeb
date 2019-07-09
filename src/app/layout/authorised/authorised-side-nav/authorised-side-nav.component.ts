import { Component, OnInit } from '@angular/core';
import { AuthorisedSideNavService } from '../services/authorised-side-nav.service';
import { Utils} from '../../../Utils';
import { BsModalService,BsModalRef } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthorizedSideNavService } from './authorized-side-nav.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-authorised-side-nav',
  templateUrl: './authorised-side-nav.component.html',
  styleUrls: ['./authorised-side-nav.component.css']
})
export class AuthorisedSideNavComponent implements OnInit {

  public newThumbnailUrl:any='../../assets/images/MProfile.jpg';
  public currentRole:string;

constructor(public sideNavService: AuthorisedSideNavService, private modalService:BsModalService,
              private formBuilder: FormBuilder, public AuthorizedSideNavService:AuthorizedSideNavService,
              public _DomSanitizer:DomSanitizer) { }

 
  userImageUploadForm:FormGroup
  modalRef: BsModalRef
  

  ngOnInit() {

    this.checkStaff();
  
    this.userImageUploadForm = this.formBuilder.group({
          Photo:[],
          Id:[]
    })
 }

 public user=Utils.GetCurrentUser();
 //public photo=this.user.Photo;
  checkStaff(){
    debugger;
    this.currentRole = Utils.GetUserRole();
    console.log(JSON.stringify(this.currentRole));
  }

//   get users(): any {
//     return sessionStorage.getItem('CurrentUser');
// }

changeUserImage(template:any){
  if(confirm('Do you want to change Your Image?')){
    debugger;
   this.modalRef=this.modalService.show(template);

  } 
}

handlePhotoInput(event:any){
  debugger;
  if (event.target.files.length) {
    const file = event.target.files[0];
    this.userImageUploadForm.get('Photo').setValue(file);
  }
}


onUploadPhoto()
  {
    debugger;
    const formData = new FormData();
    formData.append('profile',this.userImageUploadForm.get('Photo').value)//this.registerForm.get('Documents').value);
    this.AuthorizedSideNavService.postPhoto(formData).subscribe(
      res=>{
        debugger;
          
          if(res['type']==4){
           this.newThumbnailUrl='Http://'+ res['body']['Message'];
           
          }
                        
      }
    )
   
  }

  submitUserImage(){
    if(this.userImageUploadForm.invalid){
        return;
    }
    debugger;
    let body={
        Photo:this.newThumbnailUrl,
        Id:this.user.userId

    }

    this.AuthorizedSideNavService.submitUserImage(body).subscribe(data=>{      
    });
    this.user.Photo=this.newThumbnailUrl
    this.modalRef.hide();
    //sessionStorage.setItem('Photo',this.AuthorizedSideNavService.thumbnailUrl)
  }

  

    
}
