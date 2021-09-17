import { Component, OnInit, Input, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { ContactoUsuario, TIPOCONTACTOUSUARIO } from '../../../../shared/models/Usuario/Usuario';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ContactoUsuarioService } from '../../../../core/services/usuario/contacto-usuario.service';
import { SwallAlertService } from '../../../../core/services/Data/swall-alert.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MomentService } from '../../../../core/services/Data/moment.service';
import { UsuarioService } from '../../../../core/services/usuario/usuario.service';
import { EditUsuarioContactoComponent } from '../../modal-edits/edit-usuario-contacto/edit-usuario-contacto.component';

@Component({
  selector: 'app-vista-usuario-contacto-tabla',
  templateUrl: './vista-usuario-contacto-tabla.component.html',
  styleUrls: ['./vista-usuario-contacto-tabla.component.scss']
})
export class VistaUsuarioContactoTablaComponent implements OnInit {

  @Input('UsuarioContacto') lista_contactos: Array<ContactoUsuario> = [];
  @Input('UsuarioId') usuarioId: number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  edicion: boolean = false;
  NO_DATA = 'No se encuentran datos.';
  path: string = '';

  displayedColumns: string[] = [
    'id', 
    'tipo_contacto', 
    'valor',
    'created_at', 
    'acciones'
  ];
  dataSource!: MatTableDataSource<ContactoUsuario>;

  usuario_contacto: ContactoUsuario;

  constructor(
    private contactoUsuarioService: ContactoUsuarioService,
    private swall: SwallAlertService,
    private dialog: MatDialog,
    public momentService: MomentService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.lista_contactos);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  obtenerListaContactos(){
    this.usuarioService.obtenerContactosUsuario(this.usuarioId).subscribe((res:any) => {
      this.lista_contactos = res;
      this.dataSource = new MatTableDataSource(this.lista_contactos)
      setTimeout(() => {
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort;
      });
    })
  }

  editar(contacto: ContactoUsuario) {
    const dialog_config = new MatDialogConfig();
    dialog_config.disableClose = false;
    dialog_config.autoFocus = true;
    dialog_config.width = '60%';
    dialog_config.height = '80%';
    dialog_config.data = {res: contacto, nuevo: false, usuario_id: contacto.usuario_id};
    let dialogo = this.dialog.open(EditUsuarioContactoComponent, dialog_config);
    dialogo.afterClosed().subscribe((result) => {
        if (result) {
          this.obtenerListaContactos();
        }
      },(error) => {
      }
    );
  }

  eliminar(contacto: ContactoUsuario){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No habrá forma de revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminalo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.contactoUsuarioService.eliminarContactoUsuario(contacto.id).subscribe((res: any) => {
          this.swall.success('¡Eliminado!', 'Se elimino el registro.');
          this.obtenerListaContactos();
        }, error => {
          this.swall.Error('¡Hubo un Error!', 'Tuvimos un problema al registrar...');
        })
      }
    })
  }

  obtenerTipoContacto(tipo: number){
    return TIPOCONTACTOUSUARIO[tipo];
  }

}
