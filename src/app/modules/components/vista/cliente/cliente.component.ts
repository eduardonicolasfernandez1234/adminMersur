import { Component, OnInit, Input } from '@angular/core';
import { ClienteInfo } from '../../../../shared/models/Usuario/Cliente/Cliente';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { EditClienteComponent } from '../../modal-edits/edit-cliente/edit-cliente.component';
import { MomentService } from '../../../../core/services/Data/moment.service';
import { ClienteService } from '../../../../core/services/usuario/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  @Input('Cliente') cliente: ClienteInfo;

  constructor(
    private dialog: MatDialog,
    public momentService: MomentService,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
  }

  actualizar() {
    const dialog_config = new MatDialogConfig();
    dialog_config.disableClose = false;
    dialog_config.autoFocus = true;
    dialog_config.width = '60%';
    dialog_config.height = '80%';
    dialog_config.data = { res: this.cliente, replica: false };
    let dialogo = this.dialog.open(EditClienteComponent, dialog_config);
    dialogo.afterClosed().subscribe((result) => {
        if (result) {
          this.clienteService.clienteInfo(this.cliente.id).subscribe((res: any) => {
            this.cliente = res;
          }, error => {})
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
