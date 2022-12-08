import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'app/service/usuario.service';
import { CanActivate, Router } from '@angular/router';
import { UsuariosService } from 'app/service/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usuario:string;
  password:string;
  condition:boolean;

  ingreso:number;
  deja_en_caja:number;

  constructor(
    private router: Router,
    private usuarioService:UsuarioService,
    private usuariosService:UsuariosService
  ) { }

  ngOnInit(){
    this.condition = this.usuarioService.obtenerCliente()==undefined;
    console.log(this.usuarioService.obtenerTotal())
    this.ingreso = this.usuarioService.obtenerTotal();
    console.log(this.ingreso)
  }

  confirmar(){
    this.usuariosService.obtenerPorCedula(this.usuario).subscribe(res=>{
      if(res[0].contraseña==this.password){
        this.usuarioService.anadirCliente(res);
        this.router.navigate(['/table'])
      }
    })
    // this.router.navigate(['/table'])
  }

  siguiente(event,text){
    text.focus();

  }
  guardarCierre(){

  }
}
