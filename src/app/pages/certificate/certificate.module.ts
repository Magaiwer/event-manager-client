import { SharedModule } from '../../../shared/shared.module';
import { NgModule } from '@angular/core';

import { CertificateComponent } from './certificate.component';
import { CertificateRoutingModule } from './certificate-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [CertificateComponent],
  imports: [
    SharedModule,
    CertificateRoutingModule,
    ReactiveFormsModule
  ]
})
export class CertificateModule { }
