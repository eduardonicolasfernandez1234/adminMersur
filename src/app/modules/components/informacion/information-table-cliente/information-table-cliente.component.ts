import { Component, Input, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../core/services/usuario/usuario.service';
import { ClienteService } from '../../../../core/services/usuario/cliente.service';
import { Usuario } from '../../../../shared/models/Usuario/Usuario';
import { DocumentoUsuario } from '../../../../shared/models/Usuario/DocumentoUsuario';
import { ClienteContacto, ClientePlataforma, ClienteInfo } from '../../../../shared/models/Usuario/Cliente/Cliente';

@Component({
  selector: 'information-table-cliente',
  templateUrl: './information-table-cliente.component.html',
  styleUrls: ['./information-table-cliente.component.scss']
})
export class InformationTableClienteComponent implements OnInit {

  @Input('Cliente') cliente: ClienteInfo;

  usuario: Usuario = null;
  lista_documento_usuario: Array<DocumentoUsuario> = [];
  lista_cliente_contacto: Array<ClienteContacto> = [];
  lista_cliente_plataforma: Array<ClientePlataforma> = [];

  constructor(
    private usuarioService: UsuarioService,
    private clienteService: ClienteService,
  ) { }

  ngOnInit(): void {
  }

  seleccionar($event: number){
    switch($event){
      case TIPO_DATA.CLIENTE:
        break;
      case TIPO_DATA.USUARIO:
        this.obtenerUsuario();
        break;
      case TIPO_DATA.CONTACTO:
        this.obtenerContacto();
        break;
      case TIPO_DATA.PLATAFORMA:
        this.obtenerPlataforma();
        break;
      case TIPO_DATA.DOCUMENTO:
        this.obtenerDocumento();
        break;
    }
  }

  obtenerUsuario(){
    this.usuarioService.obtenerUsuarioId(this.cliente.id).subscribe((res: any) => {
      this.usuario = res;
    }, error => {})
  }

  obtenerContacto(){
    this.clienteService.listaContactosCliente(this.cliente.id).subscribe((res: any) => {
      this.lista_cliente_contacto = res;
    }, error => {})
  }

  obtenerPlataforma(){
    this.clienteService.listaPlataformaCliente(this.cliente.id).subscribe((res: any) => {
      this.lista_cliente_plataforma = res;
    }, error => {})
  }

  obtenerDocumento(){
    this.usuarioService.obtenerDocumentosUsuario(this.cliente.id).subscribe((res: any) => {
      this.lista_documento_usuario = res;
    }, error => {})
  }

}

export enum TIPO_DATA{
  CLIENTE = 0,
  USUARIO = 1,
  CONTACTO = 2,
  PLATAFORMA = 3,
  DOCUMENTO = 4
}