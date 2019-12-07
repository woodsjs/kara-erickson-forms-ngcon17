import { Component, OnInit, Self } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ControlValueAccessor,
  NgControl
} from '@angular/forms';

@Component({
  selector: 'app-composite-cva',
  templateUrl: './composite-cva.component.html',
  styleUrls: ['./composite-cva.component.css']
})
export class CompositeCvaComponent implements OnInit, ControlValueAccessor {
  constructor(@Self() public controlDir: NgControl) {
    controlDir.valueAccessor = this;

    this.form = new FormGroup({
      street: new FormControl(null),
      city: new FormControl(null)
    });
  }

  onTouched: () => {};

  form: FormGroup;
  writeValue(val: any): void {
    console.log('Forms setvalue parameter will be ', val);

    // patchValue can set junk, so you need to handle those cases before doing this
    // and we set emitEvent to false so we don't re-emit changes triggered by registerOnChange
    val && this.form.setValue(val, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    this.form.valueChanges.subscribe(fn);
    console.log('Sucribed to form registerOnChange');
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }

  ngOnInit() {}
}
