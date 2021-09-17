import { Component, OnInit, Input } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ContactoUsuario } from '../../../../shared/models/Usuario/Usuario';
import { EditUsuarioContactoComponent } from '../../modal-edits/edit-usuario-contacto/edit-usuario-contacto.component';
import { UsuarioService } from '../../../../core/services/usuario/usuario.service';

@Component({
  selector: 'app-vista-lista-usuario-contacto',
  templateUrl: './vista-lista-usuario-contacto.component.html',
  styleUrls: ['./vista-lista-usuario-contacto.component.scss']
})
export class VistaListaUsuarioContactoComponent implements OnInit {

  @Input('UsuarioContacto') contacto_usuario: ContactoUsuario[];
  @Input('UsuarioId') usuarioId: number;
  NO_DATA = 'No se encuentran datos';
  edicion: boolean = false;

  constructor(
    private dialog: MatDialog,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
  }

  obtenerListaContactos(){
    this.usuarioService.obtenerContactosUsuario(this.usuarioId).subscribe((res:any) => {
      this.contacto_usuario = res;
    })
  }

  registrar(){
    const dialog_config = new MatDialogConfig();
    dialog_config.disableClose = false;
    dialog_config.autoFocus = true;
    dialog_config.width = '60%';
    dialog_config.height = '80%';
    dialog_config.data = {res: null, nuevo: true, usuario_id: this.usuarioId};
    let dialogo = this.dialog.open(EditUsuarioContactoComponent, dialog_config);
    dialogo.afterClosed().subscribe((result) => {
        if (result) {
          this.contacto_usuario = [];
          this.obtenerListaContactos();
        }
      },(error) => {}
    );
  }

  // verificar(event: {eliminar: boolean, item: ContactoUsuario}){
  //   if(event.eliminar){
  //     let pos = this.contacto_usuario.indexOf(event.item);
  //     if(pos !== -1){
  //       this.contacto_usuario.splice(pos, 1);
  //     }
  //   }
  // }

}
