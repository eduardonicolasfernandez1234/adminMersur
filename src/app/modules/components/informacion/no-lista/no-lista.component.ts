import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-no-lista',
  templateUrl: './no-lista.component.html',
  styleUrls: ['./no-lista.component.scss']
})
export class NoListaComponent implements OnInit {

  @Input('titulo') titulo: string = 'No se encuentra ningún registro'

  constructor() { }

  ngOnInit(): void {
  }

}
