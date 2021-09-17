import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  lista_cliente: Array<{id: number, razon_social: string, identificacion_tributaria: string}> = [];
  lista_empleado: Array<{id: number, nombre_completo: string}> = [];
  lista_proveedor: Array<{id: number, razon_social: string}> = [];

  CLIENTE: string = 'lista_cliente';
  EMPLEADO: string = 'lista_empleado';
  PROVEEDOR: string = 'lista_proveedor';

  constructor(
    private http: HttpClient,
  ) { 
    this.lista_cliente = this.obtenerListaCliente();
    this.lista_empleado = this.obtenerListaEmpleado();
    this.lista_proveedor = this.obtenerListaProveedor();
  }

  actualizarEstadoNotificacionFCM(estado: boolean, id: number){
    let aux = {
      envio_fcm: estado
    }
    const url = `${environment.BaseUrl}auth/usuarios/${id}/`;
    return this.http.patch(url, aux);
  }

  actualizarEstadoNotificacionEmail(estado: boolean, id: number){
    let aux = {
      envio_email: estado
    }
    const url = `${environment.BaseUrl}auth/usuarios/${id}/`;
    return this.http.patch(url, aux);
  }

  obtenerUsuarioId(id: number){
    const url = `${environment.BaseUrl}auth/usuarios/${id}/`;
    return this.http.get(url);
  }

  obtenerContactosUsuario(id: number){
    const url = `${environment.BaseUrl}auth/usuarios/${id}/contactos/`;
    return this.http.get(url);
  }

  obtenerDocumentosUsuario(id: number){
    const url = `${environment.BaseUrl}auth/usuarios/${id}/documentos/`;
    return this.http.get(url);
  }

  cargarListaCliente(lista: Array<{id: number, razon_social: string, identificacion_tributaria: string}>){
    this.lista_cliente = lista;
    localStorage.setItem(this.CLIENTE, JSON.stringify(this.lista_cliente));
  }

  cargarListaEmpleado(lista: Array<{id: number, nombre_completo: string}>){
    this.lista_empleado = lista;
    localStorage.setItem(this.EMPLEADO, JSON.stringify(this.lista_empleado));
  }

  cargarListaProveedor(lista: Array<{id: number, razon_social: string}>){
    this.lista_proveedor = lista;
    localStorage.setItem(this.PROVEEDOR, JSON.stringify(this.lista_proveedor));
  }

  obtenerListaCliente(){
    return JSON.parse(localStorage.getItem(this.CLIENTE));
  }

  obtenerListaEmpleado(){
    return JSON.parse(localStorage.getItem(this.EMPLEADO));
  }

  obtenerListaProveedor(){
    return JSON.parse(localStorage.getItem(this.PROVEEDOR));
  }
}
