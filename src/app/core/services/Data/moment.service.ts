import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MomentService {

  constructor() { }

  obtenerFormatoFechaHora(date: string) {
    if (!date) {
      return '';
    }
    // date = date.substring(0, 10) + ' ' + date.substring(11, 16)
    return moment.utc(date, 'YYYY-MM-DD').add(1, 'day').local().format('DD/MM/YYYY HH:MM');
  }

  obtenerFormatoFecha(date: string) {
    if (!date) {
      return '';
    }
    date = date.substring(0, 10) + ' ' + date.substring(11, 16)
    return moment.utc(date, 'YYYY-MM-DD').add(1, 'day').local().format('DD/MM/YYYY');
  }
}
