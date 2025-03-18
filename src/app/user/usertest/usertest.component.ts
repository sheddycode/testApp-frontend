import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/service/authservice.service';
import { QuestionserviceService } from 'src/app/service/questionservice.service';
import { ScoreserviceService } from 'src/app/service/scoreservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usertest',
  templateUrl: './usertest.component.html',
  styleUrls: ['./usertest.component.css']
})
export class UsertestComponent {
  username: string | null = '';
  questions: any[] = [];
  currentQuestionIndex: number = 0;
  selectedAnswer: string | null = null;
  score: number = 0;
  timer: number = 30;
  interval: any;
  totalQuestions: number = 0;
  quizStarted: boolean = false;

  constructor(
    private questionService: QuestionserviceService, private authService:AuthserviceService,
    private scoreService: ScoreserviceService, private router:Router
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
    // Quiz starts only when user clicks start
    this.checkIfTestTaken();
  }

// In UsertestComponent

checkIfTestTaken() {
  const username = localStorage.getItem('username');
  this.scoreService.checkTestStatus().subscribe(
    (response) => {
      if (response.testTaken) {
        Swal.fire({
          icon: 'warning',
          title: `Hey ${this.username}! You have already taken the Test`,
          text: 'You cannot retake the test.',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/user-page']);
        });
      } else {
        this.quizStarted = true; // Allow quiz to start only if test is NOT taken
        this.fetchQuestions();
      }
    },
    (error) => {
      console.error('Error checking test status:', error);
    }
  );
}



fetchQuestions() {
  this.questionService.getQuestions().subscribe((questions) => {
    if (!questions || questions.length === 0) {
      // No questions available
      this.quizStarted = false;
      Swal.fire({
        icon: 'error',
        title: 'No Questions Available',
        text: 'There are no questions available at the moment. Please check back later.',
        confirmButtonText: 'OK'
      }).then(() => {
        this.router.navigate(['/user-page']); // Redirect to user page
      });
    } else {
      // Questions are available, start quiz
      this.questions = questions;
      this.totalQuestions = questions.length;
      this.quizStarted = true;
      this.startTimer();
    }
  });
}

  startTimer() {
    this.timer = 30;
    clearInterval(this.interval);
  
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(this.interval);
        this.submitQuiz(true); // Auto-submit without confirmation
      }
    }, 1000);
  }

  selectAnswer(option: string) {
    this.selectedAnswer = option;
  }

 // Navigate to a specific question when clicking a question number button
goToQuestion(index: number) {
  this.currentQuestionIndex = index;
  this.selectedAnswer = null; // Reset selected answer for each question
  this.startTimer(); // Restart timer
}

// Move to the next question
nextQuestion() {
  if (this.selectedAnswer) {
    if (this.selectedAnswer === this.questions[this.currentQuestionIndex].answer) {
      this.score += 5; // Add score for correct answer
    }
  }

  this.selectedAnswer = null; // Reset selected answer

  if (this.currentQuestionIndex < this.questions.length - 1) {
    this.currentQuestionIndex++;
    this.startTimer();
  }
}

// Move to the previous question
previousQuestion() {
  if (this.currentQuestionIndex > 0) {
    this.currentQuestionIndex--;
    this.startTimer();
  }
}
submitQuiz(autoSubmit: boolean = false) {
  if (!autoSubmit) {
    // Show confirmation alert
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to submit your test. Are you sure?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // ✅ Only stop the timer when confirmed
        clearInterval(this.interval);
        this.finalizeSubmission();
      } else {
        // ✅ If canceled, do nothing and let the timer continue
        Swal.fire('Submission Cancelled', 'You can review your answers before submitting.', 'info');
      }
    });
  } else {
    // ✅ Auto-submit (when time runs out)
    clearInterval(this.interval);
    this.finalizeSubmission();
  }
}
finalizeSubmission() {
  console.log("Submitting score:", this.score, "Type:", typeof this.score);

  this.scoreService.saveScore(Number(this.score)).subscribe({
    next: (response) => {
      console.log("Score submitted successfully:", response);
      Swal.fire({
        title: 'Quiz Completed!',
        text: `Your Score: ${this.score}`,
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        this.router.navigate(['/user-page']);
      });
    },
    error: (error) => {
      console.error("Error submitting score:", error);
      Swal.fire('Submission Failed', 'There was an error submitting your score. Please try again.', 'error');
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
        //  Call the logout function from AuthService
        this.authService.logoutUser();
        
        //  Display success message (it will auto-close when page refreshes)
        Swal.fire('Logged Out!', 'You have been successfully logged out.', 'success');
      }
    });
  }
  
  
}
