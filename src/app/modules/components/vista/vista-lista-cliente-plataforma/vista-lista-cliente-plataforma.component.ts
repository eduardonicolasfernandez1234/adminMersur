import { Component, OnInit, Input } from '@angular/core';
import { ClientePlataforma } from '../../../../shared/models/Usuario/Cliente/Cliente';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditClientePlataformaComponent } from '../../modal-edits/edit-cliente-plataforma/edit-cliente-plataforma.component';
import { ClienteService } from '../../../../core/services/usuario/cliente.service';

@Component({
  selector: 'app-vista-lista-cliente-plataforma',
  templateUrl: './vista-lista-cliente-plataforma.component.html',
  styleUrls: ['./vista-lista-cliente-plataforma.component.scss']
})
export class VistaListaClientePlataformaComponent implements OnInit {

  @Input('PlataformaContacto') plataforma_contactos: ClientePlataforma[];
  @Input('ClienteId') clienteId: number;
  NO_DATA = 'No se encuentran datos';

  edicion: boolean = false;

  constructor(
    private dialog: MatDialog,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
  }

  obtenerListaPlataformas(){
    this.clienteService.listaPlataformaCliente(this.clienteId).subscribe((res:any) => {
      this.plataforma_contactos = res;
    }, error => {})
  }

  registrar(){
    const dialog_config = new MatDialogConfig();
    dialog_config.disableClose = false;
    dialog_config.autoFocus = true;
    dialog_config.width = '60%';
    dialog_config.height = '80%';
    dialog_config.data = {res: null, nuevo: true, cliente_id: this.clienteId};
    let dialogo = this.dialog.open(EditClientePlataformaComponent, dialog_config);
    dialogo.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.plataforma_contactos = [];
          this.obtenerListaPlataformas();
        }
      },(error) => {}
    );
  }

  // verificar(event: {eliminar: boolean, item: ClientePlataforma}){
  //   if(event.eliminar){
  //     let pos = this.plataforma_contactos.indexOf(event.item);
  //     if(pos !== -1){
  //       this.plataforma_contactos.splice(pos, 1);
  //     }
  //   }
  // }

}
