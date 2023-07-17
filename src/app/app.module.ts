import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatSortModule } from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { PopupProveedorComponent } from './popup-proveedor/popup-proveedor.component';
import { VistaPlatosComponent } from './vista-platos/vista-platos.component';
import { VentanaConfirmacionComponent } from './ventana-confirmacion/ventana-confirmacion.component';
import { PantallaVueltoComponent } from './pantalla-vuelto/pantalla-vuelto.component';
import { LoginComponent } from './login/login.component';




@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    AppRoutingModule,
    MatTableModule,
    MatSortModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    PopupProveedorComponent,
    VentanaConfirmacionComponent,
    PantallaVueltoComponent,
    LoginComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
