import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClienteContacto, CONTACTOLOGISTICA } from '../../../../shared/models/Usuario/Cliente/Cliente';
import { ClienteService } from '../../../../core/services/usuario/cliente.service';
import { SwallAlertService } from '../../../../core/services/Data/swall-alert.service';
import { EditClienteContactoComponent } from '../../modal-edits/edit-cliente-contacto/edit-cliente-contacto.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MomentService } from '../../../../core/services/Data/moment.service';

@Component({
  selector: 'app-cliente-contacto',
  templateUrl: './cliente-contacto.component.html',
  styleUrls: ['./cliente-contacto.component.scss']
})
export class ClienteContactoComponent implements OnInit {

  @Input('Contacto') contacto: ClienteContacto;
  @Input('Edicion') edicion: boolean;
  @Output() estado = new EventEmitter<{eliminar: boolean, item: ClienteContacto}>();

  constructor(
    private clienteService: ClienteService,
    private swall: SwallAlertService,
    private dialog: MatDialog,
    public momentService: MomentService
  ) { }

  ngOnInit(): void {
  }

  eliminar(){
    this.clienteService.eliminarContactoCliente(this.contacto.id).subscribe((res: any) => {
      this.swall.success('¡Eliminado!', 'Se elimino el registro.');
      this.estado.emit({eliminar: true, item: this.contacto});
    }, error => {
      this.swall.Error('¡Hubo un Error!', 'Tuvimos un problema al registrar...');
    })
  }

  actualizar(){
    const dialog_config = new MatDialogConfig();
    dialog_config.disableClose = false;
    dialog_config.autoFocus = true;
    dialog_config.width = '60%';
    dialog_config.height = '80%';
    dialog_config.data = {res: this.contacto, nuevo: false, cliente_id: this.contacto.cliente_id};
    let dialogo = this.dialog.open(EditClienteContactoComponent, dialog_config);
    dialogo.afterClosed().subscribe((result) => {
        if (result) {
          this.contacto = result;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  obtenerTipoContacto(tipo: number){
    return CONTACTOLOGISTICA[tipo];
  }

}
