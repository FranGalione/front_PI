import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoAPComponent } from './components/logo-ap/logo-ap.component';
import { BannerComponent } from './components/banner/banner.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EducacionComponent } from './components/educacion/educacion.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { SkillsComponent } from './components/skills/skills.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { AcercaDeService } from './servicios/acerca-de.service';
import { AutenticacionService } from './servicios/autenticacion.service';
import { BannerService } from './servicios/banner.service';
import { EducacionService } from './servicios/educacion.service';
import { ExperienciaService } from './servicios/experiencia.service';
import { FooterService } from './servicios/footer.service';
import { ProyectosService } from './servicios/proyectos.service';
import { SkillsfService } from './servicios/skillsf.service';
import { SocialService } from './servicios/social.service';
import { InterceptorService } from './servicios/interceptor.service';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogoAPComponent,
    BannerComponent,
    AcercaDeComponent,
    ExperienciaComponent,
    EducacionComponent,
    SkillsComponent,
    FooterComponent,
    ProyectosComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgCircleProgressModule.forRoot({}),
  ],
  providers: [
    AcercaDeService,
    AutenticacionService,
    BannerService,
    EducacionService,
    ExperienciaService,
    FooterService,
    ProyectosService,
    SkillsfService,
    SocialService,
    InterceptorService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
