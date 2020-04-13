import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDinoComponent } from './edit-dino.component';

describe('EditDinoComponent', () => {
  let component: EditDinoComponent;
  let fixture: ComponentFixture<EditDinoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
