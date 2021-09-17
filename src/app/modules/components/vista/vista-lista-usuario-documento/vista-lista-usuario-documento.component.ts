import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DocumentoUsuario } from 'src/app/shared/models/Usuario/DocumentoUsuario';
import { EditUsuarioDocumentoComponent } from '../../modal-edits/edit-usuario-documento/edit-usuario-documento.component';
import { ESTADO_LISTA } from '../../../../shared/models/Respuesta';
import { UsuarioService } from '../../../../core/services/usuario/usuario.service';

@Component({
  selector: 'app-vista-lista-usuario-documento',
  templateUrl: './vista-lista-usuario-documento.component.html',
  styleUrls: ['./vista-lista-usuario-documento.component.scss']
})
export class VistaListaUsuarioDocumentoComponent implements OnInit {

  @Input('DocumentoUsuario') documento_usuario: DocumentoUsuario[];
  @Input('UsuarioId') usuarioId: number;
  NO_DATA = 'No se encuentran datos';
  edicion: boolean = false;

  constructor(
    private dialog: MatDialog,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
  }

  obtenerListaDocumentos(){
    this.usuarioService.obtenerDocumentosUsuario(this.usuarioId).subscribe((res: any) => {
      this.documento_usuario = res;
    }, error => {})
  }

  registrar() {
    const dialog_config = new MatDialogConfig();
    dialog_config.disableClose = false;
    dialog_config.autoFocus = true;
    dialog_config.width = '60%';
    dialog_config.height = '80%';
    dialog_config.data = { res: null, estado: ESTADO_LISTA.registrar, usuario_id: this.usuarioId };
    let dialogo = this.dialog.open(EditUsuarioDocumentoComponent, dialog_config);
    dialogo.afterClosed().subscribe((result) => {
      if(result){
        this.documento_usuario = [];
        this.obtenerListaDocumentos();
      }
    },(error) => {});
  }

  // verificar(event: { eliminar: boolean, item: DocumentoUsuario }) {
  //   if (event.eliminar) {
  //     let pos = this.documento_usuario.indexOf(event.item);
  //     if (pos !== -1) {
  //       this.documento_usuario.splice(pos, 1);
  //     }
  //   }
  // }

}
