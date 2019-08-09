import { Component, OnInit, TemplateRef } from '@angular/core';
import { BranchManagerService } from '../../services/branch-manager.service';
import { Utils } from '../../../Utils';
import {BranchManager, Branch} from 'shared/Model/Branch'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { InstituteService } from '../../../superAdmin/components/institute/institute.service';
import { Institutes } from 'shared/Model/Institutes';
import { BranchService } from '../../../instituteAdmin/services/branch.service';
import { InstituteAdminService } from '../../../superAdmin/services/institute-admin.service';

@Component({
  selector: 'app-branch-manager',
  templateUrl: './branch-manager.component.html',
  styleUrls: ['./branch-manager.component.css']
})
export class BranchManagerComponent implements OnInit {

  branchManagerList : BranchManager[];
  createNewBranchManagerForm:FormGroup;
  editNewBranchManagerForm:FormGroup;
  detailsManagerForm:FormGroup;
  modalRef:BsModalRef;
  submitted=false;
  branchManagerId:number;
  institutesList:Institutes[];
  thumbnailUrl:any='../../assets/images/MProfile.jpg';
  branchList:Branch[];
  filter:any;
  p:any;
  chkEmailId:any

  constructor(private branchManagerService:BranchManagerService,
              private formBuilder:FormBuilder,
              private modalService:BsModalService,
              private instituteService:InstituteService,
              private branchService: BranchService,
              private instituteAdminService:InstituteAdminService) { }

  ngOnInit() {

    this.createNewBranchManagerForm=this.formBuilder.group({
      FirstName:['',Validators.required],
      LastName:['',Validators.required],
      Gender:['Male',Validators.required],
      Address:['', Validators.required],
      ContactNo:['',[Validators.required,Validators.minLength,Validators.maxLength]],
      Email:['',[Validators.required,Validators.email]],
      Password:['',Validators.required],
      VerifyPassword:['',Validators.required],
      Photo:[],
      BranchId:['',Validators.required]
    })


    this.editNewBranchManagerForm = this.formBuilder.group({
      FirstName:['',Validators.required],
      LastName:['',Validators.required],
      Gender:['',Validators.required],
      Address:['', Validators.required],
      ContactNo:['',[Validators.required,Validators.minLength,Validators.maxLength]],
      Email:['',[Validators.required,Validators.email]],
      Photo:[],
      BranchId:[]
    })


    this.detailsManagerForm = this.formBuilder.group({
      FirstName:[],
      LastName:[],
      Gender:[],
      Address:[],
      Contact:[],
      Email:[],
      BranchName:[]
    })


    this.getAllBranchManagers();
  

  }

  public user= Utils.GetCurrentUser();

  get f() {return this.createNewBranchManagerForm.controls}

  get fu() {return this.editNewBranchManagerForm.controls}

  get g() {return this.detailsManagerForm.controls}

  getAllBranchManagers(){
    this.branchManagerService.getAllBranchManagers(this.user.InstituteId).subscribe(data=>{
      this.branchManagerList = data
    })
  }

  openCreateBranchManagerModal(newBranchManagerTemplate:TemplateRef<any>){

    this.getBranchList()

    this.modalRef = this.modalService.show(newBranchManagerTemplate,{
      animated: true,
      backdrop: 'static',
      class: 'modal-lg'
    })
  }


  getBranchList(){
    this.branchService.getBranches(this.user.InstituteId).subscribe(data=>{
        this.branchList=data
    })
  }


  createNewBranchManager(){

    this.submitted= true;
    if(this.createNewBranchManagerForm.invalid || this.chkEmailId>0){
      return;
    }

    if(this.createNewBranchManagerForm.controls.Password.value!=this.createNewBranchManagerForm.controls.VerifyPassword.value){
      alert('Sorry, Passwords did not match... Please verify password')
      return
    }

    let body={     
    FirstName:this.createNewBranchManagerForm.controls.FirstName.value,
    LastName:this.createNewBranchManagerForm.controls.LastName.value,
    Gender:this.createNewBranchManagerForm.controls.Gender.value,
    Address:this.createNewBranchManagerForm.controls.Address.value,
    Contact:this.createNewBranchManagerForm.controls.ContactNo.value,
    Email:this.createNewBranchManagerForm.controls.Email.value,
    Password:this.createNewBranchManagerForm.controls.Password.value,
    Photo:this.thumbnailUrl,
    InstituteId:this.user.InstituteId,
    BranchId:this.createNewBranchManagerForm.controls.BranchId.value,
    CreatedBy:this.user.userId,
    RoleId:18
    }

    this.branchManagerService.createNewBranchManager(body).subscribe(data=>{
      this.getAllBranchManagers();
      this.modalRef.hide();
    })

  }


  editBranchManagerModal(EditBranchManagerTemplate:TemplateRef<any>,a){

    this.thumbnailUrl = a.Photo;
    this.branchManagerId=a.Id;
    let body ={

      FirstName:a.FirstName,
      LastName:a.LastName,
      Gender:a.Gender,
      Address:a.Address,
      ContactNo:a.Contact,
      Email:a.Email,
      Photo:this.thumbnailUrl,
      BranchId:a.BranchId

    }

    this.getBranchList();
    this.editNewBranchManagerForm.patchValue(body);
    this.modalRef= this.modalService.show(EditBranchManagerTemplate,{
      animated: true,
      backdrop: 'static',
      class: 'modal-lg'
    })
  }


  editNewBranchManager(){
    this.submitted=true;
    if(this.editNewBranchManagerForm.invalid || this.chkEmailId>0){
      return 
    }

    this.submitted=false;
    let body ={
      Id:this.branchManagerId,
      FirstName:this.editNewBranchManagerForm.controls.FirstName.value,
      LastName:this.editNewBranchManagerForm.controls.LastName.value,
      Gender:this.editNewBranchManagerForm.controls.Gender.value,
      Address:this.editNewBranchManagerForm.controls.Address.value,
      Contact:this.editNewBranchManagerForm.controls.ContactNo.value,
      Email:this.editNewBranchManagerForm.controls.Email.value,
      Photo:this.thumbnailUrl,
      UpdatedBy:this.user.userId,

    }

    this.branchManagerService.editNewBranchManager(body).subscribe(data=>{
      this.getAllBranchManagers();
      this.modalRef.hide();
    })
  }


  openManagerDetailsPopup(ManagerDetailsTemplate:TemplateRef<any>,b){
    let body ={
      FirstName:b.FirstName,
      LastName:b.LastName,
      Gender:b.Gender,
      Address:b.Address,
      Contact:b.Contact,
      Email:b.Email,
      InstituteName:b.InstituteName,
      BranchName:b.BranchName
    }

    this.detailsManagerForm.patchValue(body);

    this.modalRef = this.modalService.show(ManagerDetailsTemplate,{
      animated: true,
      backdrop: 'static',
      class: 'modal-lg'
    })
    
  }





  deleteBranchManager(id:number,firstName:string,lastName:string){
    if(confirm('Do you want to delete this Branch Manager? : ' + firstName + ' '+ lastName)){
      this.branchManagerService.deleteBranchManager(id).subscribe(data=>{
        this.getAllBranchManagers();
      })
    }

  }


  onImageSelected(event: any) {
    if (event.target.files.length) {
      const file = event.target.files[0];
      this.createNewBranchManagerForm.get('Photo').setValue(file);
    }
  }

  onUploadPhoto() {
    const formData = new FormData();
    formData.append('profile', this.createNewBranchManagerForm.get('Photo').value)//this.registerForm.get('Documents').value);
    this.branchManagerService.postPhoto(formData).subscribe(
      res=>{      
          if(res['type']==4){
           this.thumbnailUrl='Http://'+ res['body']['Message'];
           
          }
                        
      }
    )
  }


  validatingExistingUserEmail(EmailId:string){
    debugger;
    return this.instituteAdminService.validatingExistingUserEmail(EmailId).subscribe(data=>{
      this.chkEmailId=data;
    })
}


  onCancel(){
    this.modalRef.hide();
    this.submitted=false;
    this.chkEmailId=0;
  }

}
