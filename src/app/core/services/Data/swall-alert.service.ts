import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwallAlertService {

  constructor() { }

  success(titulo: string, mensaje: string){
    Swal.fire(titulo, mensaje, 'success');
  }

  Error(titulo: string, mensaje: string){
    return Swal.fire(titulo, mensaje, 'error');
  }

  cargaFalsa(mensaje){
    return Swal.fire({
      position: 'center',
      title: mensaje,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    })
  }
}
