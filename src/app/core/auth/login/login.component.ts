import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/shared/models/Usuario/auth/login';
import { AuthService } from '../../services/auth/auth.service';
import { PushNotificationService } from '../../services/Data/Notifications/push-notification.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;

  registro: FormGroup;

  matcher = new MyErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private notification: PushNotificationService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.registro = this.fb.group({
      email: ['', Validators.required],
      pass: ['', Validators.required],
    });
  }

  goInicio(){
    let userObj: Login = {
      password: this.registro.get('pass').value,
      username: this.registro.get('email').value
    }
    this.auth.login(userObj).subscribe((res) => {
      if(res){
        /*this.notification.requestPermission().then(token => {
            console.log(token);
            // Enviar token hacia django para guardarlo
            this.guardarToken(token)
          });*/
        localStorage.setItem('user', 'true');
        this.route.navigate(['principal']);
      }
    })
    
    // this.auth.loginParche(userObj).subscribe(
    //   (res) => {
    //     if(res){
    //       this.notification.requestPermission().then(token => {
    //         console.log(token);
    //         // Enviar token hacia django para guardarlo
    //         this.guardarToken(token)
    //       });
    //       localStorage.setItem('user_id', res['id']);
    //       localStorage.setItem('user', 'true');
    //       this.route.navigate(['principal']);
    //     }
    //   }, err => {
    //     console.log(err);
    //   }
    // )
  }

  guardarToken(token: string){
    this.notification.guardarTokenFCM(token).subscribe((res:any) => {
      console.log(res);
      console.log('Se guardó el token');
    }, err => {
      console.log(err);
      console.log('Hubo un error');
    })
  }

}
