import { Component,Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PushNotificationService } from 'src/app/core/services/Data/Notifications/push-notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() use_User: boolean = true;
  user;

  constructor(
    private router: Router,
    private auth: AuthService,
    public notificacion: PushNotificationService
  ) { }

  ngOnInit(): void {
    console.log(this.use_User)
    if(this.use_User == true){
      this.user =this.auth.getUser();
      console.log(this.user);
      this.cargarListaNotificaciones();
    }
  }

  desconectar(){
    this.auth.logout();
    this.router.navigate(['']);
  }

  cargarListaNotificaciones(){
    
  }


  actualizarVisto(noti: any){
  }

}
