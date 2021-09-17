import { Injectable } from '@angular/core';
import { IconOption } from 'src/app/shared/models/Sidebar-Options/Icons';
import { Option } from 'src/app/shared/models/Sidebar-Options/Option';

@Injectable({
  providedIn: 'root'
})
export class OpcionesRutasService {

  options: Option[];

  iconos: IconOption[];

  constructor() {
    this.options = this.inicio();
    this.iconos = this.icons();
  }

  getOpciones(){
    return this.options;
  }

  setOpciones(newOptions: Option[]){
    this.options = newOptions;
  }

  getIconos(){
    return this.iconos;
  }

  icons(): IconOption[] {
    return [
      {name:'home',selected: true},
      {name:'local_shipping',selected: false},
      {name:'folder',selected: false},
      {name:'library_books',selected: false},
      {name:'event',selected: false},
      {name:'monetization_on',selected: false},
      {name:'location_city',selected: false},
      {name:'construction',selected: false},
      {name:'notifications',selected: false},
    ];
  }

  inicio(): Option[] {
    return [
      { name: 'Dashboard', route: 'tramite/registro' ,selected: false},
      { name: 'Registro de trámites', route: 'tramite/registro',selected: false },
      { name: 'Listado de trámites', route: 'tramite/lista',selected: false },
      { name: 'Entrega de documentos', route: 'documento/entrega',selected: false },
      { name: 'Nuevo plazo', route: 'plazo/registro',selected: false },
      { name: 'Listado de plazos', route: 'plazo/lista',selected: false },
      { name: 'Ficha de tramite', route: 'tramites/ficha-tramite', selected: false },
      { name: 'Correspondencia', route: 'tramite/registro',selected: false },
      { name: 'Regularizar', route: 'tramite/registro' ,selected: false},
      { name: 'Ver Lista', route: 'tramite/registro',selected: false },
    ];
  }

  despacho(): Option[] {
    return [
      { name: 'Búsqueda de Despacho', route: 'tramite/registro',selected: false },
      { name: 'Control de Gastos', route: 'tramite/registro',selected: false },
      { name: 'Gastos de Despacho', route: 'tramite/registro',selected: false },
      { name: 'Totales - Factura - Planilla', route: 'tramite/registro',selected: false },
      { name: 'Archivo', route: 'tramite/registro',selected: false },
      { name: 'Plazos', route: 'tramite/registro',selected: false },
      { name: 'Data-Gen', route: 'tramite/registro',selected: false },
      { name: 'Detalle Item', route: 'tramite/registro',selected: false },
      { name: 'Auxiliar', route: 'tramite/registro',selected: false },
      { name: 'Otras Opciones', route: 'tramite/registro',selected: false },
    ];
  }

  carpetas(): Option[] {
    return [
      { name: 'Registro de Carpetas', route: 'tramite/registro',selected: false },
      { name: 'Listado de Carpetas', route: 'tramite/registro',selected: false },
      { name: 'Registro de Prestamos', route: 'tramite/registro',selected: false },
      { name: 'Listado de Prestamos', route: 'tramite/registro',selected: false },
      { name: 'Registro de Legalización', route: 'tramite/registro',selected: false },
      { name: 'Listado de Legalización', route: 'tramite/registro',selected: false },
      { name: 'Reporte Archivados', route: 'tramite/registro',selected: false },
    ];
  }

  gestion(): Option[] {
    return [
      { name: 'Solicitud de pagos', route: 'gestion/solicitud-pago', selected: false },
      { name: 'Listado Solicitud de Pagos', route: 'gestion/listado-pago', selected: false },
      { name: 'Registro de Carpetas', route: 'gestion/registro-carpeta', selected: false }
    ];
  }

  agenda(): Option[] {
    return [
      { name: 'Registro Cliente', route: 'cliente/registro',selected: false },
      { name: 'Listado de Clientes', route: 'cliente/lista',selected: false },
      { name: 'Registro Empleado', route: 'empleado/registro',selected: false },
      { name: 'Listado de Empleados', route: 'empleado/lista',selected: false },
      { name: 'Registro Proveedores', route: 'proveedor/registro',selected: false },
      { name: 'Listado de Proveedores', route: 'proveedor/lista',selected: false },
    ];
  }

  finanzas(): Option[] {
    return [
      { name: 'Registro de Carpetas', route: 'tramite/registro',selected: false },
      { name: 'Gestión de pagos', route: 'finanza/gestion-pagos',selected: false },
    ];
  }

  sgc(): Option[] {
    return [
      { name: 'Registro de Incidencias', route: 'incidencia/registro',selected: false },
      { name: 'Listado de Incidencias', route: 'incidencia/lista',selected: false },
      { name: 'Registro no Conformidad', route: 'tramite/registro',selected: false },
      { name: 'Listado de no Conformidades', route: 'tramite/registro',selected: false },
      { name: 'Registro de Visita', route: 'tramite/registro',selected: false },
      { name: 'Registro de Reunión', route: 'tramite/registro',selected: false },
      { name: 'Partidas Arancelarias', route: 'tramite/registro',selected: false },
    ];
  }

  herramientas(): Option[] {
    return [{ name: 'Auto Filler', route: 'herramienta/autofiller', selected: false },
            { name: 'Apertura en bloque', route: 'herramienta/bloque',selected: false },
            { name: 'Tariff', route: 'herramienta/tariff',selected: false }
    ];
  }

  notificaciones(): Option[] {
    return [
      { name: 'Lista Notificaciones', route: 'notificacion/lista',selected: false },
      { name: 'Notificacion Usuarios', route: 'notificacion/configuracion-usuarios', selected: false }
    ];
  }

  cambio(option: string) {
    this.options = [];
    switch (option) {
      case 'home':
        this.options = this.inicio();
        break;
      case 'local_shipping':
        this.options = this.despacho();
        break;
      case 'folder':
        this.options = this.carpetas();
        break;
      case 'library_books':
        this.options = this.gestion();
        break;
      case 'event':
        this.options = this.agenda();
        break;
      case 'monetization_on':
        this.options = this.finanzas();
        break;
      case 'location_city':
        this.options = this.sgc();
        break;
      case 'construction':
        this.options = this.herramientas();
        break;
      case 'notifications':
        this.options = this.notificaciones();
        break;
    }
  }

}
