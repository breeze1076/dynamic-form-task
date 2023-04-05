import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField, FieldType } from 'src/app/models/form-field';
import { DropdownOption } from 'src/app/common-components/dropdown/dropdown.component';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css']
})
export class FormFieldComponent implements OnInit {
  @Input() formField!: FormField;
  @Input() formGroup!: FormGroup;
  options!: DropdownOption[];
  FieldType = FieldType;
  
  ngOnInit(): void {
    this.options = this.getDropDownOptions(this.formField);
  }

  private getDropDownOptions(formField: FormField) {
    let result: DropdownOption[] = [];
    if (formField.fieldType === FieldType.DropDown) {
      result = formField.options
        .sort((a, b) => a.priority - b.priority)
        .map(o => new DropdownOption(o.id, o.name));
    }
    return result;
  }
}
