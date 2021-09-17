import { Component, OnInit, Input } from '@angular/core';
import { ProveedorInfo } from '../../../../shared/models/Usuario/Proveedor/Proveedor';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { EditProveedorComponent } from '../../modal-edits/edit-proveedor/edit-proveedor.component';
import { MomentService } from '../../../../core/services/Data/moment.service';
import { ProveedorService } from '../../../../core/services/usuario/proveedor.service';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.scss']
})
export class ProveedorComponent implements OnInit {

  @Input('Proveedor') proveedor: ProveedorInfo;

  constructor(
    private dialog: MatDialog,
    public momentService: MomentService,
    private proveedorService: ProveedorService
  ) { }

  ngOnInit(): void {
  }

  actualizar() {
    const dialog_config = new MatDialogConfig();
    dialog_config.disableClose = false;
    dialog_config.autoFocus = true;
    dialog_config.width = '60%';
    dialog_config.height = '80%';
    dialog_config.data = {res: this.proveedor, replica: false};
    let dialogo = this.dialog.open(EditProveedorComponent, dialog_config);
    dialogo.afterClosed().subscribe((result) => {
        if (result) {
          this.proveedorService.proveedorInfo(this.proveedor.id).subscribe((res: any) => {
            this.proveedor = res;
          }, error => {})
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
