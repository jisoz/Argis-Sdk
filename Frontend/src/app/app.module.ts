import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { MapComponent } from './map/map.component';
import { BsDropdownModule} from 'ngx-bootstrap/dropdown'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
const appRoutes:Routes=[
{path: '', component: MapComponent},
{path: 'login', component: LoginComponent},
{path: 'register', component: RegisterComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
