import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/messaging';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  notVistas: number = 0;
  messagingfirebase: firebase.messaging.Messaging;

  constructor(private http: HttpClient) {
    firebase.initializeApp(environment.configFirebase);
    this.messagingfirebase = firebase.messaging();
  }

  requestPermission=()=>{
    return new Promise<string>( async (resolve, reject) => {
      const permiso = await Notification.requestPermission();
      if(permiso==="granted"){
        const tokenFirebase = await this.messagingfirebase.getToken();
        resolve(tokenFirebase);
      }else{
        reject(new Error("No se otorgaron los permisos."));
      }
    })
  }

  private messagingObservable = new Observable( observe => {
    this.messagingfirebase.onMessage(payload => {
      observe.next(payload);
    })
  })

  receiveMessage(){
    return this.messagingObservable;
  }


  guardarTokenFCM(token: string){
    let body = {
      'token': token
    }
    const url = `${environment.BaseUrl}notificaciones/guardar-token/`
    return this.http.post(url, body);
  }

  ListaNotificaciones(){
    const url = `${environment.BaseUrl}notificaciones/notificaciones/`;
    return this.http.get(url);
  }

  NotificacionesRecientes(id){
    const url = `${environment.BaseUrl}notificaciones/notificaciones/${id}/notificacion-recientes/`;
    return this.http.get(url);
  }

  actualizarNotificacion(id, notification: any){
    const url = `${environment.BaseUrl}notificaciones/notificaciones/${id}/`;
    return this.http.put(url, notification);
  }

  actualizarNotVistas(cant: number){
    this.notVistas = cant;
  }

  obtenerCantidadNot(){
    return this.notVistas;
  }

}
