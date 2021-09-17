import { Component, Input, OnInit } from '@angular/core';
import { OpcionesRutasService } from 'src/app/core/services/Data/opciones-rutas.service';
import { Option } from '../../models/Sidebar-Options/Option';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  options: Option[];

  iconos: string[];

  showFiller = true;

  constructor(public optionService: OpcionesRutasService) {}

  ngOnInit(): void {
  }

  changeState(item: Option){
    this.options = this.optionService.getOpciones();

    this.options.forEach(element => {
      if(element == item){
        element.selected = true;
      }else{
        element.selected = false;
      }
    });
    this.optionService.setOpciones(this.options);
  }

}
