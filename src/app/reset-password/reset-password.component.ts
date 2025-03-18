import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../service/authservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  showPassword: boolean = false; // Controls password visibility
  resetPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthserviceService) {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

    // Toggle Password Visibility
    togglePassword() {
      this.showPassword = !this.showPassword;
    }

  onSubmit() {
    if (this.resetPasswordForm.invalid) return;

    this.authService.resetPassword(this.resetPasswordForm.value).subscribe({
      next: (res: { message: string | undefined; }) => {
        Swal.fire('Success', res.message, 'success');
      },
      error: (err: { error: { message: string | undefined; }; }) => {
        Swal.fire('Error', err.error.message, 'error');
      }
    });
  }
}
