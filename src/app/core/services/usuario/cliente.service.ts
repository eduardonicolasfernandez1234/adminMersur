import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RegistroCliente } from '../../../shared/models/Usuario/Cliente/RegistroCliente';
import { RegistroClientePlataforma, RegistroClienteContacto } from '../../../shared/models/Usuario/Cliente/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private http: HttpClient,
  ) { }

  listaCliente(){
    const url = `${environment.BaseUrl}auth/clientes/`;
    return this.http.get(url);
  }

  listaClienteIdNombre(){
    const url = `${environment.BaseUrl}auth/clientes/listas/`;
    return this.http.get(url);
  }

  listaClientebypage(page, size){
    const url = `${environment.BaseUrl}auth/clientes/?page=${page}&size=${size}`;
    return this.http.get(url);
  }

  listaClienteNotificacionbypage(page){
    const url = `${environment.BaseUrl}auth/clientes/notificacion/?page=${page}`;
    return this.http.get(url);
  }

  clienteInfo(id: number){
    const url = `${environment.BaseUrl}auth/clientes/${id}/info/`;
    return this.http.get(url);
  }

  registroCliente(cliente: RegistroCliente){
    const url = `${environment.BaseUrl}auth/clientes/`;
    return this.http.post(url, cliente);
  }

  eliminarCliente(id: number){
    const url = `${environment.BaseUrl}auth/clientes/${id}/`;
    return this.http.delete(url);
  }

  actualizarCliente(cliente: RegistroCliente, id: number){
    const url = `${environment.BaseUrl}auth/clientes/${id}/`;
    return this.http.patch(url, cliente);
  }

  registroContactoCliente(contacto: RegistroClienteContacto){
    const url = `${environment.BaseUrl}atributos/contacto-clientes/`;
    return this.http.post(url, contacto);
  }

  actualizarContactoCliente(contacto: RegistroClienteContacto, id: number){
    const url = `${environment.BaseUrl}atributos/contacto-clientes/${id}/`;
    return this.http.patch(url, contacto);
  }

  eliminarContactoCliente(id: number){
    const url = `${environment.BaseUrl}atributos/contacto-clientes/${id}/`;
    return this.http.delete(url);
  }

  registroPlataformaCliente(plataforma: RegistroClientePlataforma){
    const url = `${environment.BaseUrl}atributos/plataformas-clientes/`;
    return this.http.post(url, plataforma);
  }

  actualizarPlataformaCliente(plataforma: RegistroClientePlataforma, id: number){
    const url = `${environment.BaseUrl}atributos/plataformas-clientes/${id}/`;
    return this.http.patch(url, plataforma);
  }

  eliminarPlataformaCliente(id: number){
    const url = `${environment.BaseUrl}atributos/plataformas-clientes/${id}/`;
    return this.http.delete(url);
  }

  listaContactosCliente(id: number){
    const url = `${environment.BaseUrl}auth/clientes/${id}/contactos/`;
    return this.http.get(url);
  }

  listaPlataformaCliente(id: number){
    const url = `${environment.BaseUrl}auth/clientes/${id}/plataformas/`;
    return this.http.get(url);
  }

  listaComisionCliente(id: number){
    const url = `${environment.BaseUrl}auth/clientes/${id}/comisiones/`;
    return this.http.get(url);
  }

  buscadorClienteByPage(busqueda: any, page: number){
    const url = `${environment.BaseUrl}auth/clientes/busqueda/?page=${page}`;
    return this.http.post(url, busqueda);
  }
}
