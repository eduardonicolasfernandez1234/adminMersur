import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CiudadService } from 'src/app/core/services/atributo/ciudad.service';
import { SwallAlertService } from 'src/app/core/services/Data/swall-alert.service';
import { EmpleadoService } from 'src/app/core/services/usuario/empleado.service';
import { Ciudad, Pais } from 'src/app/shared/models/Atributo/Ciudad';
import { RegistroEmpleado } from 'src/app/shared/models/Usuario/Empleado/RegistroEmpleado';
import { EmpleadoInfo } from '../../../../shared/models/Usuario/Empleado/Empleado';

@Component({
  selector: 'app-edit-empleado',
  templateUrl: './edit-empleado.component.html',
  styleUrls: ['./edit-empleado.component.scss']
})
export class EditEmpleadoComponent implements OnInit {

  @ViewChild('formDirective') private formDirective: NgForm;
  registro: FormGroup;

  listaPais: Array<Pais> = [];
  listaCiudad: Array<Ciudad> = [];

  constructor(
    private fb: FormBuilder,
    private ciudadService: CiudadService,
    private empleadoService: EmpleadoService,
    private swall: SwallAlertService,
    private dialog_ref: MatDialogRef<EditEmpleadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {res: EmpleadoInfo, replica: boolean}
  ) { }

  ngOnInit(): void {
    this.obtenerAtributos();
    this.registro = this.fb.group({
      username: [this.data.res.usuario.username, Validators.required],
      password: [, Validators.required],
      direccion: [this.data.res.usuario.direccion, Validators.required],
      pais: [this.data.res.usuario.ciudad.pais.id, Validators.required],
      ciudad_id: [this.data.res.usuario.ciudad.id, Validators.required],
      nombre_completo: [this.data.res.nombre_completo, Validators.required],
      ci: [this.data.res.ci, Validators.required],
      fecha_nacimiento: [this.data.res.fecha_nacimiento, Validators.required],
      nacionalidad: [this.data.res.nacionalidad, Validators.required],
      estado_civil: [this.data.res.estado_civil, Validators.required],
      interno: [this.data.res.interno, Validators.required],
    });
  }

  obtenerAtributos(){
    this.ciudadService.listaPaises().subscribe((res: any) => {
      this.listaPais = res;
    }, error =>{})
    this.ciudadService.listaCiudades().subscribe((res: any) => {
      this.listaCiudad = res;
    }, error =>{})
  }

  seleccionPaisCiudad(){
    let paisId = this.registro.get('pais')?.value;
    this.ciudadService.listaCiudadesPais(paisId).subscribe((res: any) => {
      this.listaCiudad = res;
    }, error => {})
  }

  actualizar(){
    let empleado: RegistroEmpleado = {
      username: this.registro.get('username').value,
      password: this.registro.get('password').value,
      direccion: this.registro.get('direccion').value,
      ciudad_id: this.registro.get('ciudad_id').value,
      creador_id: 1,
      nombre_completo: this.registro.get('nombre_completo').value,
      ci: this.registro.get('ci').value,
      fecha_nacimiento: this.registro.get('fecha_nacimiento').value,
      nacionalidad: this.registro.get('nacionalidad').value,
      estado_civil: this.registro.get('estado_civil').value,
      interno: this.registro.get('interno').value,
    }

    this.empleadoService.actualizarEmpleado(empleado, this.data.res.id).subscribe((res: any) => {
      this.registro.reset();
      this.formDirective.resetForm();
      this.swall.success('¡Actualizado!', 'Se actualizó de forma correcta.');
      this.dialog_ref.close(res);
    }, error => {
      this.swall.Error('¡Hubo un Error!', 'Tuvimos un problema al registrar...');
    })
  }

  replicar(){
    console.log(this.registro.value);
    let empleado: RegistroEmpleado = {
      username: this.registro.get('username').value,
      password: this.registro.get('password').value,
      direccion: this.registro.get('direccion').value,
      ciudad_id: this.registro.get('ciudad_id').value,
      creador_id: 1,
      nombre_completo: this.registro.get('nombre_completo').value,
      ci: this.registro.get('ci').value,
      fecha_nacimiento: this.registro.get('fecha_nacimiento').value,
      nacionalidad: this.registro.get('nacionalidad').value,
      estado_civil: this.registro.get('estado_civil').value,
      interno: this.registro.get('interno').value,
    }

    this.empleadoService.registroEmpleado(empleado).subscribe((res: any) => {
      this.registro.reset();
      this.formDirective.resetForm();
      this.swall.success('¡Registrado!', 'Se insertó de forma correcta.');
      this.dialog_ref.close(res);
    }, error => {
      console.log(error);
      this.swall.Error('¡Hubo un Error!', 'Tuvimos un problema al registrar...');
    })
  }

}
