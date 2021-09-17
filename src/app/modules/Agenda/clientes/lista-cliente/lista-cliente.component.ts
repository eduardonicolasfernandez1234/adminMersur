import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { SwallAlertService } from 'src/app/core/services/Data/swall-alert.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Cliente } from 'src/app/shared/models/Usuario/Cliente/Cliente';
import { ClienteService } from 'src/app/core/services/usuario/cliente.service';
import Swal from 'sweetalert2';
import { EditClienteComponent } from 'src/app/modules/components/modal-edits/edit-cliente/edit-cliente.component';
import { UsuarioService } from '../../../../core/services/usuario/usuario.service';
import { Usuario } from '../../../../shared/models/Usuario/Usuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MomentService } from '../../../../core/services/Data/moment.service';
import { ClienteInfo } from '../../../../shared/models/Usuario/Cliente/Cliente';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ListaClienteComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  expandedElement: any = null;
  columnsToDisplay: string[] = [
    'id',
    'razon_social',
    'identificacion_tributaria',
    'representante_legal',
    'referencia_comercial',
    'certificaciones',
    'created_at'
  ];

  columnsToDisplayCliente: string[] = [
    'id',
    'razon_social',
    'identificacion_tributaria',
    'username',
    'notificación_email',
    'notificacion_fcm'
  ];
  dataSource;

  listaCliente: Cliente[];
  cliente_info: ClienteInfo = null;

  lengthTable;

  pageEvent: PageEvent;
  lista_cliente_corta: Array<{id: number, razon_social: string, identificacion_tributaria: string}> = [];
  CLIENTE_RAZON = 1;
  CLIENTE_NIT = 2;

  parametro_buscador = {
    cliente_id: null,
    identificacion_tributaria: null,
  };

  isExpansionDetailRow = (index, row) => row.hasOwnProperty('detailRow');

  constructor(
    private clienteService: ClienteService,
    private dialog: MatDialog,
    private swall: SwallAlertService,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    public momentService: MomentService
  ) { }

  ngOnInit(): void {
    this.getListaCliente(1, 10);

    this.lista_cliente_corta = this.usuarioService.obtenerListaCliente();
  }

  getListaCliente(page, size) {
    this.clienteService.listaClientebypage(page, size).subscribe((res: any) => {
      console.log(res);
      this.listaCliente = res.results;
      this.lengthTable = res.count;
      this.dataSource = this.listaCliente;
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    })
  }

  selectEvent(item: any, tipo: number) {
    switch(tipo){
      case this.CLIENTE_RAZON:
        this.parametro_buscador.cliente_id = item.id;
        break;
      case this.CLIENTE_NIT:
        this.parametro_buscador.identificacion_tributaria = item.identificacion_tributaria;
        break;
    }
  }

  onClear(event, tipo: number){
    switch(tipo){
      case this.CLIENTE_RAZON:
        this.parametro_buscador.cliente_id = null;
        break;
      case this.CLIENTE_NIT:
        this.parametro_buscador.identificacion_tributaria = null;
        break;
    }
  }

  onChangeSearch(val: string, tipo: number) {
    switch(tipo){
      case this.CLIENTE_RAZON:
        this.parametro_buscador.cliente_id = val;
        break;
      case this.CLIENTE_NIT:
        this.parametro_buscador.identificacion_tributaria = val;
        break;
    }
  }

  buscador(page: number){
    this.clienteService.buscadorClienteByPage(this.parametro_buscador, page).subscribe((res: any) => {
      this.listaCliente = [];
      this.dataSource = null;
      this.listaCliente = res.results;
      this.lengthTable = res.count;
      this.dataSource = this.listaCliente;
      setTimeout(() => {
        if(page == 1){
          this.paginator.firstPage();
        }
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    }, error => {console.log(error)})
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  expandible(element: any){
    this.clienteService.clienteInfo(element.id).subscribe((res: any) => {
      this.cliente_info = res;
    }, error => {
      console.log(error);
    });
    return this.expandedElement = this.expandedElement === element ? null : element;
  }

  onPaginateChange(event: PageEvent){
    let page = event.pageIndex;
    let page_size = event.pageSize
    page = page + 1;
    this.getListaCliente(page, page_size);
  }

  replicarCliente(cliente: Cliente) {
    const dialog_config = new MatDialogConfig();
    dialog_config.disableClose = false;
    dialog_config.autoFocus = true;
    dialog_config.width = '60%';
    dialog_config.height = '80%';
    dialog_config.data = { res: cliente, replica: true };
    let dialogo = this.dialog.open(EditClienteComponent, dialog_config);
    dialogo.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.getListaCliente(1, 10);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteCliente(id) {
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
        this.clienteService.eliminarCliente(id).subscribe(
          (res) => {
            this.swall.success('¡Eliminado!', 'Se eliminó de forma correcta.');
            this.getListaCliente(1, 10);
          }, err => {
            this.swall.Error('¡Hubo un Error!', 'Tuvimos un problema al eliminar...');
          }
        );
      }
    })
  }

  cambiarEstadoFCM(usuario: Usuario) {
    this.usuarioService.actualizarEstadoNotificacionFCM(usuario.envio_fcm, usuario.id).subscribe((res: Usuario) => {
      if(res.envio_fcm){
        this.snackBar.open('Notificación FCM Activado', 'Aceptar');
      }else{
        this.snackBar.open('Notificación FCM Desactivado', 'Aceptar');
      }
      setTimeout(() => {
        this.snackBar.dismiss();
      }, 1000);
    }, error=> {
      this.swall.Error('¡Hubo un Error!', 'Tuvimos un problema al actualizar la información...');
    })
  }

  cambiarEstadoEmail(usuario: Usuario) {
    this.usuarioService.actualizarEstadoNotificacionEmail(usuario.envio_email, usuario.id).subscribe((res: Usuario) => {
      if(res.envio_email){
        this.snackBar.open('Notificación Email Activado', 'Aceptar');
      }else{
        this.snackBar.open('Notificación Email Desactivado', 'Aceptar');
      }
      setTimeout(() => {
        this.snackBar.dismiss();
      }, 1000);
    }, error=> {
      this.swall.Error('¡Hubo un Error!', 'Tuvimos un problema al actualizar la información...');
    })
  }

}
