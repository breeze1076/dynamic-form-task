import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FormContent } from 'src/app/models/form-field'
import { FormFieldsService } from './form-fields.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormFieldsResolver implements Resolve<FormContent> {

  constructor(private service: FormFieldsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): FormContent | Observable<FormContent> | Promise<FormContent> {
    return this.service.getFormFields();
  }
}
