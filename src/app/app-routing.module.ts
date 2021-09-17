import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { ListaClienteComponent } from './modules/Agenda/clientes/lista-cliente/lista-cliente.component';
import { RegistroClienteComponent } from './modules/Agenda/clientes/registro-cliente/registro-cliente.component';
import { ListaEmpleadoComponent } from './modules/Agenda/empleados/lista-empleado/lista-empleado.component';
import { RegistroEmpleadoComponent } from './modules/Agenda/empleados/registro-empleado/registro-empleado.component';
import { ListaProveedorComponent } from './modules/Agenda/proveedores/lista-proveedor/lista-proveedor.component';
import { RegistroProveedorComponent } from './modules/Agenda/proveedores/registro-proveedor/registro-proveedor.component';
import { AperturaBloqueComponent } from './modules/Herramienta/apertura-bloque/apertura-bloque.component';
import { AutoFillerComponent } from './modules/Herramienta/auto-filler/auto-filler.component';
import { DashboardComponent } from './modules/Home/dashboard/dashboard.component';
import { EntregaDocComponent } from './modules/Home/documentos/entrega-doc/entrega-doc.component';
import { ListaPlazoComponent } from './modules/Home/plazos/lista-plazo/lista-plazo.component';
import { RegistroPlazoComponent } from './modules/Home/plazos/registro-plazo/registro-plazo.component';
import { ListaTramiteComponent } from './modules/Home/tramites/lista-tramite/lista-tramite.component';
import { RegistroTramiteComponent } from './modules/Home/tramites/registro-tramite/registro-tramite.component';
import { VerTramiteComponent } from './modules/Home/tramites/ver-tramite/ver-tramite.component';
import { ListaNotificacionComponent } from './modules/Notificacion/lista-notificacion/lista-notificacion.component';

import { PrincipalComponent } from './modules/principal/principal.component';
import { ListaIncidenciaComponent } from './modules/Sgc/lista-incidencia/lista-incidencia.component';
import { RegistroIncidenciaComponent } from './modules/Sgc/registro-incidencia/registro-incidencia.component';
import { SolicitudPagosComponent } from './modules/Gestion/solicitud-pagos/solicitud-pagos.component';
import { ListadoPagosComponent } from './modules/Gestion/listado-pagos/listado-pagos.component';
import { ConfiguracionUsuariosComponent } from './modules/Notificacion/configuracion-usuarios/configuracion-usuarios.component';
import { RegistroCarpetasComponent } from './modules/Gestion/registro-carpetas/registro-carpetas.component';
import { GestionPagosComponent } from './modules/Finanza/gestion-pagos/gestion-pagos.component';
import { TariffComponent } from './modules/Herramienta/tariff/tariff.component';

const routes: Routes = [
  {
    path: 'principal',
    component: PrincipalComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: {animation: 'isRight'}
      },
      {
        path: 'tramite/registro',
        component: RegistroTramiteComponent,
        data: {animation: 'isLeft'}
      },
      {
        path: 'tramite/lista',
        component: ListaTramiteComponent,
        data: {animation: 'isRight'}
      },
      {
        path: 'tramite/:id',
        component: VerTramiteComponent,
        data: {animation: 'isLeft'}
      },
      {
        path: 'plazo/registro',
        component: RegistroPlazoComponent,
        data: {animation: 'isRight'}
      },
      {
        path: 'plazo/lista',
        component: ListaPlazoComponent,
        data: {animation: 'isLeft'}
      },
      {
        path: 'empleado/registro',
        component: RegistroEmpleadoComponent,
        data: {animation: 'isRight'}
      },
      {
        path: 'empleado/lista',
        component: ListaEmpleadoComponent,
        data: {animation: 'isLeft'}
      },
      {
        path: 'proveedor/registro',
        component: RegistroProveedorComponent,
        data: {animation: 'isRight'}
      },
      {
        path: 'proveedor/lista',
        component: ListaProveedorComponent,
        data: {animation: 'isLeft'}
      },
      {
        path: 'cliente/registro',
        component: RegistroClienteComponent,
        data: {animation: 'isRight'}
      },
      {
        path: 'cliente/lista',
        component: ListaClienteComponent,
        data: {animation: 'isLeft'}
      },
      {
        path: 'incidencia/registro',
        component: RegistroIncidenciaComponent,
        data: {animation: 'isRight'}
      },
      {
        path: 'incidencia/lista',
        component: ListaIncidenciaComponent,
        data: {animation: 'isLeft'}
      },
      {
        path: 'documento/entrega',
        component: EntregaDocComponent,
        data: {animation: 'isRight'}
      },
      {
        path: 'herramienta/autofiller',
        component: AutoFillerComponent,
        data: {animation: 'isLeft'}
      },
      {
        path: 'herramienta/bloque',
        component: AperturaBloqueComponent,
        data: {animation: 'isRight'}
      },
      {
        path: 'herramienta/tariff',
        component: TariffComponent,
        data: {animation: 'isRight'}
      },
      {
        path: 'notificacion/lista',
        component: ListaNotificacionComponent,
        data: {animation: 'isRight'}
      },
      {
        path: 'gestion/solicitud-pago',
        component: SolicitudPagosComponent,
        data: {animation: 'isRight'}
      },
      {
        path: 'gestion/listado-pago',
        component: ListadoPagosComponent,
        data: {animation: 'isRight'}
      },
      {
        path: 'finanza/gestion-pagos',
        component: GestionPagosComponent
      },
      {
        path: 'notificacion/configuracion-usuarios',
        component: ConfiguracionUsuariosComponent,
        data: {animation: 'isRight'}
      },
      {
        path: 'gestion/registro-carpeta',
        component: RegistroCarpetasComponent,
        data: {animation: 'isRight'}
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '', redirectTo: 'login', pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
