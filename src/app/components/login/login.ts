import { Component } from '@angular/core';
import { User } from '../../models/user';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  model: any = {};
  msg = '';

  constructor(private auth: Auth, private router: Router){};

  Login(){
    this.auth.login(this.model).subscribe({
      next: (res:any) =>{
        this.auth.saveUser(res);
        this.router.navigate(['/activities']);
      },
      error: (err) => {
        this.msg = 'Giriş yaparken hata oluştu: '+(err.error || err.statusText);
      }
    });
  }

}
