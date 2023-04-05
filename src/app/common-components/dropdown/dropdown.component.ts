import { Component, Input, forwardRef, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Injector } from '@angular/core';
import { NgControl, FormControl } from '@angular/forms';

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

export class DropdownComponent implements ControlValueAccessor, AfterViewInit {
  constructor (private injector: Injector) { }

  @Input() options: DropdownOption[] = [];
  @Input() label: string = "";

  currentValue: any;
  isRequired: boolean = false;

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

  ngAfterViewInit(): void {
    const ngControl: any = this.injector.get(NgControl, null);
    if (ngControl) {
      const control = ngControl.control as FormControl;      
      this.isRequired = control.hasValidator(Validators.required);
    }    
  }
}

export class DropdownOption {
  value: any;
  label: string;

  constructor(value: any, label: string) {
    this.value = value;
    this.label = label;
  }
}
