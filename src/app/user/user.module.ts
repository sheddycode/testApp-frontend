import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserpageComponent } from './userpage/userpage.component';
import { UsertestComponent } from './usertest/usertest.component';
import { UserscoreComponent } from './userscore/userscore.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserpageComponent,
    UsertestComponent,
    UserscoreComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
