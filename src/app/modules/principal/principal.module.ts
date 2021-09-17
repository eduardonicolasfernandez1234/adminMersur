import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal.component';
import { DashboardComponent } from '../Home/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import { NgxPrintModule } from 'ngx-print';

import { NgxDropzoneModule } from 'ngx-dropzone';
import { CdkColumnDef } from '@angular/cdk/table';

import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderFormComponent } from '../components/header-form/header-form.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegistroTramiteComponent } from '../Home/tramites/registro-tramite/registro-tramite.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaTramiteComponent } from '../Home/tramites/lista-tramite/lista-tramite.component';
import { RegistroPlazoComponent } from '../Home/plazos/registro-plazo/registro-plazo.component';
import { ListaPlazoComponent } from '../Home/plazos/lista-plazo/lista-plazo.component';
import { RegistroClienteComponent } from '../Agenda/clientes/registro-cliente/registro-cliente.component';
import { ListaClienteComponent } from '../Agenda/clientes/lista-cliente/lista-cliente.component';
import { RegistroEmpleadoComponent } from '../Agenda/empleados/registro-empleado/registro-empleado.component';
import { ListaEmpleadoComponent } from '../Agenda/empleados/lista-empleado/lista-empleado.component';
import { RegistroProveedorComponent } from '../Agenda/proveedores/registro-proveedor/registro-proveedor.component';
import { ListaProveedorComponent } from '../Agenda/proveedores/lista-proveedor/lista-proveedor.component';
import { ListaIncidenciaComponent } from '../Sgc/lista-incidencia/lista-incidencia.component';
import { RegistroIncidenciaComponent } from '../Sgc/registro-incidencia/registro-incidencia.component';
import { AutoFillerComponent } from '../Herramienta/auto-filler/auto-filler.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListaNotificacionComponent } from '../Notificacion/lista-notificacion/lista-notificacion.component';
import { AperturaBloqueComponent } from '../Herramienta/apertura-bloque/apertura-bloque.component';
import { EntregaDocComponent } from '../Home/documentos/entrega-doc/entrega-doc.component';
import { VerTramiteComponent } from '../Home/tramites/ver-tramite/ver-tramite.component';
import { SolicitudPagosComponent } from '../Gestion/solicitud-pagos/solicitud-pagos.component';
import { ListadoPagosComponent } from '../Gestion/listado-pagos/listado-pagos.component';
import { ConfiguracionUsuariosComponent } from '../Notificacion/configuracion-usuarios/configuracion-usuarios.component';
import { RegistroCarpetasComponent } from '../Gestion/registro-carpetas/registro-carpetas.component';
import { GestionPagosComponent } from '../Finanza/gestion-pagos/gestion-pagos.component';
import { ListaAprobadosComponent } from '../Finanza/lista-aprobados/lista-aprobados.component';
import { ListaRechazadosComponent } from '../Finanza/lista-rechazados/lista-rechazados.component';
import { TariffComponent } from '../Herramienta/tariff/tariff.component';

// Components Informacion
import { InformationTableClienteComponent } from '../components/informacion/information-table-cliente/information-table-cliente.component';
import { InformationTableEmpleadoComponent } from '../components/informacion/information-table-empleado/information-table-empleado.component';
import { InformationTableProveedorComponent } from '../components/informacion/information-table-proveedor/information-table-proveedor.component';
// Components Modals - Seleccion
import { SeleccionClienteComponent } from '../components/modal-seleccion/seleccion-cliente/seleccion-cliente.component';
// Components Vista
import { VistaListaClienteContactoComponent } from '../components/vista/vista-lista-cliente-contacto/vista-lista-cliente-contacto.component';
import { VistaListaClientePlataformaComponent } from '../components/vista/vista-lista-cliente-plataforma/vista-lista-cliente-plataforma.component';
import { VistaListaUsuarioContactoComponent } from '../components/vista/vista-lista-usuario-contacto/vista-lista-usuario-contacto.component';
import { VistaListaUsuarioDocumentoComponent } from '../components/vista/vista-lista-usuario-documento/vista-lista-usuario-documento.component';
import { ClienteComponent } from '../components/vista/cliente/cliente.component';
import { EmpleadoComponent } from '../components/vista/empleado/empleado.component';
import { ProveedorComponent } from '../components/vista/proveedor/proveedor.component';
import { ClienteContactoComponent } from '../components/vista/cliente-contacto/cliente-contacto.component';
import { ClientePlataformaComponent } from '../components/vista/cliente-plataforma/cliente-plataforma.component';
import { UsuarioContactoComponent } from '../components/vista/usuario-contacto/usuario-contacto.component';
import { UsuarioDocumentoComponent } from '../components/vista/usuario-documento/usuario-documento.component';
import { UsuarioComponent } from '../components/vista/usuario/usuario.component';
import { VistaClienteContactoTablaComponent } from '../components/vista/vista-cliente-contacto-tabla/vista-cliente-contacto-tabla.component';
import { VistaClientePlataformaTablaComponent } from '../components/vista/vista-cliente-plataforma-tabla/vista-cliente-plataforma-tabla.component';
import { VistaUsuarioDocumentoTablaComponent } from '../components/vista/vista-usuario-documento-tabla/vista-usuario-documento-tabla.component';
import { VistaUsuarioContactoTablaComponent } from '../components/vista/vista-usuario-contacto-tabla/vista-usuario-contacto-tabla.component';
// Components Modals - Edits
import { EditProveedorComponent } from '../components/modal-edits/edit-proveedor/edit-proveedor.component';
import { EditEmpleadoComponent } from '../components/modal-edits/edit-empleado/edit-empleado.component';
import { EditClienteComponent } from '../components/modal-edits/edit-cliente/edit-cliente.component';
import { EditUsuarioDocumentoComponent } from '../components/modal-edits/edit-usuario-documento/edit-usuario-documento.component';
import { EditUsuarioContactoComponent } from '../components/modal-edits/edit-usuario-contacto/edit-usuario-contacto.component';
import { EditClienteContactoComponent } from '../components/modal-edits/edit-cliente-contacto/edit-cliente-contacto.component';
import { EditClientePlataformaComponent } from '../components/modal-edits/edit-cliente-plataforma/edit-cliente-plataforma.component';


@NgModule({
  declarations: [
    PrincipalComponent,
    DashboardComponent,
    RegistroTramiteComponent,
    ListaTramiteComponent,
    RegistroPlazoComponent,
    ListaPlazoComponent,
    RegistroClienteComponent,
    ListaClienteComponent,
    RegistroEmpleadoComponent,
    ListaEmpleadoComponent,
    RegistroProveedorComponent,
    ListaProveedorComponent,
    RegistroIncidenciaComponent,
    ListaIncidenciaComponent,
    AutoFillerComponent,
    ListaNotificacionComponent,
    HeaderFormComponent,
    AperturaBloqueComponent,
    EntregaDocComponent,
    VerTramiteComponent,
    SolicitudPagosComponent,
    ListadoPagosComponent,
    ConfiguracionUsuariosComponent,
    RegistroCarpetasComponent,
    GestionPagosComponent,
    ListaAprobadosComponent,
    ListaRechazadosComponent,
    TariffComponent,
    // Components Informacion
    InformationTableClienteComponent,
    InformationTableEmpleadoComponent,
    InformationTableProveedorComponent,
    // Components modals seleccion
    SeleccionClienteComponent,
    // Components vista
    VistaListaClienteContactoComponent,
    VistaListaClientePlataformaComponent,
    VistaListaUsuarioContactoComponent,
    VistaUsuarioContactoTablaComponent,
    ClienteComponent,
    EmpleadoComponent,
    ProveedorComponent,
    ClienteContactoComponent,
    ClientePlataformaComponent,
    UsuarioContactoComponent,
    VistaListaUsuarioDocumentoComponent,
    UsuarioDocumentoComponent,
    UsuarioComponent,
    VistaClienteContactoTablaComponent,
    VistaClientePlataformaTablaComponent,
    VistaUsuarioDocumentoTablaComponent,
    // Components Modals - Edits
    EditClienteComponent,
    EditClienteContactoComponent,
    EditClientePlataformaComponent,
    EditProveedorComponent,
    EditEmpleadoComponent,
    EditUsuarioDocumentoComponent,
    EditUsuarioContactoComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatCardModule,
    MatCheckboxModule,
    NgxDropzoneModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatMenuModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatDialogModule,
    MatTabsModule,
    MatSnackBarModule,
    MatTooltipModule,
    NgxPrintModule,
    AutocompleteLibModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  providers: [
    CdkColumnDef,
    MatDatepickerModule,
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        display: {
          dateInput: 'YYYY-MM-DD',
        },
      },
    },
  ],
  exports: [HeaderFormComponent, ListadoPagosComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class PrincipalModule {}
