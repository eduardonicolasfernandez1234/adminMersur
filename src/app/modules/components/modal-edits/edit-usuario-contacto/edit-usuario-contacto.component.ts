import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { SwallAlertService } from '../../../../core/services/Data/swall-alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactoUsuarioService } from '../../../../core/services/usuario/contacto-usuario.service';
import { RegistroContactoUsuario, ContactoUsuario } from '../../../../shared/models/Usuario/Usuario';

@Component({
  selector: 'app-edit-usuario-contacto',
  templateUrl: './edit-usuario-contacto.component.html',
  styleUrls: ['./edit-usuario-contacto.component.scss']
})
export class EditUsuarioContactoComponent implements OnInit {

  @ViewChild('formDirective') private formDirective: NgForm;
  registro: FormGroup;

  constructor(
    private fb: FormBuilder,
    private swall: SwallAlertService,
    private dialog_ref: MatDialogRef<EditUsuarioContactoComponent>,
    private contactoUsuarioService: ContactoUsuarioService,
    @Inject(MAT_DIALOG_DATA) public data: {res: ContactoUsuario, nuevo: false, usuario_id: number}
  ) { }

  ngOnInit(): void {
    this.cargarFormulario();
  }

  cargarFormulario(){
    if(this.data.nuevo){
      this.registro = this.fb.group({
        tipo_contacto: [null, Validators.required],
        valor: ['', Validators.required],
        usuario_id: [this.data.usuario_id, Validators.required],
      });
    }else{
      this.registro = this.fb.group({
        tipo_contacto: [this.data.res.tipo_contacto, Validators.required],
        valor: [this.data.res.valor, Validators.required],
        usuario_id: [this.data.res.usuario_id, Validators.required],
      });
    }
  }

  registrar(){
    let contacto: RegistroContactoUsuario = {
      tipo_contacto: this.registro.get('tipo_contacto').value,
      valor: this.registro.get('valor').value,
      usuario_id: this.registro.get('usuario_id').value,
    }

    this.contactoUsuarioService.registroContactoUsuario(contacto).subscribe((res: any) => {
      this.formDirective.resetForm();
      this.swall.success('¡Registrado!', 'Se insertó de forma correcta.');
      this.dialog_ref.close(res);
    }, error => {
      this.swall.Error('¡Hubo un Error!', 'Tuvimos un problema al registrar...');
    })
  }

  actualizar(){
    let contacto: RegistroContactoUsuario = {
      tipo_contacto: this.registro.get('tipo_contacto').value,
      valor: this.registro.get('valor').value,
      usuario_id: this.registro.get('usuario_id').value,
    }

    this.contactoUsuarioService.actualizarContactoUsuario(contacto, this.data.res.id).subscribe((res: any) => {
      this.formDirective.resetForm();
      this.swall.success('¡Registrado!', 'Se actualizó de forma correcta.');
      this.dialog_ref.close(res);
    }, error => {
      this.swall.Error('¡Hubo un Error!', 'Tuvimos un problema al registrar...');
    })
  }

}
