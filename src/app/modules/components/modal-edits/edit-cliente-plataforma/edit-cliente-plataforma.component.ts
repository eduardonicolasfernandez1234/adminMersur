import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../../../../core/services/usuario/cliente.service';
import { SwallAlertService } from '../../../../core/services/Data/swall-alert.service';
import { ClientePlataforma, RegistroClientePlataforma } from '../../../../shared/models/Usuario/Cliente/Cliente';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-cliente-plataforma',
  templateUrl: './edit-cliente-plataforma.component.html',
  styleUrls: ['./edit-cliente-plataforma.component.scss']
})
export class EditClientePlataformaComponent implements OnInit {

  @ViewChild('formDirective') private formDirective: NgForm;
  registro: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private swall: SwallAlertService,
    private dialog_ref: MatDialogRef<EditClientePlataformaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {res: ClientePlataforma, nuevo: boolean, cliente_id: number}
  ) { }

  ngOnInit(): void {
    this.cargarFormulario();
  }

  cargarFormulario(){
    if(this.data.nuevo){
      this.registro = this.fb.group({
        nombre_plataforma: [null, Validators.required],
        usuario: [null, Validators.required],
        password: [null, Validators.required],
        token: [null],
        cliente_id: [this.data.cliente_id, Validators.required],
      });
    }else{
      this.registro = this.fb.group({
        nombre_plataforma: [this.data.res.nombre_plataforma, Validators.required],
        usuario: [this.data.res.usuario, Validators.required],
        password: [this.data.res.password, Validators.required],
        token: [this.data.res.token],
        cliente_id: [this.data.cliente_id, Validators.required],
      });
    }
  }

  registrar(){
    let plataforma: RegistroClientePlataforma = {
      nombre_plataforma: this.registro.get('nombre_plataforma').value,
      usuario: this.registro.get('usuario').value,
      password: this.registro.get('password').value,
      token: this.registro.get('token').value,
      cliente_id: this.registro.get('cliente_id').value,
    }

    this.clienteService.registroPlataformaCliente(plataforma).subscribe((res: any) => {
      this.formDirective.resetForm();
      this.swall.success('¡Registrado!', 'Se insertó de forma correcta.');
      this.dialog_ref.close(res);
    }, error => {
      this.swall.Error('¡Hubo un Error!', 'Tuvimos un problema al registrar...');
    })
  }

  actualizar(){
    let plataforma: RegistroClientePlataforma = {
      nombre_plataforma: this.registro.get('nombre_plataforma').value,
      usuario: this.registro.get('usuario').value,
      password: this.registro.get('password').value,
      token: this.registro.get('token').value,
      cliente_id: this.registro.get('cliente_id').value,
    }

    this.clienteService.actualizarPlataformaCliente(plataforma, this.data.res.id).subscribe((res: any) => {
      this.formDirective.resetForm();
      this.swall.success('¡Registrado!', 'Se actualizó de forma correcta.');
      this.dialog_ref.close(res);
    }, error => {
      this.swall.Error('¡Hubo un Error!', 'Tuvimos un problema al registrar...');
    })
  }

}
