import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/service/authservice.service';
import { ScoreserviceService } from 'src/app/service/scoreservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css']
})
export class StudentlistComponent implements OnInit {
  students: any[] = [];
  currentUser: any = null;

  constructor(private authservice: AuthserviceService, private scoreservice: ScoreserviceService) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents() {
    this.authservice.getUsers({}).subscribe({
      next: (response: any) => {
        this.students = response.data.map((student: any) => ({
          ...student,
          highestScore: student.highestScore || "No Score Yet",
          testTaken: false
        }));

      
      },
      error: (err) => {
        console.error("Error fetching students:", err);
      }
    });
  }
  
 
  deleteStudent(userId: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will remove the user and allow them to retake the test!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authservice.deleteUser(userId).subscribe({
          next: () => {
            this.students = this.students.filter(student => student._id !== userId);
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
          },
          error: (err: any) => {
            console.error("Error deleting user:", err);
            Swal.fire('Error!', 'Failed to delete user.', 'error');
          }
        });
      }
    });
  }
}
