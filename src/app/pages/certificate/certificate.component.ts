import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-certificate',
  templateUrl: './certificate.component.html',
})
export class CertificateComponent implements OnInit {

  url = environment.baseUrl;
  public myForm: FormGroup;
  private formBuilder: FormBuilder

  constructor(private http: HttpClient,
              private toastService: NbToastrService,
              private fb: FormBuilder
    ) {
      this.formBuilder = fb
   }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      certificate: [null, [Validators.required]],
    });
  }

  validate() {
    if (this.myForm.valid) {
      console.log(this.myForm.controls.certificate.value)
      this.http.get(`${this.url}/subscription/v1/subscription/certificate/${this.myForm.controls.certificate.value}`)
      .subscribe(
        () =>  this.showToast('success', 'Certificado válido'),
        error => this.showToast('danger', error.error.userMessage),
      )
    }
  }

  protected showToast(status: NbComponentStatus, message: String) {
    this.toastService.show(message, null, { status });
  }

}
