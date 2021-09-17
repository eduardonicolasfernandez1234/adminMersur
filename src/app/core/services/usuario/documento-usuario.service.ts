import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RegistroDocumentoUsuario } from '../../../shared/models/Usuario/RegistroDocumentoUsuario';

@Injectable({
  providedIn: 'root'
})
export class DocumentoUsuarioService {

  constructor(
    private http: HttpClient,
  ) { }

  registroDocumento(data: RegistroDocumentoUsuario, documento) {
    let formData = new FormData();
    formData.append('tipo', data.tipo.toString());
    formData.append('valor', data.valor);
    formData.append('fecha_documento', data.fecha_documento);
    formData.append('path_documento', documento);
    formData.append('usuario_id', data.usuario_id.toString());
    console.log(formData.get('path_documento'));
    const url = `${environment.BaseUrl}atributos/documentos/`;
    return this.http.post(url, formData);
  }

  actualizarDocumento(data: RegistroDocumentoUsuario, id, documento) {
    let formData = new FormData();
    if (documento) {
      formData.append('tipo', data.tipo.toString());
      formData.append('valor', data.valor);
      formData.append('fecha_documento', data.fecha_documento);
      formData.append('path_documento', documento);
      formData.append('usuario_id', data.usuario_id.toString());
    } else {
      formData.append('tipo', data.tipo.toString());
      formData.append('valor', data.valor);
      formData.append('fecha_documento', data.fecha_documento);
      formData.append('usuario_id', data.usuario_id.toString());
    }
    const url = `${environment.BaseUrl}atributos/documentos/${id}/`;
    return this.http.put(url, formData);
  }

  eliminarDocumento(id) {
    const url = `${environment.BaseUrl}atributos/documentos/${id}/`;
    return this.http.delete(url);
  }
}
