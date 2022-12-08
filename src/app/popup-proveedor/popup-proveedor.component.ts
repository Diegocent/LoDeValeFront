import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProveedoresService } from 'app/service/proveedores.service'

@Component({
  selector: 'app-popup-proveedor',
  templateUrl: './popup-proveedor.component.html',
  styleUrls: ['./popup-proveedor.component.scss']
})
export class PopupProveedorComponent implements OnInit {
  dato:string='funciona';

  empresa:string;
  documento:string;

  constructor(public dialogRef: MatDialogRef<PopupProveedorComponent>,
    private proveedoresService: ProveedoresService) { }

  ngOnInit(): void {
  }

  onClickNO(){
    this.dialogRef.close(false);
  }

  guardarProveedor(){
    if(this.documento!='nul' && this.empresa!=''){
      let dato = {
        ruc:  this.documento,
        empresa: this.empresa
      }
      this.proveedoresService.create(dato).subscribe(res=>{
        console.log(res);
        this.dialogRef.close(true);
      });
    }
  }
}
