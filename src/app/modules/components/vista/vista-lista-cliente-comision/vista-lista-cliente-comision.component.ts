import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ClienteService } from 'src/app/core/services/usuario/cliente.service';
import { ComisionCliente } from 'src/app/shared/models/Tramite/ComisionCliente';
import { EditClienteComisionComponent } from '../../modal-edits/edit-cliente-comision/edit-cliente-comision.component';

@Component({
  selector: 'app-vista-lista-cliente-comision',
  templateUrl: './vista-lista-cliente-comision.component.html',
  styleUrls: ['./vista-lista-cliente-comision.component.scss']
})
export class VistaListaClienteComisionComponent implements OnInit {

  @Input('ComisionCliente') lista_comision_cliente: ComisionCliente[];
  @Input('ClienteId') clienteId: number;
  NO_DATA = 'No se encuentran datos';

  edicion: boolean = false;

  constructor(
    private dialog: MatDialog,
    private clienteService: ClienteService,
  ) { }

  ngOnInit(): void {
    console.log(this.lista_comision_cliente);
  }

  obtenerListaComision(){
    this.lista_comision_cliente = [];
    this.clienteService.listaComisionCliente(this.clienteId).subscribe((res:any) => {
      this.lista_comision_cliente = res;
      console.log(res);
    }, error => {console.log(error)})
  }

  registrar(){
    const dialog_config = new MatDialogConfig();
    dialog_config.disableClose = false;
    dialog_config.autoFocus = true;
    dialog_config.width = '60%';
    dialog_config.height = '80%';
    dialog_config.data = {res: null, nuevo: true, cliente_id: this.clienteId};
    let dialogo = this.dialog.open(EditClienteComisionComponent, dialog_config);
    dialogo.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.lista_comision_cliente = [];
          this.obtenerListaComision();
        }
      },(error) => {}
    );
  }

  verificar(event: {eliminar: boolean, item: ComisionCliente}){
    if(event.eliminar){
      let pos = this.lista_comision_cliente.indexOf(event.item);
      if(pos !== -1){
        this.lista_comision_cliente.splice(pos, 1);
      }
    }
  }

}
