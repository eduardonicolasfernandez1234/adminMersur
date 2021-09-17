import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MomentService } from 'src/app/core/services/Data/moment.service';
import { SwallAlertService } from 'src/app/core/services/Data/swall-alert.service';
import { TramiteService } from 'src/app/core/services/tramite/tramite.service';
import { ClienteService } from 'src/app/core/services/usuario/cliente.service';
import { ComisionCliente, TIPO_COMISION, TIPO_MONEDA_COMISION, TIPO_MONEDA_COMISION_ABBR, TIPO_MONEDA_COMISION_COSTO, TIPO_MONEDA_COMISION_COSTO_ABBR } from 'src/app/shared/models/Tramite/ComisionCliente';
import { TipoMercaderia } from 'src/app/shared/models/Tramite/Tramite';
import { EditClienteComisionComponent } from '../../modal-edits/edit-cliente-comision/edit-cliente-comision.component';

@Component({
  selector: 'app-cliente-comision',
  templateUrl: './cliente-comision.component.html',
  styleUrls: ['./cliente-comision.component.scss']
})
export class ClienteComisionComponent implements OnInit {

  @Input('Comision') comision: ComisionCliente;
  @Input('ClienteId') clienteId: number;
  @Input('Edicion') edicion: boolean;
  @Output() estado = new EventEmitter<{eliminar: boolean, item: ComisionCliente}>();

  tipo_mercaderia: Array<TipoMercaderia> = [];

  SIMPLE = TIPO_COMISION.Simple;
  COMPLETO = TIPO_COMISION.Completo;
  nombre_mercaderia: string;

  constructor(
    private clienteService: ClienteService,
    private swall: SwallAlertService,
    private dialog: MatDialog,
    public momentService: MomentService,
    private tramiteService: TramiteService
  ) { }

  ngOnInit(): void {
    console.log(this.comision);
    this.tramiteService.tipoMercaderia().subscribe((res: any) => {
      this.tipo_mercaderia = res;
      this.obtenerNombreMercaderia(this.comision.tipo_mercaderia_id);
    }, error => {
      console.log(error);
    })
  }

  actualizar(){
    const dialog_config = new MatDialogConfig();
    dialog_config.disableClose = false;
    dialog_config.autoFocus = true;
    dialog_config.width = '60%';
    dialog_config.height = '80%';
    dialog_config.data = {res: this.comision, nuevo: false, cliente_id: this.comision.cliente_id};
    let dialogo = this.dialog.open(EditClienteComisionComponent, dialog_config);
    dialogo.afterClosed().subscribe((result) => {
        if (result) {
          this.comision = result;
          this.obtenerNombreMercaderia(this.comision.tipo_mercaderia_id);
        }
      },(error) => {
        console.log(error);
      }
    );
  }

  eliminar(){
    this.tramiteService.eliminarComision(this.comision.id).subscribe((res: any) => {
      this.estado.emit({eliminar: true, item: this.comision});
      this.swall.success('¡Eliminado!', 'Se elimino el registro.');
    }, error => {
      console.log(error);
      this.swall.Error('¡Hubo un Error!', 'Tuvimos un problema al registrar...');
    })
  }

  obtenerNombreMercaderia(tipo_mercaderia: number){
    this.nombre_mercaderia = '';
    this.tipo_mercaderia.forEach((element) => {
      if(element.id == tipo_mercaderia){
        this.nombre_mercaderia = element.nombre;
      }
    })
  }

  obtenerTipoComision(tipo: number){
    return TIPO_COMISION[tipo];
  }

  obtenerTipoMonedaComision(tipo){
    return TIPO_MONEDA_COMISION[tipo];
  }

  obtenerTipoMonedaComisionAbbr(tipo){
    return TIPO_MONEDA_COMISION_ABBR[tipo];
  }

  obtenerTipoMonedaComisionCosto(tipo){
    return TIPO_MONEDA_COMISION_COSTO[tipo];
  }

  obtenerTipoMonedaComisionCostoAbbr(tipo){
    return TIPO_MONEDA_COMISION_COSTO_ABBR[tipo];
  }

}
