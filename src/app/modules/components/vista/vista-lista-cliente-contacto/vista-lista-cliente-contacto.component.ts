import { Component, OnInit, Input } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ClienteContacto } from '../../../../shared/models/Usuario/Cliente/Cliente';
import { EditClienteContactoComponent } from '../../modal-edits/edit-cliente-contacto/edit-cliente-contacto.component';
import { ClienteService } from '../../../../core/services/usuario/cliente.service';

@Component({
  selector: 'app-vista-lista-cliente-contacto',
  templateUrl: './vista-lista-cliente-contacto.component.html',
  styleUrls: ['./vista-lista-cliente-contacto.component.scss']
})
export class VistaListaClienteContactoComponent implements OnInit {

  @Input('ClienteContacto') cliente_contactos: ClienteContacto[];
  @Input('ClienteId') clienteId: number;
  NO_DATA = 'No se encuentran datos';
  edicion: boolean = false;

  constructor(
    private dialog: MatDialog,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
  }

  obtenerListaContactos(){
    this.clienteService.listaContactosCliente(this.clienteId).subscribe((res:any) => {
      this.cliente_contactos = res;
      console.log(this.cliente_contactos);
    }, error => {})
  }

  registrar(){
    const dialog_config = new MatDialogConfig();
    dialog_config.disableClose = false;
    dialog_config.autoFocus = true;
    dialog_config.width = '60%';
    dialog_config.height = '80%';
    dialog_config.data = {res: null, nuevo: true, cliente_id: this.clienteId};
    let dialogo = this.dialog.open(EditClienteContactoComponent, dialog_config);
    dialogo.afterClosed().subscribe((result) => {
        if (result) {
          this.cliente_contactos = [];
          this.obtenerListaContactos();
        }
      },(error) => {}
    );
  }

  // verificar(event: {eliminar: boolean, item: ClienteContacto}){
  //   if(event.eliminar){
  //     let pos = this.cliente_contactos.indexOf(event.item);
  //     if(pos !== -1){
  //       this.cliente_contactos.splice(pos, 1);
  //     }
  //   }
  // }

}
