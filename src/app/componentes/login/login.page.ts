import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  email: string = '';
  password: string = '';
  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.email, this.password).then(
      res1 => {
        this.router.navigate(['/home']);
      }).catch(err => {
        alert('Los datos son inorectos o no existe el usuario');
      });

  }
    
  

  registro() {
    this.router.navigate(['/registro']);
  }
}


