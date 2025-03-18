import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserscoreComponent } from './userscore.component';

describe('UserscoreComponent', () => {
  let component: UserscoreComponent;
  let fixture: ComponentFixture<UserscoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserscoreComponent]
    });
    fixture = TestBed.createComponent(UserscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
