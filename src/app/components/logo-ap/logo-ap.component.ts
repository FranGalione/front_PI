import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Persona } from 'src/app/models/persona';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { SocialService } from 'src/app/servicios/social.service';

@Component({
  selector: 'app-logo-ap',
  templateUrl: './logo-ap.component.html',
  styleUrls: ['./logo-ap.component.css']
})
export class LogoAPComponent {
  form: FormGroup;
  name: string | undefined;
  public persona : Persona | undefined;
  public editPersona: Persona | undefined;

  constructor(private socialService :  SocialService, public autenticacionService: AutenticacionService,private formBuilder: FormBuilder,
    private ruta: Router) {
      this.form = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5)]],
      });
    }

    isloged = () => this.autenticacionService.loggedIn();

  ngOnInit(): void {
    this.getUser();
  }

  public getUser():void{
    this.socialService.getUser().subscribe({
      next: (response: Persona) =>{
        this.persona=response;
      },
      error:(error:HttpErrorResponse) =>{
        alert(error.message);
      }
    })
  }

  get Email() {
    return this.form.get('email');
  }
  get Password() {
    return this.form.get('password');
  }

  onEnviar(event: Event) {
    if (this.form.invalid) {
      alert('Mal logueado');
      return;
    }
    event.preventDefault;
    this.autenticacionService
      .IniciarSesion(this.form.value)
      .subscribe((data) => {
        this.ruta.navigate(['/portfolio']);
      });
  }

  handleClear() {
    this.name = '';
  }

  public onOpenModal(mode: String, Persona?: Persona): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    this.editPersona = this.persona;
      button.setAttribute('data-bs-target', '#editPersonaModal');

      container?.appendChild(button);
      button.click();
  }
}
