import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  //Form Definition
  registerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordMatchValidator });

  //Validators
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  //Actions
  onSubmit() {
    if (this.registerForm.valid) {
        const { name, email, password, confirmPassword } = this.registerForm.value;
        const userData = {
            name,
            email,
            password,
            password_confirmation: confirmPassword
        };

        this.authService.register(userData).subscribe({
            next: (response) => {
                console.log('Registro exitoso', response);
                this.router.navigate(['/login']);
            },
            error: (error) => {
                console.error('Error en registro', error);
            }
        });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
