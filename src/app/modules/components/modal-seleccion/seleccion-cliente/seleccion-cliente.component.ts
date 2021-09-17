import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Cliente } from '../../../../shared/models/Usuario/Cliente/Cliente';
import { ClienteService } from '../../../../core/services/usuario/cliente.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MomentService } from '../../../../core/services/Data/moment.service';
import { UsuarioService } from 'src/app/core/services/usuario/usuario.service';

@Component({
  selector: 'app-seleccion-cliente',
  templateUrl: './seleccion-cliente.component.html',
  styleUrls: ['./seleccion-cliente.component.scss']
})
export class SeleccionClienteComponent implements OnInit {

  displayedColumns: string[] = ['id', 'razon_social', 'identificacion_tributaria', 'representante_legal', 'created_at'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: any;

  listaClientes: Array<Cliente> = [];
  cliente!: Cliente;
  lengthTable;
  pageEvent: PageEvent;

  lista_cliente_corta: Array<{id: number, razon_social: string, identificacion_tributaria: string}> = [];
  CLIENTE_RAZON = 1;
  CLIENTE_NIT = 2;

  parametro_buscador = {
    cliente_id: null,
    identificacion_tributaria: null,
  };
  panelOpenState = false;

  preventSingleClick = false;
  timer: any;
  delay: Number;

  constructor(
    private clienteService: ClienteService,
    private dialog_ref: MatDialogRef<SeleccionClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public momentService: MomentService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.lista_cliente_corta = this.usuarioService.obtenerListaCliente();
    this.obtenerListaClientes(1, 10);
  }

  obtenerListaClientes(page: number, size: number){
    this.clienteService.listaClientebypage(page, size).subscribe((respuesta: any) => {
      this.listaClientes = respuesta.results;
      this.lengthTable = respuesta.count;
      this.dataSource = this.listaClientes;
      setTimeout(() => {
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort;
      });
    }, error => { console.log(error)})
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
      this.listaClientes = [];
      this.dataSource = null;
      this.listaClientes = res.results;
      this.lengthTable = res.count;
      this.dataSource = this.listaClientes;
      setTimeout(() => {
        if(page == 1){
          this.paginator.firstPage();
        }
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    }, error => {console.log(error)})
  }

  rowClick(cliente: Cliente){
    this.preventSingleClick = false;
     const delay = 200;
      this.timer = setTimeout(() => {
        if (!this.preventSingleClick) {
           //Navigate on single click
           this.cliente = cliente;
        }
      }, delay);
  }

  doubleClick (cliente) {
    this.preventSingleClick = true;
    clearTimeout(this.timer);
    //Navigate on double click
    this.cliente = cliente;
    this.seleccionar();
  }

  onPaginateChange(event: PageEvent){
    let page = event.pageIndex;
    let page_size = event.pageSize
    page = page + 1;
    this.obtenerListaClientes(page, page_size);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  seleccionar(){
    this.dialog_ref.close(this.cliente);
  }

}
