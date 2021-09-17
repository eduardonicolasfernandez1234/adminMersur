import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CiudadService } from '../../../../core/services/atributo/ciudad.service';
import { SwallAlertService } from '../../../../core/services/Data/swall-alert.service';
import { EmpleadoService } from '../../../../core/services/usuario/empleado.service';
import { Pais, Ciudad } from '../../../../shared/models/Atributo/Ciudad';
import { RegistroEmpleado } from '../../../../shared/models/Usuario/Empleado/RegistroEmpleado';

@Component({
  selector: 'app-registro-empleado',
  templateUrl: './registro-empleado.component.html',
  styleUrls: ['./registro-empleado.component.scss']
})
export class RegistroEmpleadoComponent implements OnInit {
  
  @ViewChild('formDirective') private formDirective: NgForm;
  registro: FormGroup;

  listaPais: Array<Pais> = [];
  listaCiudad: Array<Ciudad> = [];

  constructor(
    private fb: FormBuilder,
    private ciudadService: CiudadService,
    private empleadoService: EmpleadoService,
    private swall: SwallAlertService
  ) { }

  ngOnInit(): void {
    this.registro = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      direccion: ['', Validators.required],
      pais: ['', Validators.required],
      ciudad_id: ['', Validators.required],
      nombre_completo: ['', Validators.required],
      ci: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      nacionalidad: ['', Validators.required],
      estado_civil: ['', Validators.required],
      interno: [false, Validators.required],
    });
    this.obtenerAtributos();
  }

  obtenerAtributos(){
    this.ciudadService.listaPaises().subscribe((res: any) => {
      this.listaPais = res;
    }, error =>{})
  }

  seleccionPaisCiudad(){
    let paisId = this.registro.get('pais')?.value;
    this.ciudadService.listaCiudadesPais(paisId).subscribe((res: any) => {
      this.listaCiudad = res;
    }, error => {})
  }

  registrar(){
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
      this.swall.success('¡Registrado!', 'Se insertó de forma correcta.');
    }, error => {
      this.swall.Error('¡Hubo un Error!', 'Tuvimos un problema al registrar...');
    })
  }

}
