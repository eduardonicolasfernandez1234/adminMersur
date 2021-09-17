import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  constructor(
    private http: HttpClient,
  ) { }

  listaPaises(){
    const url = `${environment.BaseUrl}atributos/paises/`;
    return this.http.get(url);
  }

  listaCiudades(){
    const url = `${environment.BaseUrl}atributos/ciudades/`;
    return this.http.get(url);
  }

  listaCiudadesPais(id){
    const url = `${environment.BaseUrl}atributos/ciudades/${id}/paises/`;
    return this.http.get(url);
  }
}
