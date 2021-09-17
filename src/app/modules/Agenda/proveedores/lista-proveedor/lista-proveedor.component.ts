import { Component, OnInit, ViewChild } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProveedorService } from 'src/app/core/services/usuario/proveedor.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SwallAlertService } from 'src/app/core/services/Data/swall-alert.service';
import Swal from 'sweetalert2';
import { EditProveedorComponent } from 'src/app/modules/components/modal-edits/edit-proveedor/edit-proveedor.component';
import { MomentService } from '../../../../core/services/Data/moment.service';
import { ProveedorInfo } from '../../../../shared/models/Usuario/Proveedor/Proveedor';

@Component({
  selector: 'app-lista-proveedor',
  templateUrl: './lista-proveedor.component.html',
  styleUrls: ['./lista-proveedor.component.scss'],
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
export class ListaProveedorComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  expandedElement: any = null;
  columnsToDisplay: string[] = [
    'id',
    'agencia',
    'nit',
    'razon_social',
    'tipo_proveedor',
    'created_at',
    'acciones'
  ];
  dataSource;

  listaProveedor: any[];
  proveedor_info: ProveedorInfo;

  lengthTable;

  pageEvent: PageEvent;

  isExpansionDetailRow = (index, row) => row.hasOwnProperty('detailRow');

  constructor(
    private proveedorService: ProveedorService,
    private dialog: MatDialog,
    private swall: SwallAlertService,
    public momentService: MomentService
  ) { }

  ngOnInit(): void {
    this.getListaProveedor(1, 10);
  }

  getListaProveedor(page, size){
    this.proveedorService.listaProveedorbyPage(page, size).subscribe((res:any) => {
      this.listaProveedor = res.results;
      console.log(this.listaProveedor);
      this.lengthTable = res.count;
      this.dataSource = this.listaProveedor;
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
    this.getListaProveedor(page, page_size);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  expandible(element: any){
    this.proveedorService.proveedorInfo(element.id).subscribe((res: any) => {
      this.proveedor_info = res;
    }, error => {});
    return this.expandedElement = this.expandedElement === element ? null : element;
  }

  replicarTramite(proveedor: any) {
    const dialog_config = new MatDialogConfig();
    dialog_config.disableClose = false;
    dialog_config.autoFocus = true;
    dialog_config.width = '60%';
    dialog_config.height = '80%';
    dialog_config.data = {res: proveedor, replica: true};
    let dialogo = this.dialog.open(EditProveedorComponent, dialog_config);
    dialogo.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.getListaProveedor(1, 10);
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
        this.proveedorService.eliminarProveedor(id).subscribe(
          (res) => {
            this.swall.success('¡Eliminado!', 'Se eliminó de forma correcta.');
            this.getListaProveedor(1, 10);
          }, err => {
            this.swall.Error('¡Hubo un Error!', 'Tuvimos un problema al eliminar...');
          }
        );
      }
    })
  }

}
