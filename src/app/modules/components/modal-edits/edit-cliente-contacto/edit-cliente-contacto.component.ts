import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ClienteService } from '../../../../core/services/usuario/cliente.service';
import { SwallAlertService } from '../../../../core/services/Data/swall-alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ClienteContacto } from 'src/app/shared/models/Usuario/Cliente/Cliente';
import { RegistroClienteContacto } from '../../../../shared/models/Usuario/Cliente/Cliente';

@Component({
  selector: 'app-edit-cliente-contacto',
  templateUrl: './edit-cliente-contacto.component.html',
  styleUrls: ['./edit-cliente-contacto.component.scss']
})
export class EditClienteContactoComponent implements OnInit {

  @ViewChild('formDirective') private formDirective: NgForm;
  registro: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private swall: SwallAlertService,
    private dialog_ref: MatDialogRef<EditClienteContactoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {res: ClienteContacto, nuevo: false, cliente_id: number}
  ) { }

  ngOnInit(): void {
    this.cargarFormulario();
  }

  cargarFormulario(){
    if(this.data.nuevo){
      this.registro = this.fb.group({
        nombre_completo: [null, Validators.required],
        tipo: [null, Validators.required],
        telefono: [null, Validators.required],
        email: [null, Validators.required],
        cliente_id: [this.data.cliente_id, Validators.required],
        acceso_crm: [null, Validators.required],
      });
    }else{
      this.registro = this.fb.group({
        nombre_completo: [this.data.res.nombre_completo, Validators.required],
        tipo: [this.data.res.tipo, Validators.required],
        telefono: [this.data.res.telefono, Validators.required],
        email: [this.data.res.email, Validators.required],
        cliente_id: [this.data.res.cliente_id, Validators.required],
        acceso_crm: [this.data.res.acceso_crm, Validators.required],
      });
    }
  }

  registrar(){
    let contacto: RegistroClienteContacto = {
      nombre_completo: this.registro.get('nombre_completo').value,
      tipo: this.registro.get('tipo').value,
      telefono: this.registro.get('telefono').value,
      email: this.registro.get('email').value,
      acceso_crm: this.registro.get('acceso_crm').value,
      cliente_id: this.registro.get('cliente_id').value,
    }

    this.clienteService.registroContactoCliente(contacto).subscribe((res: any) => {
      this.formDirective.resetForm();
      this.swall.success('¡Registrado!', 'Se insertó de forma correcta.');
      this.dialog_ref.close(res);
    }, error => {
      this.swall.Error('¡Hubo un Error!', 'Tuvimos un problema al registrar...');
    })
  }

  actualizar(){
    let contacto: RegistroClienteContacto = {
      nombre_completo: this.registro.get('nombre_completo').value,
      tipo: this.registro.get('tipo').value,
      telefono: this.registro.get('telefono').value,
      email: this.registro.get('email').value,
      acceso_crm: this.registro.get('acceso_crm').value,
      cliente_id: this.registro.get('cliente_id').value,
    }

    this.clienteService.actualizarContactoCliente(contacto, this.data.res.id).subscribe((res: any) => {
      this.formDirective.resetForm();
      this.swall.success('¡Registrado!', 'Se actualizó de forma correcta.');
      this.dialog_ref.close(res);
    }, error => {
      this.swall.Error('¡Hubo un Error!', 'Tuvimos un problema al registrar...');
    })
  }

}
