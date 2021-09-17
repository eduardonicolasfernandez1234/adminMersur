import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { RegistroContactoUsuario } from '../../../shared/models/Usuario/Usuario';

@Injectable({
  providedIn: 'root'
})
export class ContactoUsuarioService {

  constructor(
    private http: HttpClient,
  ) { }

  registroContactoUsuario(contacto: RegistroContactoUsuario){
    const url = `${environment.BaseUrl}atributos/contacto-usuarios/`;
    return this.http.post(url, contacto);
  }

  actualizarContactoUsuario(contacto: RegistroContactoUsuario, id){
    const url = `${environment.BaseUrl}atributos/contacto-usuarios/${id}/`;
    return this.http.patch(url, contacto);
  }

  eliminarContactoUsuario(id){
    const url = `${environment.BaseUrl}atributos/contacto-usuarios/${id}/`;
    return this.http.delete(url);
  }
}
