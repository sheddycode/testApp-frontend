import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';


interface Question {
  id?: number;
  questionText: string;
  options: string[];
  correctAnswer: string;
}


@Injectable({
  providedIn: 'root'
})
export class QuestionserviceService {


  private apiUrl = `${environment.baseURL}/questions`;

  constructor(private http: HttpClient) { }


  private getAuthHeaders() {
    const token = localStorage.getItem('token');  // Get the stored token
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`, // Ensure the token is sent with requests
        'Content-Type': 'application/json'
      })
    };
  }

  // Create a new question (Updated with Authorization Header)
  createQuestion(question: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, question, this.getAuthHeaders());
  }

  // Delete a question (Updated with Authorization Header)
  deleteQuestion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }

  // Get all questions (Updated with Authorization Header)
  getQuestions(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl, this.getAuthHeaders()).pipe(
      map((response: { data: any; }) => response.data),
      catchError((error) => {
        // Check if the error is related to the user already taking the test
        if (error.status === 400 && error.error.message === 'You have already taken the test') {
          Swal.fire({
            icon: 'warning',
            title: 'You have already taken the test!',
            text: 'You cannot retake the test.',
            confirmButtonText: 'OK',
            showCancelButton: false
          });
        }
        return throwError(() => error);
      })
    );
  }

  // Get a specific question by ID (Updated with Authorization Header)
  getQuestionById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }

  updateQuestion(id: string, updatedQuestion: any): Observable<any> {
    console.log("Updating question with ID:", id); // Debugging
    return this.http.put(`${this.apiUrl}/${id}`, updatedQuestion, this.getAuthHeaders());
  }

  //updateQuestion(id: number, updatedQuestion: any): Observable<any> {
    //return this.http.put(`${this.apiUrl}/${id}`, updatedQuestion);
 // }


    // Create a new question
    //createQuestion(question: any): Observable<any> {
     // return this.http.post<any>(this.apiUrl, question);
    //}
 
      // Delete a question
  // deleteQuestion(id: number): Observable<any> {
  // return this.http.delete(`${this.apiUrl}/${id}`);
  //}
 
   // Get all questions
  // getQuestions(): Observable<any[]> {
   // return this.http.get<any>(this.apiUrl).pipe(
    //  map((response: { data: any; }) => response.data)
      
    //);
  //}
 
   // Get a specific question by ID
  // getQuestionById(id: number): Observable<any> {
  // return this.http.get(`${this.apiUrl}/${id}`);
  // }

}

 