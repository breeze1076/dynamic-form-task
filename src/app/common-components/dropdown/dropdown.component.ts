import { Component, Input, forwardRef, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropdownComponent),
    multi: true,
  }]
})

export class DropdownComponent implements ControlValueAccessor {
  constructor () { }

  @Input() id: string = "";
  @Input() placeHolder: string = "";
  @Input() options: DropdownOption[] = [];

  currentValue: any;

  private onChange!: (value: string) => void;
  private onTouch!: (value: string) => void;

  onSelectValueChange = (value: any) => {
    this.onChange(value);
    this.onTouch(value);
  }

  writeValue(obj: any): void {
    this.currentValue = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}

export class DropdownOption {
  value: any = "";
  label: string = "";

  constructor(value: any, label: string) {
    this.value = value;
    this.label = label;
  }
}
