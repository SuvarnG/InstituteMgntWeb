import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialactComponent } from './socialact.component';

describe('SocialactComponent', () => {
  let component: SocialactComponent;
  let fixture: ComponentFixture<SocialactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
