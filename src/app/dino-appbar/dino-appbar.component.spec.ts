import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DinoAppbarComponent } from './dino-appbar.component';

describe('DinoAppbarComponent', () => {
  let component: DinoAppbarComponent;
  let fixture: ComponentFixture<DinoAppbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinoAppbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinoAppbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
