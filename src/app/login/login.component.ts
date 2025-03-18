import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../service/authservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showPassword: boolean = false; // Controls password visibility
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthserviceService){
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Toggle Password Visibility
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {}

  onLogin() {
    if (this.loginForm.valid) {
      Swal.fire({
        title: 'Logging in...',
        didOpen: () => {
          Swal.showLoading();
        },
        allowOutsideClick: false
      });

      this.authService.loginUser(this.loginForm.value).subscribe(
        (response: any) => {
          console.log('Login Response:', response);  
          
          const token = response.token || response.data?.token || response.result?.token;
          const username = this.loginForm.value.username; //  Get username

          if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('username', username); // Store username
            
            Swal.close();

            if (username === 'admin') {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/user/user-page']);
            }
          } else {
            Swal.fire('Error', 'Token not received from server.', 'error');
          }
        },
        (error) => {
          Swal.close();
          Swal.fire('Error', 'Login failed. Please check your credentials.', 'error');
        }
      );
    }
  }
}
