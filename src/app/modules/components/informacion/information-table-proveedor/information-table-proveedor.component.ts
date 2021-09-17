import { Component, Input, OnInit } from '@angular/core';
import { Usuario, ContactoUsuario } from '../../../../shared/models/Usuario/Usuario';
import { DocumentoUsuario } from '../../../../shared/models/Usuario/DocumentoUsuario';
import { UsuarioService } from '../../../../core/services/usuario/usuario.service';
import { ProveedorInfo } from '../../../../shared/models/Usuario/Proveedor/Proveedor';

@Component({
  selector: 'information-table-proveedor',
  templateUrl: './information-table-proveedor.component.html',
  styleUrls: ['./information-table-proveedor.component.scss']
})
export class InformationTableProveedorComponent implements OnInit {

  @Input('Proveedor') proveedor: ProveedorInfo;
  usuario: Usuario = null;
  lista_documento_usuario: Array<DocumentoUsuario> = [];
  lista_proveedor_contacto: Array<ContactoUsuario> = [];

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
  }

  seleccionar($event: number){
    switch($event){
      case TIPO_DATA.PROVEEDOR:
        break;
      case TIPO_DATA.USUARIO:
        this.obtenerUsuario();
        break;
      case TIPO_DATA.CONTACTO:
        this.obtenerContacto();
        break;
      case TIPO_DATA.DOCUMENTO:
        this.obtenerDocumento();
        break;
    }
  }

  obtenerUsuario(){
    this.usuarioService.obtenerUsuarioId(this.proveedor.id).subscribe((res: any) => {
      this.usuario = res;
    }, error => {})
  }

  obtenerContacto(){
    this.usuarioService.obtenerContactosUsuario(this.proveedor.id).subscribe((res: any) => {
      this.lista_proveedor_contacto = res;
    }, error => {})
  }

  obtenerDocumento(){
    this.usuarioService.obtenerDocumentosUsuario(this.proveedor.id).subscribe((res: any) => {
      this.lista_documento_usuario = res;
    }, error => {})
  }

}

export enum TIPO_DATA{
  PROVEEDOR = 0,
  USUARIO = 1,
  CONTACTO = 2,
  DOCUMENTO = 3
}