import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { AcercaDeService } from 'src/app/servicios/acerca-de.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent {

  public persona : Persona | undefined;
  public editPersona: Persona | undefined;

  constructor(private acercaDeService : AcercaDeService, public autenticacionService: AutenticacionService ) { }

  isloged = () => this.autenticacionService.loggedIn();
  
  ngOnInit(): void {
    this.getUser();
  }

  public getUser():void{
    this.acercaDeService.getUser().subscribe({
      next: (response: Persona) =>{
        this.persona=response;
      },
      error:(error:HttpErrorResponse) =>{
        alert(error.message);
      }
    })
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

  public onUpdatePersona(persona: Persona): void {
    this.editPersona = persona;
    this.acercaDeService.updatePersona(persona).subscribe({
      next:(response:Persona)=>{
        console.log(response);
        this.getUser();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      },
    });
  }

}
