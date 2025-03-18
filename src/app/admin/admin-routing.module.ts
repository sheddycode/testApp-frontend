import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsComponent } from './questions/questions.component';
import { UploadComponent } from './upload/upload.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { StudentlistComponent } from './studentlist/studentlist.component';



const routes: Routes = [
  {path:'', component: AdminpageComponent,
    children:[
  {path: 'students', component: StudentlistComponent},
 {path:'questions', component: QuestionsComponent},
 {path:'upload', component: UploadComponent},
 {path: '', redirectTo:'questions', pathMatch:'full'}


    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
