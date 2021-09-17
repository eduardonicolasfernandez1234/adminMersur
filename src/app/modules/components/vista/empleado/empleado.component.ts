import { Component, OnInit, Input } from '@angular/core';
import { Empleado, EmpleadoInfo } from '../../../../shared/models/Usuario/Empleado/Empleado';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { EditEmpleadoComponent } from '../../modal-edits/edit-empleado/edit-empleado.component';
import { MomentService } from '../../../../core/services/Data/moment.service';
import { EmpleadoService } from '../../../../core/services/usuario/empleado.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.scss']
})
export class EmpleadoComponent implements OnInit {

  @Input('Empleado') empleado: EmpleadoInfo;

  constructor(
    private dialog: MatDialog,
    public momentService: MomentService,
    private empleadoService: EmpleadoService
  ) { }

  ngOnInit(): void {
  }

  actualizar() {
    const dialog_config = new MatDialogConfig();
    dialog_config.disableClose = false;
    dialog_config.autoFocus = true;
    dialog_config.width = '60%';
    dialog_config.height = '80%';
    dialog_config.data = {res: this.empleado, replica: false};
    let dialogo = this.dialog.open(EditEmpleadoComponent, dialog_config);
    dialogo.afterClosed().subscribe((result) => {
        if (result) {
          this.empleadoService.empleadoInfo(this.empleado.id).subscribe((res: any) => {
            this.empleado = res;
          }, error => {})
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
