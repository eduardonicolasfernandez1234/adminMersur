import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, NgForm, FormGroup } from '@angular/forms';
import { Pais } from 'src/app/shared/models/Atributo/Ciudad';
import { CiudadService } from '../../../../core/services/atributo/ciudad.service';
import { Ciudad } from '../../../../shared/models/Atributo/Ciudad';
import { ClienteService } from '../../../../core/services/usuario/cliente.service';
import { SwallAlertService } from '../../../../core/services/Data/swall-alert.service';
import { RegistroCliente } from 'src/app/shared/models/Usuario/Cliente/RegistroCliente';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.scss']
})
export class RegistroClienteComponent implements OnInit {

  @ViewChild('formDirective') private formDirective: NgForm;
  registro: FormGroup;

  listaPais: Array<Pais> = [];
  listaCiudad: Array<Ciudad> = [];

  constructor(
    private fb: FormBuilder,
    private ciudadService: CiudadService,
    private clienteService: ClienteService,
    private swall: SwallAlertService
  ) { }

  ngOnInit(): void {
    this.cargarFormulario();
    this.obtenerAtributos();
  }

  cargarFormulario(){
    this.registro = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      direccion: ['', Validators.required],
      pais: ['', Validators.required],
      ciudad_id: ['', Validators.required],
      razon_social: ['', Validators.required],
      identificacion_tributaria: ['', Validators.required],
      representante_legal: [null],
      // Informacion complementaria II
      referencia_comercial: [null],
      certificaciones: [null],
      productos_importacion: [null],
      origen_importacion: [null],
      proveedores_logisticos: [null],
      resultado_cnat: [null],
    });
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
    let cliente: RegistroCliente = {
      username: this.registro.get('username').value,
      password: this.registro.get('password').value,
      razon_social: this.registro.get('razon_social').value,
      identificacion_tributaria: this.registro.get('identificacion_tributaria').value,
      representante_legal: this.registro.get('representante_legal').value,
      direccion: this.registro.get('direccion').value,
      ciudad_id: this.registro.get('ciudad_id').value,
      creador_id: 1,
      referencia_comercial: this.registro.get('referencia_comercial').value,
      certificaciones: this.registro.get('certificaciones').value,
      productos_importacion: this.registro.get('productos_importacion').value,
      origen_importacion: this.registro.get('origen_importacion').value,
      proveedores_logisticos: this.registro.get('proveedores_logisticos').value,
      resultado_cnat: this.registro.get('resultado_cnat').value
    }

    this.clienteService.registroCliente(cliente).subscribe((res: any) => {
        this.formDirective.resetForm();
        this.swall.success('¡Registrado!', 'Se insertó de forma correcta.');
    }, error => {
      console.log(error);
      this.swall.Error('¡Hubo un Error!', 'Tuvimos un problema al registrar...');
    })
  }

}
