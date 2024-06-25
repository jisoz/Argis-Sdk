import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
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
import { TrainingComponent } from './training/training.component';
import { Train2Component } from './train2/train2.component';
import { NgxCsvParserModule } from 'ngx-csv-parser';
const appRoutes:Routes=[
{path: '', component: MapComponent},
{path: 'login', component: LoginComponent},
{path: 'register', component: RegisterComponent},
{path: 'train1', component: TrainingComponent },
{path: 'train2', component: Train2Component}
]

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    MapComponent,
    TrainingComponent,
    Train2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxCsvParserModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
