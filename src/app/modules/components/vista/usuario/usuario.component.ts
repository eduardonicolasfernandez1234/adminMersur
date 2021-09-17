import { Component, OnInit, Input } from '@angular/core';
import { TIPO_USUARIO, Usuario } from '../../../../shared/models/Usuario/Usuario';
import { MomentService } from '../../../../core/services/Data/moment.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  @Input('Usuario') usuario: Usuario;

  constructor(
    public momentService: MomentService
  ) { }

  ngOnInit(): void {
  }

  obtenerTipoUsuario(tipo: number){
    return TIPO_USUARIO[tipo];
  }

}
