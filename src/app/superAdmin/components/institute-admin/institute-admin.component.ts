import { Component, OnInit, TemplateRef } from '@angular/core';
import { InstituteAdminService } from '../../services/institute-admin.service';
import { InstituteAdmins } from 'shared/Model/Institutes'
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Utils } from '../../../Core/Utils';
import { InstituteService } from '../institute/institute.service';
import { Institutes } from 'shared/Model/Institutes'

@Component({
  selector: 'app-institute-admin',
  templateUrl: './institute-admin.component.html',
  styleUrls: ['./institute-admin.component.css']
})
export class InstituteAdminComponent implements OnInit {

  constructor(private instituteAdminService: InstituteAdminService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private instituteService: InstituteService) { }


  instituteAdmins: InstituteAdmins[];
  instituteAdminId: number;
  createInstituteAdminForm: FormGroup;
  editInstituteAdminForm: FormGroup;
  detailsInstituteAdminForm: FormGroup;
  modalRef: BsModalRef;
  submitted = false;
  institutesList: Institutes[];
  chkEmailId: any;
  thumbnailUrl: any = '../../assets/images/MProfile.jpg';
  p: any;
  filter: any;

  ngOnInit() {

    this.createInstituteAdminForm = this.formBuilder.group({

      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Gender: ['Male', Validators.required],
      Address: ['', Validators.required],
      ContactNo: ['', [Validators.required, Validators.minLength, Validators.maxLength]],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required],
      VerifyPassword: ['', Validators.required],
      Photo: [],
      InstituteId: ['', Validators.required]

    })

    this.editInstituteAdminForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Gender: ['', Validators.required],
      Address: ['', Validators.required],
      ContactNo: ['', [Validators.required, Validators.minLength, Validators.maxLength]],
      Email: ['', [Validators.required, Validators.email]],
      Photo: [],
      InstituteId: ['', Validators.required]
    })

    this.detailsInstituteAdminForm = this.formBuilder.group({
      FirstName: [],
      LastName: [],
      Gender: [],
      Address: [],
      ContactNo: [],
      Email: [],
      Photo: [],
      InstituteId: [],
      InstituteName: []
    })

    this.getAllInstituteAdmins();

  }

  get f() { return this.createInstituteAdminForm.controls }

  get fu() { return this.editInstituteAdminForm.controls }

  get g() { return this.detailsInstituteAdminForm.controls }

  public user = Utils.GetCurrentUser();

  getAllInstituteAdmins() {
    this.instituteAdminService.getAllInstituteAdmins().subscribe(data => {
      this.instituteAdmins = data
    })
  }

  openCreateInstituteAdminModal(newInstituteAdminTemplate: TemplateRef<any>) {
    this.instituteService.getAllInstitutes().subscribe(data => {
      this.institutesList = data;
    })
    this.modalRef = this.modalService.show(newInstituteAdminTemplate, {
      animated: true,
      backdrop: 'static',
      class: 'modal-lg'
    })
  }

  createInstituteAdmin() {
    this.submitted = true;
    if (this.createInstituteAdminForm.invalid || this.chkEmailId > 0) {
      return
    }
    if (this.createInstituteAdminForm.controls.Password.value != this.createInstituteAdminForm.controls.VerifyPassword.value) {
      alert('Passwords did not match...Please verify passwords.')
      return
    }
    this.submitted = false;
    let body = {
      InstituteId: this.createInstituteAdminForm.controls.InstituteId.value,
      BranchId: 0,
      FirstName: this.createInstituteAdminForm.controls.FirstName.value,
      LastName: this.createInstituteAdminForm.controls.LastName.value,
      Gender: this.createInstituteAdminForm.controls.Gender.value,
      Address: this.createInstituteAdminForm.controls.Address.value,
      Contact: this.createInstituteAdminForm.controls.ContactNo.value,
      Email: this.createInstituteAdminForm.controls.Email.value,
      Photo: this.thumbnailUrl,
      Password: this.createInstituteAdminForm.controls.Password.value,
      CreatedBy: this.user.userId,
      RoleId: 2
    }
    this.instituteAdminService.createInstituteAdmin(body).subscribe(data => {
      this.getAllInstituteAdmins();
      this.modalRef.hide();
    })
  }

  editInstituteAdminModal(editInstituteAdminTemplate: TemplateRef<any>, a) {
    this.instituteService.getAllInstitutes().subscribe(data => {
      this.institutesList = data;
    })
    this.instituteAdminId = a.Id;
    this.thumbnailUrl = a.Photo;
    let body = {
      FirstName: a.FirstName,
      LastName: a.LastName,
      Gender: a.Gender,
      Address: a.Address,
      ContactNo: a.Contact,
      Email: a.Email,
      Photo: a.Photo,
      InstituteId: a.InstituteId
    }
    this.editInstituteAdminForm.patchValue(body);
    this.modalRef = this.modalService.show(editInstituteAdminTemplate, {
      animated: true,
      backdrop: 'static',
      class: 'modal-lg'
    })
  }

  editInstituteAdmin() {
    this.submitted = true;
    if (this.editInstituteAdminForm.invalid || this.chkEmailId > 0) {
      return
    }
    this.submitted = false;
    let body = {
      Id: this.instituteAdminId,
      FirstName: this.editInstituteAdminForm.controls.FirstName.value,
      LastName: this.editInstituteAdminForm.controls.LastName.value,
      Gender: this.editInstituteAdminForm.controls.Gender.value,
      Address: this.editInstituteAdminForm.controls.Address.value,
      Contact: this.editInstituteAdminForm.controls.ContactNo.value,
      Email: this.editInstituteAdminForm.controls.Email.value,
      Photo: this.thumbnailUrl,
      UpdatedBy: this.user.userId
    }
    this.instituteAdminService.updateInstituteAdmin(body).subscribe(data => {
      this.getAllInstituteAdmins();
      this.modalRef.hide();
    })
  }

  openAdminDetailsPopup(instituteAdminDetailsTemplate: TemplateRef<any>, a) {
    let body = {
      FirstName: a.FirstName,
      LastName: a.LastName,
      Gender: a.Gender,
      Address: a.Address,
      ContactNo: a.Contact,
      Email: a.Email,
      Photo: a.Photo,
      InstituteId: a.InstituteId,
      InstituteName: a.InstituteName
    }
    this.detailsInstituteAdminForm.patchValue(body);
    this.modalRef = this.modalService.show(instituteAdminDetailsTemplate, {
      animated: true,
      backdrop: 'static',
      class: 'modal-md'
    })
  }

  deleteInstituteAdmin(id: number, firstName: string, lastName: string) {
    if (confirm('Do you want to delete this Admin: ' + firstName + ' ' + lastName)) {
      this.instituteAdminService.deleteInstituteAdmin(id).subscribe(data => {
        this.getAllInstituteAdmins();
      });
    }
  }

  onImageSelected(event: any) {
    if (event.target.files.length) {
      const file = event.target.files[0];
      this.createInstituteAdminForm.get('Photo').setValue(file);
    }
  }

  onUploadPhoto() {
    const formData = new FormData();
    formData.append('profile', this.createInstituteAdminForm.get('Photo').value)//this.registerForm.get('Documents').value);
    this.instituteAdminService.postPhoto(formData).subscribe(
      res => {
        if (res['type'] == 4) {
          this.thumbnailUrl = 'Http://' + res['body']['Message'];
        }
      }
    )
  }

  validatingExistingUserEmail(EmailId: string) {
    debugger;
    return this.instituteAdminService.validatingExistingUserEmail(EmailId).subscribe(data => {
      this.chkEmailId = data;
    })
  }

  onCancel() {
    this.modalRef.hide();
    this.submitted = false;
    this.chkEmailId = 0;
  }

}
