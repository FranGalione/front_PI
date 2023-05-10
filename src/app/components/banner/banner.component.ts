import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { BannerService } from 'src/app/servicios/banner.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {

  public persona : Persona | undefined;
  public editPersona: Persona | undefined;

  constructor(private bannerService : BannerService ) { }

  ngOnInit(): void {
    this.getUser();
  }

  public getUser():void{
    this.bannerService.getUser().subscribe({
      next: (response: Persona) =>{
        this.persona=response;
      },
      error:(error:HttpErrorResponse) =>{
        alert(error.message);
      }
    })
  }

}
