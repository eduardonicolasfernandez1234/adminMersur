import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RegistroEmpleado } from 'src/app/shared/models/Usuario/Empleado/RegistroEmpleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(
    private http: HttpClient,
  ) { }

  listaEmpleado(){
    const url = `${environment.BaseUrl}auth/empleados/`;
    return this.http.get(url);
  }

  listaEmpleadoByPage(page, size){
    const url = `${environment.BaseUrl}auth/empleados/notificacion/?page=${page}&size=${size}`;
    return this.http.get(url);
  }

  listaEmpleadoIdNombre(){
    const url = `${environment.BaseUrl}auth/empleados/listas/`;
    return this.http.get(url);
  }

  empleadoInfo(id){
    const url = `${environment.BaseUrl}auth/empleados/${id}/info/`;
    return this.http.get(url);
  }

  registroEmpleado(cliente: RegistroEmpleado){
    const url = `${environment.BaseUrl}auth/empleados/`;
    return this.http.post(url, cliente);
  }

  actualizarEmpleado(cliente: RegistroEmpleado, id){
    const url = `${environment.BaseUrl}auth/empleados/${id}/`;
    return this.http.patch(url, cliente);
  }

  eliminarEmpleado(id){
    const url = `${environment.BaseUrl}auth/empleados/${id}/`;
    return this.http.delete(url);
  }

}
