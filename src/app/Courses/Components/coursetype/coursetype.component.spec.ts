import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursetypeComponent } from './coursetype.component';

describe('CoursetypeComponent', () => {
  let component: CoursetypeComponent;
  let fixture: ComponentFixture<CoursetypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursetypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
