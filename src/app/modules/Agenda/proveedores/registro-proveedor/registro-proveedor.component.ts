import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm, FormBuilder, Validators } from '@angular/forms';
import { ProveedorService } from '../../../../core/services/usuario/proveedor.service';
import { CiudadService } from '../../../../core/services/atributo/ciudad.service';
import { SwallAlertService } from '../../../../core/services/Data/swall-alert.service';
import { Pais, Ciudad } from '../../../../shared/models/Atributo/Ciudad';
import { RegistroProveedor } from '../../../../shared/models/Usuario/Proveedor/RegistroProveedor';

@Component({
  selector: 'app-registro-proveedor',
  templateUrl: './registro-proveedor.component.html',
  styleUrls: ['./registro-proveedor.component.scss']
})
export class RegistroProveedorComponent implements OnInit {

  @ViewChild('formDirective') private formDirective: NgForm;
  registro: FormGroup;

  listaPais: Array<Pais> = [];
  listaCiudad: Array<Ciudad> = [];

  constructor(
    private fb: FormBuilder,
    private ciudadService: CiudadService,
    private proveedorService: ProveedorService,
    private swall: SwallAlertService
  ) { }

  ngOnInit(): void {
    this.registro = this.fb.group({
      direccion: ['', Validators.required],
      pais: ['', Validators.required],
      ciudad_id: ['', Validators.required],
      razon_social: ['', Validators.required],
      nit: ['', Validators.required],
      tipo_proveedor: ['', Validators.required],
      agencia: ['', Validators.required],
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
      this.swall.success('¡Registrado!', 'Se insertó de forma correcta.');
    }, error => {
      this.swall.Error('¡Hubo un Error!', 'Tuvimos un problema al registrar...');
    })
  }

}
