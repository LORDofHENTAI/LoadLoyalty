import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyLoadComponent } from './loyalty-load.component';

describe('LoyaltyLoadComponent', () => {
  let component: LoyaltyLoadComponent;
  let fixture: ComponentFixture<LoyaltyLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoyaltyLoadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoyaltyLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
