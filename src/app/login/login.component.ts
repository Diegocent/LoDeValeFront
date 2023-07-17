import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'app/service/usuario.service';
import { CanActivate, Router } from '@angular/router';
import { UsuariosService } from 'app/service/usuarios.service';
import { CierreService } from 'app/service/cierre.service';

declare interface Usuario{
  id:number;
  cedula:string;
  nombre:string;
  apellido:string;
  contraseña:string;
  CajaId:number;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usuario:string;
  password:string;
  condition:boolean;
  cajero:Usuario;
  defecto: Usuario ={
    id:0,
    cedula:"0",
    nombre:"0",
    apellido:"0",
    contraseña:"0",
    CajaId:0
  }

  ingreso:number;
  deja_en_caja:number;

  constructor(
    private router: Router,
    private usuarioService:UsuarioService,
    private usuariosService:UsuariosService,
    private cierreService:CierreService
  ) { }

  ngOnInit(){
    this.condition = this.usuarioService.obtenerCliente().CajaId==0;
    console.log(this.usuarioService.obtenerTotal())
    this.ingreso = this.usuarioService.obtenerTotal();
    console.log(this.ingreso)
  }

  confirmar(){
    this.usuariosService.obtenerPorCedula(this.usuario).subscribe(res=>{
      if(res[0].contraseña==this.password){
        let usuario :Usuario = {
          id:res[0].id,
          cedula:res[0].cedula,
          nombre:res[0].nombre,
          apellido:res[0].apellido,
          contraseña:res[0].contraseña,
          CajaId:res[0].CajaId
        } 
        this.usuarioService.anadirCliente(usuario);
        this.router.navigate(['/table'])
      }
    })
    // this.router.navigate(['/table'])
  }

  siguiente(event,text){
    text.focus();

  }
  guardarCierre(){
    this.cajero = this.usuarioService.obtenerCliente();
    let monto_parcial = this.ingreso - (this.deja_en_caja??0);
    console.log(
      "deja en caja: ",this.deja_en_caja,
      "\n ingresos totales:",this.ingreso,
      "cajero: ",this.cajero.id
    )
    if(this.deja_en_caja <= this.ingreso){
      var today = new Date();
      var dd = today.getDate();

      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();
      var dia = yyyy + '/' + mm + '/' +dd;
      // var dia= dd + '/'+mm+'/'+yyyy;
      var hour = today.getHours();
      var minute = today.getMinutes();
      var second = today.getSeconds();
      var hora = hour+':'+minute+':'+second;
      this.cierreService.create(
        {
          UsuarioId: this.cajero.id,
          monto_parcial: monto_parcial,
          monto_final: this.ingreso,
          en_caja: this.deja_en_caja,
          fecha: dia + ' ' + hora
        }
      ).subscribe(
        res => {
          console.log(res);
          this.usuarioService.cerrarSesion();
          window.location.reload()
        }
      );
      
    } else {
      alert("Verifique el monto que esta queriendo dejar en caja")
    }
  }
}
