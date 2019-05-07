import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestinomialsComponent } from './testinomials.component';

describe('TestinomialsComponent', () => {
  let component: TestinomialsComponent;
  let fixture: ComponentFixture<TestinomialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestinomialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestinomialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
