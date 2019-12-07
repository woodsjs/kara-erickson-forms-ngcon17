import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'KaraECustomControl';

  fg: FormGroup;

  ngOnInit() {
    console.log('Calling ngOnInit in our calling component');
    this.fg = new FormGroup({
      ourInput: new FormControl(null),
      theAddress: new FormControl(null)
    });
  }
}
