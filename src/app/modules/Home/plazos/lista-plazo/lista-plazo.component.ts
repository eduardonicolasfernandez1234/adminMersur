import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-lista-plazo',
  templateUrl: './lista-plazo.component.html',
  styleUrls: ['./lista-plazo.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListaPlazoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
