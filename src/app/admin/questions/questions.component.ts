import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { QuestionserviceService } from 'src/app/service/questionservice.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  questions: any[] = [];
  totalScore: number = 0;
  constructor(private questionservice:QuestionserviceService, private route:Router){}
  
  ngOnInit(): void {
   this.fetchQuestions();
    }

    fetchQuestions() {
      this.questionservice.getQuestions().subscribe((questions) => {
        this.questions = questions; // No need for extra extraction
      });
    }

    editQuestion(id: number) {
      this.route.navigate([`/admin/edit-question/${id}`]); // ✅ Corrected
    }

  deleteQuestion(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this question?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.questionservice.deleteQuestion(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'The question has been deleted.', 'success');
            this.fetchQuestions(); // Refresh the list after deletion
          },
          error: (err) => {
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete the question. Please try again.',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        });
      }
    });
  }
   
}
