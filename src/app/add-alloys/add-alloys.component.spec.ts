import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlloysComponent } from './add-alloys.component';

describe('AddAlloysComponent', () => {
  let component: AddAlloysComponent;
  let fixture: ComponentFixture<AddAlloysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAlloysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAlloysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
