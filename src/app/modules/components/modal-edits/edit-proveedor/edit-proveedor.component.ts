import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CiudadService } from 'src/app/core/services/atributo/ciudad.service';
import { SwallAlertService } from 'src/app/core/services/Data/swall-alert.service';
import { ProveedorService } from 'src/app/core/services/usuario/proveedor.service';
import { Ciudad, Pais } from 'src/app/shared/models/Atributo/Ciudad';
import { RegistroProveedor } from 'src/app/shared/models/Usuario/Proveedor/RegistroProveedor';
import { ProveedorInfo } from '../../../../shared/models/Usuario/Proveedor/Proveedor';

@Component({
  selector: 'app-edit-proveedor',
  templateUrl: './edit-proveedor.component.html',
  styleUrls: ['./edit-proveedor.component.scss']
})
export class EditProveedorComponent implements OnInit {

  @ViewChild('formDirective') private formDirective: NgForm;
  registro: FormGroup;

  listaPais: Array<Pais> = [];
  listaCiudad: Array<Ciudad> = [];

  constructor(
    private fb: FormBuilder,
    private ciudadService: CiudadService,
    private proveedorService: ProveedorService,
    private swall: SwallAlertService,
    private dialog_ref: MatDialogRef<EditProveedorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {res: ProveedorInfo, replica: boolean}
  ) { }

  ngOnInit(): void {
    this.obtenerAtributos();
    this.registro = this.fb.group({
      direccion: [this.data.res.usuario.direccion, Validators.required],
      pais: [this.data.res.usuario.ciudad.pais.id, Validators.required],
      ciudad_id: [this.data.res.usuario.ciudad.id, Validators.required],
      razon_social: [this.data.res.razon_social, Validators.required],
      nit: [this.data.res.nit, Validators.required],
      tipo_proveedor: [this.data.res.tipo_proveedor, Validators.required],
      agencia: [this.data.res.agencia, Validators.required],
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
    let proveedor: RegistroProveedor = {
      username: this.registro.get('razon_social').value,
      password: this.registro.get('razon_social').value,
      direccion: this.registro.get('direccion').value,
      ciudad_id: this.registro.get('ciudad_id').value,
      creador_id: 1,
      razon_social: this.registro.get('razon_social').value,
      nit: this.registro.get('nit').value,
      tipo_proveedor: this.registro.get('tipo_proveedor').value,
      agencia: this.registro.get('agencia').value,
    }

    this.proveedorService.actualizarProveedor(proveedor, this.data.res.id).subscribe((res: any) => {
      this.registro.reset();
      this.formDirective.resetForm();
      this.swall.success('¡Actualizado!', 'Se actualizó de forma correcta.');
      this.dialog_ref.close(res);
    }, error => {
      this.swall.Error('¡Hubo un Error!', 'Tuvimos un problema al registrar...');
    })
  }

  replicar(){
    let proveedor: RegistroProveedor = {
      username: this.registro.get('razon_social').value,
      password: this.registro.get('razon_social').value,
      direccion: this.registro.get('direccion').value,
      ciudad_id: this.registro.get('ciudad_id').value,
      creador_id: 1,
      razon_social: this.registro.get('razon_social').value,
      nit: this.registro.get('nit').value,
      tipo_proveedor: this.registro.get('tipo_proveedor').value,
      agencia: this.registro.get('agencia').value,
    }

    this.proveedorService.registroProveedor(proveedor).subscribe((res: any) => {
      this.registro.reset();
      this.formDirective.resetForm();
      this.swall.success('¡Registrado!', 'Se insertó de forma correcta.');
      this.dialog_ref.close(res);
    }, error => {
      this.swall.Error('¡Hubo un Error!', 'Tuvimos un problema al registrar...');
    })
  }

}
