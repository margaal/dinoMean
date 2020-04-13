import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDinoComponent } from './list-dino.component';

describe('ListDinoComponent', () => {
  let component: ListDinoComponent;
  let fixture: ComponentFixture<ListDinoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
