import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/service/authservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent {
  isSidebarOpen = true;

  constructor(private authservice: AuthserviceService, private router: Router){}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logoutUser() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!'
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        this.authservice.logoutUser();  // Call the logout service
        this.router.navigate(['/login']);  // Redirect to the login page

        Swal.fire(
          'Logged Out!',
          'You have been successfully logged out.',
          'success'
        );
      }
    });
  }
}

