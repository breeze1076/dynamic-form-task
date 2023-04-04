import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { FormContent, FormField } from '../models/form-field';

@Injectable({
  providedIn: 'root'
})
export class FormFieldsService {

  constructor(private http: HttpClient) {}

  getFormFields(): Observable<FormContent> {
    return this.http.get('assets/form.json').pipe(delay(1000)).pipe(map((data:any) => {
      const result = new FormContent();
      result.title = data['title'];
      result.formFields = data['formFields'].map((f: any) => new FormField({ 
        name: f.name, 
        priority: f.priority,
        fieldType: f.fieldType,
        mandatory: f.mandatory,
        isMultiline: f.isMultiline,
        options: f.options,
        dependencies: f.dependencies,
        id: f.id
      }));
      return result;
    }));
  }
}
