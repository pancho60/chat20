import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { rejects } from 'assert';
import { resolve } from 'dns';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
  nombre: string = '';

  constructor(private afauth: AngularFireAuth,
  private db: AngularFirestore, private router:Router) { }

  login(email: string, password: string) {
    return new Promise((resolve, rejected) => {
      this.afauth.signInWithEmailAndPassword(
        email, password).then(
          (res :any) => {
            const uid = res.user.uid;
            this.db.collection('users').doc(uid).valueChanges().subscribe(r => {
              this.user = r;
              this.nombre = this.user.name
              localStorage.setItem('usuario',
                JSON.stringify(this.nombre));
            });
           
            resolve(res);
          
          }).catch((err: any) => rejected(err));
      });
      
  }
  
  logout() {
    this.afauth.signOut().then(() => {
      this.nombre = '';
      this.user = 'null';
      localStorage.setItem('usuario',
        JSON.stringify(''));
      this.router.navigate(['/login']);
    });
  }

  registrar(name: string, email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afauth.createUserWithEmailAndPassword(
        email, password).then((res: any) => {
        const uid = res.user.uid;
        this.db.collection('users').doc(res.user.uid).set
          ({
            name,
            uid
          }).then(r => {
              this.user = r;
              this.nombre = this.user.name;
              localStorage.setItem('usuario',
                JSON.stringify(this.nombre));
            });
        resolve(res);
      }).catch((err: any) => reject(err));
    });
  }          
        
      
    }
    
  

