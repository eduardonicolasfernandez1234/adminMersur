import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-lista-incidencia',
  templateUrl: './lista-incidencia.component.html',
  styleUrls: ['./lista-incidencia.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListaIncidenciaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
