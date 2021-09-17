import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ClienteContacto, CONTACTOLOGISTICA } from '../../../../shared/models/Usuario/Cliente/Cliente';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ClienteService } from '../../../../core/services/usuario/cliente.service';
import { SwallAlertService } from '../../../../core/services/Data/swall-alert.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MomentService } from '../../../../core/services/Data/moment.service';
import { MatTableDataSource } from '@angular/material/table';
import { EditClienteContactoComponent } from '../../modal-edits/edit-cliente-contacto/edit-cliente-contacto.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vista-cliente-contacto-tabla',
  templateUrl: './vista-cliente-contacto-tabla.component.html',
  styleUrls: ['./vista-cliente-contacto-tabla.component.scss']
})
export class VistaClienteContactoTablaComponent implements OnInit {

  @Input('Contactos') lista_contactos: Array<ClienteContacto> = [];
  @Input('ClienteId') clienteId: number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  edicion: boolean = false;
  NO_DATA = 'No se encuentran datos.';
  path: string = '';

  displayedColumns: string[] = [
    'nombre_completo', 
    'tipo', 
    'email', 
    'telefono', 
    'created_at', 
    'acciones'
  ];
  dataSource!: MatTableDataSource<ClienteContacto>;

  cliente_contacto: ClienteContacto;

  constructor(
    private clienteService: ClienteService,
    private swall: SwallAlertService,
    private dialog: MatDialog,
    public momentService: MomentService
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.lista_contactos)
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

  registrar(){

  }

  obtenerListaContactos(){
    this.clienteService.listaContactosCliente(this.clienteId).subscribe((res:any) => {
      this.lista_contactos = res;
      this.dataSource = new MatTableDataSource(this.lista_contactos)
      setTimeout(() => {
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort;
      });
    })
  }

  editar(contacto: ClienteContacto) {
    const dialog_config = new MatDialogConfig();
    dialog_config.disableClose = false;
    dialog_config.autoFocus = true;
    dialog_config.width = '60%';
    dialog_config.height = '80%';
    dialog_config.data = {res: contacto, nuevo: false, cliente_id: contacto.cliente_id};
    let dialogo = this.dialog.open(EditClienteContactoComponent, dialog_config);
    dialogo.afterClosed().subscribe((result) => {
        if (result) {
          this.obtenerListaContactos();
        }
      },(error) => {
      }
    );
  }

  eliminar(contacto: ClienteContacto){
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
        this.clienteService.eliminarContactoCliente(contacto.id).subscribe((res: any) => {
          this.swall.success('¡Eliminado!', 'Se elimino el registro.');
          this.obtenerListaContactos();
        }, error => {
          this.swall.Error('¡Hubo un Error!', 'Tuvimos un problema al registrar...');
        })
      }
    })
  }

  obtenerTipoContacto(tipo: number){
    return CONTACTOLOGISTICA[tipo];
  }

}
