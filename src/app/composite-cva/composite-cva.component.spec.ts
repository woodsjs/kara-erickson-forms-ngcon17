import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompositeCvaComponent } from './composite-cva.component';

describe('CompositeCvaComponent', () => {
  let component: CompositeCvaComponent;
  let fixture: ComponentFixture<CompositeCvaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompositeCvaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompositeCvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
