import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/service/authservice.service';
import { QuestionserviceService } from 'src/app/service/questionservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {

  username: string | null = '';

  constructor(
    private authService: AuthserviceService, 
    private questionService: QuestionserviceService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
  }

  startQuiz() {
    this.questionService.getQuestions().subscribe({
      next: (questions) => {
        console.log("Fetched questions:", questions); // ✅ Debugging log

        if (!questions || questions.length === 0) {
          console.warn("No questions found!"); // ✅ Debugging log

          Swal.fire({
            icon: 'error',
            title: 'No Questions Available',
            text: 'There are no questions available at the moment. Please check back later.',
            confirmButtonText: 'OK'
          });
        } else {
          // ✅ Start the test if questions exist
          this.router.navigate(['/user/user-test']);
        }
      },
      error: (error) => {
        console.error("Error fetching questions:", error); // ✅ Debugging log

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load questions. Please check your network and try again.',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logoutUser();
        Swal.fire('Logged Out!', 'You have been successfully logged out.', 'success');
      }
    });
  }
}
