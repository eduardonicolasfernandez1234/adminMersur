import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClientePlataforma } from 'src/app/shared/models/Usuario/Cliente/Cliente';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { EditClientePlataformaComponent } from '../../modal-edits/edit-cliente-plataforma/edit-cliente-plataforma.component';
import { SwallAlertService } from '../../../../core/services/Data/swall-alert.service';
import { ClienteService } from '../../../../core/services/usuario/cliente.service';
import { MomentService } from '../../../../core/services/Data/moment.service';

@Component({
  selector: 'app-cliente-plataforma',
  templateUrl: './cliente-plataforma.component.html',
  styleUrls: ['./cliente-plataforma.component.scss']
})
export class ClientePlataformaComponent implements OnInit {

  @Input('Plataforma') plataforma: ClientePlataforma;
  @Input('Edicion') edicion: boolean;
  @Output() estado = new EventEmitter<{eliminar: boolean, item: ClientePlataforma}>();

  constructor(
    private clienteService: ClienteService,
    private swall: SwallAlertService,
    private dialog: MatDialog,
    public momentService: MomentService
  ) { }

  ngOnInit(): void {
  }

  actualizar(){
    const dialog_config = new MatDialogConfig();
    dialog_config.disableClose = false;
    dialog_config.autoFocus = true;
    dialog_config.width = '60%';
    dialog_config.height = '80%';
    dialog_config.data = {res: this.plataforma, nuevo: false, cliente_id: this.plataforma.cliente_id};
    let dialogo = this.dialog.open(EditClientePlataformaComponent, dialog_config);
    dialogo.afterClosed().subscribe((result) => {
        if (result) {
          this.plataforma = result;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  eliminar(){
    this.clienteService.eliminarPlataformaCliente(this.plataforma.id).subscribe((res: any) => {
      this.estado.emit({eliminar: true, item: this.plataforma});
      this.swall.success('¡Eliminado!', 'Se elimino el registro.');
    }, error => {
      this.swall.Error('¡Hubo un Error!', 'Tuvimos un problema al registrar...');
    })
  }

}
