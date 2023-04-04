import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FieldType, FormField, FormContent } from 'src/app/models/form-field';
import { FormFieldsService } from 'src/app/services/form-fields.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [FormFieldsService]
})
export class FormComponent implements OnInit {
  title: string = "";
  formFields: FormField[] = [];
  formGroup: FormGroup = new FormGroup({});
  errors: string[] = [];

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({formContent}) => {
      this.title = formContent.title;
      this.formFields = formContent.formFields;
      this.createFormGroup();
    });
  }

  onSubmit() {
    const invalidControls = (Object.keys(this.formGroup.controls) as (keyof typeof this.formGroup.controls)[])
      .filter(k => !this.formGroup.controls[k].valid);
    this.errors = invalidControls.map(c => `${c} is required`); 
    if (this.formGroup.valid) {
      const payload = JSON.stringify(this.formGroup.getRawValue());
      console.log(payload);
    }
  }

  isFormFieldVisible(formField: FormField): boolean {
    return formField.dependencies.every(d => {
      const sourceField = this.formFields.find(f => f.id === d.dependencyId);
      if (!sourceField) {
        return true;
      }
      return this.formGroup.controls[sourceField.name].value === d.dependencyValue;
    });
  }

  private createFormGroup() {
    const group: any = {};
    this.formFields.sort((a, b) => (a.priority - b.priority)).forEach(f => {
      const value = f.fieldType === FieldType.Checkbox ? false : '';
      const validators = f.mandatory 
        ? f.fieldType === FieldType.Checkbox ? Validators.requiredTrue : Validators.required
        : undefined;
      group[f.name] = new FormControl(value, validators);
    })
    this.formGroup = new FormGroup(group);
  } 
}
