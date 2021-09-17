import { Component, OnInit, ViewChild } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Empleado, EmpleadoInfo } from 'src/app/shared/models/Usuario/Empleado/Empleado';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EmpleadoService } from 'src/app/core/services/usuario/empleado.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SwallAlertService } from 'src/app/core/services/Data/swall-alert.service';
import Swal from 'sweetalert2';
import { EditEmpleadoComponent } from 'src/app/modules/components/modal-edits/edit-empleado/edit-empleado.component';
import { MomentService } from '../../../../core/services/Data/moment.service';
import { Usuario } from '../../../../shared/models/Usuario/Usuario';
import { UsuarioService } from '../../../../core/services/usuario/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lista-empleado',
  templateUrl: './lista-empleado.component.html',
  styleUrls: ['./lista-empleado.component.scss'],
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
export class ListaEmpleadoComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  expandedElement: any = null;
  columnsToDisplay: string[] = [
    'id',
    'nombre_completo',
    'nacionalidad',
    'ci',
    'estado_civil',
    'fecha_nacimiento',
    'created_at'
  ];
  dataSource;

  columnsToDisplayEmpleado: string[] = [
    'id',
    'nombre_completo',
    'nacionalidad',
    'ci',
    'notificacion_email',
    'notificacion_fcm',
  ];

  listaEmpleado: Empleado[];
  empleado_info: EmpleadoInfo;

  isExpansionDetailRow = (index, row) => row.hasOwnProperty('detailRow');

  lengthTable;

  pageEvent: PageEvent;

  constructor(
    private empleadoService: EmpleadoService,
    private dialog: MatDialog,
    private swall: SwallAlertService,
    public momentService: MomentService,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getListaEmpleado(1, 10);
  }

  getListaEmpleado(page, size){
    this.empleadoService.listaEmpleadoByPage(page, size).subscribe((res:any) => {
      this.listaEmpleado = res.results;
      this.lengthTable = res.count;
      this.dataSource = this.listaEmpleado;

      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    })
  }

  onPaginateChange(event: PageEvent){
    let page = event.pageIndex;
    let page_size = event.pageSize
    page = page + 1;
    this.getListaEmpleado(page, page_size);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  expandible(element: any){
    this.empleadoService.empleadoInfo(element.id).subscribe((res: any) => {
      this.empleado_info = res;
    }, error => {});
    return this.expandedElement = this.expandedElement === element ? null : element;
  }

  replicarTramite(empleado: Empleado) {
    const dialog_config = new MatDialogConfig();
    dialog_config.disableClose = false;
    dialog_config.autoFocus = true;
    dialog_config.width = '60%';
    dialog_config.height = '80%';
    dialog_config.data = {res: empleado, replica: true};
    let dialogo = this.dialog.open(EditEmpleadoComponent, dialog_config);
    dialogo.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.getListaEmpleado(1, 10);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteTramite(id) {
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
        this.empleadoService.eliminarEmpleado(id).subscribe(
          (res) => {
            this.swall.success('¡Eliminado!', 'Se eliminó de forma correcta.');
            this.getListaEmpleado(1, 10);
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
