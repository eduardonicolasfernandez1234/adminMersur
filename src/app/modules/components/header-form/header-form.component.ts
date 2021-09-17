import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
registerLocaleData(localeEsAr);

@Component({
  selector: 'app-header-form',
  templateUrl: './header-form.component.html',
  styleUrls: ['./header-form.component.scss']
})
export class HeaderFormComponent implements OnInit {

  @Input() titulo: string = 'Sin Nombre';

  day: string = formatDate(new Date(), 'dd', 'es-Ar');
  month: string= formatDate(new Date(), 'MMMM', 'es-Ar');
  year: string= formatDate(new Date(), 'yyyy', 'es-Ar');

  constructor() { }

  ngOnInit(): void {
  }

}
