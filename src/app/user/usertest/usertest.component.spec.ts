import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsertestComponent } from './usertest.component';

describe('UsertestComponent', () => {
  let component: UsertestComponent;
  let fixture: ComponentFixture<UsertestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsertestComponent]
    });
    fixture = TestBed.createComponent(UsertestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
