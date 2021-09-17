import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { OpcionesRutasService } from 'src/app/core/services/Data/opciones-rutas.service';
import { slider } from 'src/app/shared/animations/route-animations';
import { IconOption } from 'src/app/shared/models/Sidebar-Options/Icons';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  animations: [ // <-- add your animations here
    // fader,
    slider,
    // transformer,
  ]
})
export class PrincipalComponent implements OnInit {
  @ViewChild('drawer', { static: true }) public drawer!: MatDrawer;
  sideBarOpen = true;

  showFiller = true;

  iconos: IconOption[];

  constructor(public optionService: OpcionesRutasService) { }

  ngOnInit(): void {
  }

  showSideNav(): void {
    this.showFiller = !this.showFiller;
    this.drawer.toggle();
  }

  cambio(icono: IconOption){
    this.iconos = this.optionService.getIconos();
    if(!this.showFiller){
      this.showFiller = !this.showFiller;
      this.drawer.toggle();
    }


    this.iconos.forEach(element => {
      if(element == icono){
        element.selected = true;
      }else{
        element.selected = false;
      }
    });

    this.optionService.cambio(icono.name);
    console.log(icono);
  }

  sideBarToggler(event: any) {
    this.sideBarOpen = !this.sideBarOpen;
  }

  prepareRoute(outlet: RouterOutlet){
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
  }

}
