import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionserviceService } from 'src/app/service/questionservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  questionForm!: FormGroup;

  constructor(private router: Router, private quizService: QuestionserviceService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.questionForm = this.fb.group({
      questionText: ['', [Validators.required, Validators.minLength(5)]],
      options: this.fb.array([this.fb.control(''), this.fb.control('')], Validators.required), // Ensure at least two options
      correctAnswer: ['', Validators.required]
    });
  }

  get options() {
    return (this.questionForm.get('options') as FormArray).controls;
  }

  addOption() {
    (this.questionForm.get('options') as FormArray).push(this.fb.control(''));
  }

  removeOption(index: number) {
    (this.questionForm.get('options') as FormArray).removeAt(index);
  }

  onSubmit() {
    if (this.questionForm.valid) {
      const formData = this.questionForm.value;
      const questionData = {
        question: formData.questionText, // Ensure this matches your backend's expected field
        options: formData.options,
        answer: formData.correctAnswer
      };

      console.log("Submitting question:", questionData); // Debugging log

      this.quizService.createQuestion(questionData).subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Success!',
            text: 'The question has been created successfully!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.router.navigate(['/admin/questions']);
        },
        error: (err) => {
          console.error("Error response:", err);
          Swal.fire({
            title: 'Error!',
            text: 'There was an error creating the question. Please try again.',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      });
    }
  }
}
