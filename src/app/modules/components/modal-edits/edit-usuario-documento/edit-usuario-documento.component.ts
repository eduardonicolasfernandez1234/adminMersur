import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SwallAlertService } from '../../../../core/services/Data/swall-alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentoUsuario, TIPODOCUMENTOUSUARIO } from '../../../../shared/models/Usuario/DocumentoUsuario';
import { ESTADO_LISTA } from '../../../../shared/models/Respuesta';
import { RegistroDocumentoUsuario } from '../../../../shared/models/Usuario/RegistroDocumentoUsuario';
import { DocumentoUsuarioService } from 'src/app/core/services/usuario/documento-usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-usuario-documento',
  templateUrl: './edit-usuario-documento.component.html',
  styleUrls: ['./edit-usuario-documento.component.scss']
})
export class EditUsuarioDocumentoComponent implements OnInit {

  @ViewChild('formDirective') private formDirective: NgForm;
  registro: FormGroup;
  file: File = null;

  constructor(
    private fb: FormBuilder,
    private swall: SwallAlertService,
    private documentoService: DocumentoUsuarioService,
    private snackBar: MatSnackBar,
    private dialog_ref: MatDialogRef<EditUsuarioDocumentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { res: DocumentoUsuario, estado: ESTADO_LISTA, usuario_id: number }
  ) { }

  ngOnInit(): void {
    if (this.data.estado == ESTADO_LISTA.registrar) {
      this.cargarFormularioVacio();
    } else if (this.data.estado == ESTADO_LISTA.actualizar) {
      this.cargarFormulario();
    } else if (this.data.estado == ESTADO_LISTA.replicar) {
      this.cargarFormulario();
    }
  }

  cargarFormularioVacio() {
    this.registro = this.fb.group({
      tipo: [1, Validators.required],
      valor: [''],
      fecha_documento: ['', Validators.required],
      path_documento: ['', Validators.required],
      usuario_id: [this.data.usuario_id, Validators.required]
    });
  }

  cargarFormulario() {
    this.registro = this.fb.group({
      tipo: [this.data.res.tipo, Validators.required],
      valor: [this.data.res.valor],
      fecha_documento: [this.data.res.fecha_documento, Validators.required],
      path_documento: [this.data.res.path_documento, Validators.required],
      usuario_id: [this.data.res.usuario_id, Validators.required]
    });
  }

  onSelect(event: any) {
    let file = event.addedFiles[0];
    if (file.type == 'application/pdf') {
      this.file = file;
      this.registro.get('path_documento').setValue(this.file);
    } else {
      console.log('El archivo debe ser en formato PDF');
      this.snackBar.open('El archivo debe ser en formato PDF', 'Aceptar');
      setTimeout(() => {
        this.snackBar.dismiss();
      }, 2500);
    }
  }

  onRemove(event: any) {
    console.log(event);
    this.registro.get('path_documento').setValue('');
    this.file = null;
  }

  obtenerValorRegistro(tipo: number) {
    if (tipo != 5) {
      return TIPODOCUMENTOUSUARIO[tipo]
    } else {
      return this.registro.get('valor').value;
    }
  }

  registrar() {
    let documentoUsuario: RegistroDocumentoUsuario = {
      tipo: this.registro.get('tipo').value,
      valor: this.obtenerValorRegistro(this.registro.get('tipo').value),
      fecha_documento: this.registro.get('fecha_documento').value,
      usuario_id: this.registro.get('usuario_id').value
    }
    this.documentoService.registroDocumento(documentoUsuario, this.file).subscribe((res: any) => {
      this.registro.reset();
      this.formDirective.resetForm();
      this.swall.success('¡Registrado!', 'Se insertó de forma correcta.');
      this.dialog_ref.close(res);
    }, error => {
      console.log(error);
      this.swall.Error('¡Hubo un Error!', 'Tuvimos un problema al registrar...');
    })
  }

  actualizar() {
    // var date_test = moment(this.registro.get('fecha_documento').value).format();
    // console.log(date_test);
    let documentoUsuario: RegistroDocumentoUsuario = {
      tipo: this.registro.get('tipo').value,
      valor: this.obtenerValorRegistro(this.registro.get('tipo').value),
      fecha_documento: this.registro.get('fecha_documento').value,
      usuario_id: this.registro.get('usuario_id').value
    }
    this.documentoService.actualizarDocumento(documentoUsuario, this.data.res.id, this.file).subscribe((res: any) => {
      this.registro.reset();
      this.formDirective.resetForm();
      this.swall.success('¡Registrado!', 'Se insertó de forma correcta.');
      this.dialog_ref.close(res);
    }, error => {
      console.log(error);
      this.swall.Error('¡Hubo un Error!', 'Tuvimos un problema al registrar...');
    })
  }

  replicar() { }
}
