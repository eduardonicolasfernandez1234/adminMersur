import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CiudadService } from 'src/app/core/services/atributo/ciudad.service';
import { SwallAlertService } from 'src/app/core/services/Data/swall-alert.service';
import { ClienteService } from 'src/app/core/services/usuario/cliente.service';
import { Ciudad, Pais } from 'src/app/shared/models/Atributo/Ciudad';
import { RegistroCliente } from 'src/app/shared/models/Usuario/Cliente/RegistroCliente';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteInfo } from '../../../../shared/models/Usuario/Cliente/Cliente';

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.scss']
})
export class EditClienteComponent implements OnInit {

  @ViewChild('formDirective') private formDirective: NgForm;
  registro: FormGroup;
  files: Array<File> = [];
  formData = new FormData();

  listaPais: Array<Pais> = [];
  listaCiudad: Array<Ciudad> = [];

  constructor(
    private fb: FormBuilder,
    private ciudadService: CiudadService,
    private clienteService: ClienteService,
    private swall: SwallAlertService,
    private dialog_ref: MatDialogRef<EditClienteComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { res: ClienteInfo, replica: boolean }
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.obtenerAtributos();
    this.cargarFormulario();
  }

  cargarFormulario(){
    this.registro = this.fb.group({
      username: [this.data.res.usuario.username, Validators.required],
      password: ['', Validators.required],
      direccion: [this.data.res.usuario.direccion, Validators.required],
      pais: [this.data.res.usuario.ciudad.pais.id, Validators.required],
      ciudad_id: [this.data.res.usuario.ciudad.id, Validators.required],
      razon_social: [this.data.res.razon_social, Validators.required],
      identificacion_tributaria: [this.data.res.identificacion_tributaria, Validators.required],
      representante_legal: [this.data.res.representante_legal],
      // Informacion complementaria II
      referencia_comercial: [this.data.res.referencia_comercial],
      certificaciones: [this.data.res.certificaciones],
      productos_importacion: [this.data.res.productos_importacion],
      origen_importacion: [this.data.res.origen_importacion],
      proveedores_logisticos: [this.data.res.proveedores_logisticos],
      resultado_cnat: [this.data.res.resultado_cnat],
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

    this.clienteService.actualizarCliente(cliente, this.data.res.id).subscribe((cliente: any) => {
      this.formDirective.resetForm();
      this.swall.success('¡Registrado!', 'Se insertó de forma correcta.');
      console.log(cliente);
      this.dialog_ref.close(cliente);
    }, error => {
      this.swall.Error('¡Hubo un Error!', 'Tuvimos un problema al registrar...');
    })
  }

  replicar(){
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
      this.registro.reset();
      this.formDirective.resetForm();
      this.swall.success('¡Registrado!', 'Se insertó de forma correcta.');
      this.dialog_ref.close({});
    }, error => {
      console.log(error);
      this.swall.Error('¡Hubo un Error!', 'Tuvimos un problema al registrar...');
    })
  }

}
