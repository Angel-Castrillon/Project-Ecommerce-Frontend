import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  
  errorMessage = signal<string | null>(null);

  //Form Definition
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    rememberMe: [false]
  });

  //Actions
  onSubmit() {
    console.log('Botón Iniciar Sesión presionado');
    if (this.loginForm.valid) {
      console.log('Formulario válido, enviando datos...', this.loginForm.value);
      this.errorMessage.set(null);
      const { email, password } = this.loginForm.value;
      
      this.authService.login({ email, password }).subscribe({
        next: (response) => {
            console.log('Login exitoso', response);
            this.router.navigate(['/products']);
        },
        error: (error) => {
            console.error('Error en login', error);
            this.errorMessage.set('Error de conexión o credenciales inválidas');
        }
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
