import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ScoreserviceService {

  private apiUrl = `${environment.baseURL}/score`;// Adjust if needed

  constructor(private http: HttpClient) {}

  saveScore(score: number): Observable<any> {
    console.log("Submitting score:", score, "Type:", typeof score); // ✅ Debugging log
    return this.http.post<any>(this.apiUrl, { score });
  }

  getScores(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  
  checkTestStatus(): Observable<any> {
    return this.http.get(`${this.apiUrl}/test-status`);
  }

}
