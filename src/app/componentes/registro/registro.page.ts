import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {


  name: string='';
  password: string='';
  email: string='';
  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  registrar() {
    this.authService.registrar(this.name, this.email,
      this.password).then(
        
        () => {
          this.router.navigate(['/Home']);
        }
      );
    }
    
  

  regresar() {
    this.router.navigate(['/login']);
    
  }

  

  
}
