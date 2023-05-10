import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { FooterService } from 'src/app/servicios/footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  
  public persona : Persona | undefined;
  public editPersona: Persona | undefined;

  constructor(private footerService : FooterService ) { }

  ngOnInit(): void {
    this.getUser();
  }

  public getUser():void{
    this.footerService.getUser().subscribe({
      next: (response: Persona) =>{
        this.persona=response;
      },
      error:(error:HttpErrorResponse) =>{
        alert(error.message);
      }
    })
  }

}
