import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  model: any = {};
  msg = '';

  constructor(private auth: Auth, private router: Router){};

  Register(){
    this.auth.register(this.model).subscribe({
      next: (res: any) => {
        this.msg = "Kayıt başarılı. Giriş sayfasına yönlendiriliyor.";
        setTimeout(() => this.router.navigate(['/login']),800);
      },
      error: (err) => this.msg = "Hata: "+ (err.error ||err.statusText)
    });
  }

}
