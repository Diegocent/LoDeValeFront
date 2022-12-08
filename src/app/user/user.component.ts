import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientesService } from 'app/service/clientes.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  nombre:string;
  apellido:string;
  documento:string;
  direccion:string;
  constructor(
    private clientesService : ClientesService,
    public dialogRef: MatDialogRef<UserComponent>

  ) { }

  ngOnInit() {

  }
  cambiarvalor(){
    this.clientesService.create({
      cedula: this.documento,
      nombre: this.nombre,
      apellido: this.apellido,
      direccion: this.direccion,
    }).subscribe((data)=>{
      this.dialogRef.close(data);
      console.log(data);
      this.documento= '';
      this.nombre = '';
      this.apellido = '';
      this.direccion= '';
    })  
  }
  onClickNO(){
    this.dialogRef.close(false);
  }
  cambiar(event,text){
    text.focus();
  }
}
