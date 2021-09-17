import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RegistroProveedor } from '../../../shared/models/Usuario/Proveedor/RegistroProveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(
    private http: HttpClient,
  ) { }

  listaProveedor(){
    const url = `${environment.BaseUrl}auth/proveedores/`;
    return this.http.get(url);
  }

  listaProveedorbyPage(page, size){
    const url = `${environment.BaseUrl}auth/proveedores/?page=${page}&size=${size}`;
    return this.http.get(url);
  }


  listaProveedorIdNombre(){
    const url = `${environment.BaseUrl}auth/proveedores/listas/`;
    return this.http.get(url);
  }

  proveedorInfo(id){
    const url = `${environment.BaseUrl}auth/proveedores/${id}/info/`;
    return this.http.get(url);
  }

  registroProveedor(proveedor: RegistroProveedor){
    const url = `${environment.BaseUrl}auth/proveedores/`;
    return this.http.post(url, proveedor);
  }

  actualizarProveedor(proveedor: RegistroProveedor, id){
    const url = `${environment.BaseUrl}auth/proveedores/${id}/`;
    return this.http.patch(url, proveedor);
  }

  eliminarProveedor(id){
    const url = `${environment.BaseUrl}auth/proveedores/${id}/`;
    return this.http.delete(url);
  }
}
