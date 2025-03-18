import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserpageComponent } from './userpage/userpage.component';
import { UserscoreComponent } from './userscore/userscore.component';
import { UsertestComponent } from './usertest/usertest.component';

const routes: Routes = [
  {path:'user-page', component: UserpageComponent},
  {path:'user-score', component: UserscoreComponent},
  {path:'user-test', component: UsertestComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
