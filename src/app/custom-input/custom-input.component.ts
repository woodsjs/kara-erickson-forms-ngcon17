import { Component, OnInit, ViewChild, ElementRef, Self } from '@angular/core';
import {
  ControlValueAccessor,
  // NG_VALUE_ACCESSOR,
  Validators,
  AbstractControl,
  // NG_VALIDATORS,
  NgControl,
  ValidationErrors
} from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css']
  // when we inject NgControl, it does this for us. Otherwise we need to
  // handle ngModels injected token. We need this or angular won't see anything (without NgControl)
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     multi: true,
  //     useExisting: CustomInputComponent
  //   },
  //   {
  //     provide: NG_VALIDATORS,
  //     multi: true,
  //     useExisting: CustomInputComponent
  //   }
  // ]
})
export class CustomInputComponent implements OnInit, ControlValueAccessor {

  // Injecting NgControl so formcontrolname, formcontrol directive and NgModel
  // all work easily. They all provide themselves as NgControl
  constructor(@Self() public controlDir: NgControl) {
    // This line gives you the value accessor.
    // Without it you would get an error
    // No value accessor for form control with name
    controlDir.valueAccessor = this;
    console.log('Constructor called');
  }
  disabled;
  // get's value from the input.  The input should now have #input for this
  @ViewChild('input') input: ElementRef;

  // just for show, a custom validator.  Makes sure that the value isn't nul
  // and is at least three characters.
  // Not using a ternary operator here cause it's a little longer than
  // I like for that
  static myValidationStuff(ctrl: AbstractControl): ValidationErrors {
    if (ctrl.value != null && ctrl.value.length > 3) {
      return null;
    } else {
      return { noLongEnough: true };
    }
  }

  onChange = () => {};
  onTouched = () => {};

  writeValue(value: any) {
    // set the input's value property so what's inputted on the form becomes the value
    this.input.nativeElement.value = value;
    console.log('writeValue ', value);
  }

  // the form is passing us the function it wants us to call
  // when the value changes on the dom. We need to save this somewhere.
  // This is called on the input event.
  registerOnChange(fn: any): void {
    this.onChange = fn;
    console.log('registerOnChange called');
  }

  // the form is passing us the function it wants us to call
  // when the input is touched. We need to save this somewhere.
  // This is called on onBlur event.
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
    console.log('registerOnTouched called');
  }

  // we can use the default functionality.
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    console.log('setDisabledState called');
  }

  ngOnInit() {
    console.log('ngOnInit called');
    const control = this.controlDir.control;
    const validators = control.validator
      ? [control.validator, this.validate]
      : this.validate;
    control.setValidators(validators);
    control.updateValueAndValidity();
  }

  // let's set up some custom validation.  It's easier, in my opinion
  // to handle all validation calls that we want mandatory right
  // here in our validate call.  Then it's just some basic logic.
  validate(ctrl: AbstractControl) {
    const myValidation = CustomInputComponent.myValidationStuff(ctrl);
    const validRequired = Validators.required(ctrl);
    return!myValidation && !validRequired ? null : [myValidation, validRequired];
    }
  }
