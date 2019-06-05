import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanktransactionComponent } from './banktransaction.component';

describe('BanktransactionComponent', () => {
  let component: BanktransactionComponent;
  let fixture: ComponentFixture<BanktransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanktransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanktransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
