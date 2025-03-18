import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../service/authservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  showPassword: boolean = false; // Controls password visibility
  showConfirmPassword: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthserviceService) {}

  ngOnInit(): void {
    // Initialize Form inside ngOnInit
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],  // ✅ Add confirmPassword field
      terms: [false, Validators.requiredTrue]
    }, { validators: this.passwordMatchValidator }); // ✅ Correct placement of validator
  }

  // Custom Validator for Matching Passwords
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { passwordMismatch: true };
  }

  // Toggle Password Visibility
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  
  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onRegister() {
    if (this.registerForm.invalid) {
      return;
    }

    Swal.fire({
      title: 'Registering...',
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false
    });

    this.authService.registerUser(this.registerForm.value).subscribe(
      (response) => {
        Swal.close();
        Swal.fire('Success', 'User registered successfully!', 'success').then(() => {
          this.router.navigate(['/login']);
        });
      },
      (error) => {
        Swal.close();
        Swal.fire('Error', 'Registration failed. Please try again.', 'error');
      }
    );
  }
}
