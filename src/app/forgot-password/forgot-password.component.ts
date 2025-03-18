import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../service/authservice.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
 

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthserviceService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }


  onSubmit() {
    if (this.forgotPasswordForm.invalid) return;

    this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe({
      next: (res) => {
        Swal.fire('Success', res.message, 'success').then(() => {
          this.router.navigate(['/reset-password'])
        });
      },
      error: (err: { error: { message: string | undefined; }; }) => {
        Swal.fire('Error', err.error.message, 'error');
      }
    });
  }
}
