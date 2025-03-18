import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UploadComponent } from './upload/upload.component';
import { QuestionsComponent } from './questions/questions.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { StudentlistComponent } from './studentlist/studentlist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [
    UploadComponent,
    QuestionsComponent,
    AdminpageComponent,
    StudentlistComponent
    
   
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  
  ]
})
export class AdminModule { }
