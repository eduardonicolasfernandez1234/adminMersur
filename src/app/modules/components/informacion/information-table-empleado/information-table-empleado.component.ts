import { Component, Input, OnInit } from '@angular/core';
import { Empleado } from 'src/app/shared/models/Usuario/Empleado/Empleado';
import { ContactoUsuario, Usuario } from '../../../../shared/models/Usuario/Usuario';
import { UsuarioService } from '../../../../core/services/usuario/usuario.service';
import { EmpleadoInfo } from '../../../../shared/models/Usuario/Empleado/Empleado';
@Component({
  selector: 'information-table-empleado',
  templateUrl: './information-table-empleado.component.html',
  styleUrls: ['./information-table-empleado.component.scss']
})
export class InformationTableEmpleadoComponent implements OnInit {

  @Input('Empleado') empleado: EmpleadoInfo;
  usuario: Usuario = null;
  lista_contacto_usuario: Array<ContactoUsuario> = [];

  constructor(
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
  }

  seleccionar($event: number){
    switch($event){
      case TIPO_DATA.EMPLEADO:
        break;
      case TIPO_DATA.USUARIO:
        this.obtenerUsuario();
        break;
      case TIPO_DATA.CONTACTO:
        this.obtenerContacto();
        break;
    }
  }

  obtenerUsuario(){
    this.usuarioService.obtenerUsuarioId(this.empleado.id).subscribe((res: any) => {
      this.usuario = res;
    }, error => {})
  }

  obtenerContacto(){
    this.usuarioService.obtenerContactosUsuario(this.empleado.id).subscribe((res: any) => {
      this.lista_contacto_usuario = res;
    }, error => {})
  }

}

export enum TIPO_DATA{
  EMPLEADO = 0,
  USUARIO = 1,
  CONTACTO = 2
}