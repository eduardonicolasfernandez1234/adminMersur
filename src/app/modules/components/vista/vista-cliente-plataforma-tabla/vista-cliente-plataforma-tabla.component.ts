import { Component, OnInit, Input, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { ClientePlataforma } from '../../../../shared/models/Usuario/Cliente/Cliente';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteService } from '../../../../core/services/usuario/cliente.service';
import { SwallAlertService } from '../../../../core/services/Data/swall-alert.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MomentService } from '../../../../core/services/Data/moment.service';
import { EditClientePlataformaComponent } from '../../modal-edits/edit-cliente-plataforma/edit-cliente-plataforma.component';

@Component({
  selector: 'app-vista-cliente-plataforma-tabla',
  templateUrl: './vista-cliente-plataforma-tabla.component.html',
  styleUrls: ['./vista-cliente-plataforma-tabla.component.scss']
})
export class VistaClientePlataformaTablaComponent implements OnInit {

  @Input('Plataformas') lista_plataformas: Array<ClientePlataforma> = [];
  @Input('ClienteId') clienteId: number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  edicion: boolean = false;
  NO_DATA = 'No se encuentran datos.';
  path: string = '';

  displayedColumns: string[] = [
    'nombre_plataforma', 
    'usuario', 
    'password', 
    'token', 
    'created_at', 
    'acciones'
  ];
  dataSource!: MatTableDataSource<ClientePlataforma>;

  cliente_contacto: ClientePlataforma;

  constructor(
    private clienteService: ClienteService,
    private swall: SwallAlertService,
    private dialog: MatDialog,
    public momentService: MomentService
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.lista_plataformas)
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

  obtenerListaPlataformas(){
    this.clienteService.listaPlataformaCliente(this.clienteId).subscribe((res:any) => {
      this.lista_plataformas = res;
      this.dataSource = new MatTableDataSource(this.lista_plataformas)
      setTimeout(() => {
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort;
      });
    })
  }

  editar(plataforma: ClientePlataforma) {
    const dialog_config = new MatDialogConfig();
    dialog_config.disableClose = false;
    dialog_config.autoFocus = true;
    dialog_config.width = '60%';
    dialog_config.height = '80%';
    dialog_config.data = {res: plataforma, nuevo: false, cliente_id: plataforma.cliente_id};
    let dialogo = this.dialog.open(EditClientePlataformaComponent, dialog_config);
    dialogo.afterClosed().subscribe((result) => {
        if (result) {
          this.obtenerListaPlataformas();
        }
      },(error) => {
      }
    );
  }

  eliminar(plataforma: ClientePlataforma){
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
        this.clienteService.eliminarPlataformaCliente(plataforma.id).subscribe((res: any) => {
          this.swall.success('¡Eliminado!', 'Se elimino el registro.');
          this.obtenerListaPlataformas();
        }, error => {
          this.swall.Error('¡Hubo un Error!', 'Tuvimos un problema al registrar...');
        })
      }
    })
  }

}
