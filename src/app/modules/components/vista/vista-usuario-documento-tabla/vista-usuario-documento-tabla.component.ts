import { Component, OnInit, Input, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DocumentoUsuario, TIPODOCUMENTOUSUARIO } from '../../../../shared/models/Usuario/DocumentoUsuario';
import { MatTableDataSource } from '@angular/material/table';
import { SwallAlertService } from '../../../../core/services/Data/swall-alert.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MomentService } from '../../../../core/services/Data/moment.service';
import { UsuarioService } from '../../../../core/services/usuario/usuario.service';
import { EditUsuarioDocumentoComponent } from '../../modal-edits/edit-usuario-documento/edit-usuario-documento.component';
import { DocumentoUsuarioService } from '../../../../core/services/usuario/documento-usuario.service';
import { environment } from 'src/environments/environment';
import { ESTADO_LISTA } from '../../../../shared/models/Respuesta';

@Component({
  selector: 'app-vista-usuario-documento-tabla',
  templateUrl: './vista-usuario-documento-tabla.component.html',
  styleUrls: ['./vista-usuario-documento-tabla.component.scss']
})
export class VistaUsuarioDocumentoTablaComponent implements OnInit {

  @Input('Documentos') lista_documentos: Array<DocumentoUsuario> = [];
  @Input('UsuarioId') usuarioId: number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  edicion: boolean = false;
  NO_DATA = 'No se encuentran datos.';
  path: string = '';

  displayedColumns: string[] = [
    'id', 
    'tipo', 
    'valor',
    'fecha_documento', 
    'created_at', 
    'acciones'
  ];
  dataSource!: MatTableDataSource<DocumentoUsuario>;

  usuario_documento: DocumentoUsuario;

  constructor(
    private usuarioService: UsuarioService,
    private documentoService: DocumentoUsuarioService,
    private swall: SwallAlertService,
    private dialog: MatDialog,
    public momentService: MomentService
  ) { }

  ngOnInit(): void {
    this.path = environment.apiBase;
    this.dataSource = new MatTableDataSource(this.lista_documentos);
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

  obtenerListaDocumentos(){
    this.usuarioService.obtenerDocumentosUsuario(this.usuarioId).subscribe((res: any) => {
      this.lista_documentos = res;
      this.dataSource = new MatTableDataSource(this.lista_documentos)
      setTimeout(() => {
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort;
      });
    }, error => {})
  }

  obtenerTipoUsuarioDocumento(tipo: number) {
    return TIPODOCUMENTOUSUARIO[tipo];
  }

  editar(documento: DocumentoUsuario) {
    const dialog_config = new MatDialogConfig();
    dialog_config.disableClose = false;
    dialog_config.autoFocus = true;
    dialog_config.width = '60%';
    dialog_config.height = '80%';
    dialog_config.data = {res: documento, estado: ESTADO_LISTA.actualizar, usuario_id: documento.usuario_id};
    let dialogo = this.dialog.open(EditUsuarioDocumentoComponent, dialog_config);
    dialogo.afterClosed().subscribe((result) => {
        if (result) {
          this.obtenerListaDocumentos();
        }
      },(error) => {
      }
    );
  }

  eliminar(documento: DocumentoUsuario){
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
        this.documentoService.eliminarDocumento(documento.id).subscribe((res: any) => {
          this.swall.success('¡Eliminado!', 'Se elimino el registro.');
          this.obtenerListaDocumentos();
        }, error => {
          this.swall.Error('¡Hubo un Error!', 'Tuvimos un problema al registrar...');
        })
      }
    })
  }

}
