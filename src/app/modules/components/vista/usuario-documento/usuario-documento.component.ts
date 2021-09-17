import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DocumentoUsuario, TIPODOCUMENTOUSUARIO } from '../../../../shared/models/Usuario/DocumentoUsuario';
import { SwallAlertService } from '../../../../core/services/Data/swall-alert.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DocumentoUsuarioService } from '../../../../core/services/usuario/documento-usuario.service';
import { EditUsuarioDocumentoComponent } from '../../modal-edits/edit-usuario-documento/edit-usuario-documento.component';
import { ESTADO_LISTA } from '../../../../shared/models/Respuesta';
import { MomentService } from '../../../../core/services/Data/moment.service';

@Component({
  selector: 'app-usuario-documento',
  templateUrl: './usuario-documento.component.html',
  styleUrls: ['./usuario-documento.component.scss']
})
export class UsuarioDocumentoComponent implements OnInit {

  @Input('Documento') documento: DocumentoUsuario;
  @Input('Edicion') edicion: boolean;
  @Output() estado = new EventEmitter<{eliminar: boolean, item: DocumentoUsuario}>();

  visualizar: boolean = false;

  constructor(
    private documentoService: DocumentoUsuarioService,
    private swall: SwallAlertService,
    private dialog: MatDialog,
    public momentService: MomentService
  ) { }

  ngOnInit(): void {
  }

  eliminar(){
    this.documentoService.eliminarDocumento(this.documento.id).subscribe((res: any) => {
      this.swall.success('¡Eliminado!', 'Se elimino el registro.');
      this.estado.emit({eliminar: true, item: this.documento});
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
    dialog_config.data = {res: this.documento, estado: ESTADO_LISTA.actualizar, usuario_id: this.documento.usuario_id};
    let dialogo = this.dialog.open(EditUsuarioDocumentoComponent, dialog_config);
    dialogo.afterClosed().subscribe((result) => {
        if (result) {
          this.documento = result;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  obtenerTipoDocumento(tipo: number){
    return TIPODOCUMENTOUSUARIO[tipo];
  }

}
