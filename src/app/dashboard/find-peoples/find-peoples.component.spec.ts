import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindPeoplesComponent } from './find-peoples.component';

describe('FindPeoplesComponent', () => {
  let component: FindPeoplesComponent;
  let fixture: ComponentFixture<FindPeoplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindPeoplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindPeoplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
