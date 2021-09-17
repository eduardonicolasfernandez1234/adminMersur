import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ContactoUsuario, TIPOCONTACTOUSUARIO } from '../../../../shared/models/Usuario/Usuario';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { EditUsuarioContactoComponent } from '../../modal-edits/edit-usuario-contacto/edit-usuario-contacto.component';
import { ContactoUsuarioService } from '../../../../core/services/usuario/contacto-usuario.service';
import { SwallAlertService } from '../../../../core/services/Data/swall-alert.service';
import { MomentService } from '../../../../core/services/Data/moment.service';

@Component({
  selector: 'app-usuario-contacto',
  templateUrl: './usuario-contacto.component.html',
  styleUrls: ['./usuario-contacto.component.scss']
})
export class UsuarioContactoComponent implements OnInit {

  @Input('Contacto') contacto: ContactoUsuario;
  @Input('Edicion') edicion: boolean;
  @Output() estado = new EventEmitter<{eliminar: boolean, item: ContactoUsuario}>();

  constructor(
    private contactoUsuarioService: ContactoUsuarioService,
    private swall: SwallAlertService,
    private dialog: MatDialog,
    public momentService: MomentService
  ) { }

  ngOnInit(): void {
  }

  obtenerTipoContacto(tipo: number){
    return TIPOCONTACTOUSUARIO[tipo];
  }

  actualizar(){
    const dialog_config = new MatDialogConfig();
    dialog_config.disableClose = false;
    dialog_config.autoFocus = true;
    dialog_config.width = '60%';
    dialog_config.height = '80%';
    dialog_config.data = {res: this.contacto, nuevo: false, usuario_id: this.contacto};
    let dialogo = this.dialog.open(EditUsuarioContactoComponent, dialog_config);
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

  eliminar(){
    this.contactoUsuarioService.eliminarContactoUsuario(this.contacto.id).subscribe((res: any) => {
      this.swall.success('¡Eliminado!', 'Se elimino el registro.');
      this.estado.emit({eliminar: true, item: this.contacto});
    }, error => {
      this.swall.Error('¡Hubo un Error!', 'Tuvimos un problema al registrar...');
    })
  }

}
