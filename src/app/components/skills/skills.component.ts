import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SkillsF } from 'src/app/models/skillsf';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { SkillsfService } from 'src/app/servicios/skillsf.service';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  public skillsfront:SkillsF[]=[];
  public editSkillsfront: SkillsF | undefined;
  public deleteSkillsfront: SkillsF | undefined;
  
  constructor(private skillsfService:SkillsfService, public autenticacionService: AutenticacionService) {}
  
  isloged = () => this.autenticacionService.loggedIn();

  ngOnInit(): void {
    this.getSkillsfront();
  }

  public getSkillsfront():void{
    this.skillsfService.getSkillsF().subscribe({
      next:(Response:SkillsF[])=>{
        this.skillsfront=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  public onOpenModal(mode: String, skillsf?: SkillsF): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addSkillsFModal');
    } else if (mode === 'delete') {
      this.deleteSkillsfront = skillsf;
      button.setAttribute('data-bs-target', '#deleteSkillsFModal');
    } else if (mode === 'edit') {
      this.editSkillsfront = skillsf;
      button.setAttribute('data-bs-target', '#editSkillsFModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onAddSkillsfront(addForm: NgForm): void {
    document.getElementById('add-skillsfront-form')?.click();
    this.skillsfService.addSkillsF(addForm.value).subscribe({
      next:(response:SkillsF) => {
        console.log(response);
        this.getSkillsfront();
        addForm.reset();
      },
      error:(error:HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      },
    });
  }

  public onUpdateSkillsfront(skillsf: SkillsF): void {
    this.editSkillsfront = skillsf;
    this.skillsfService.updateSkillsF(skillsf).subscribe({
      next:(response:SkillsF)=>{
        console.log(response);
        this.getSkillsfront();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      },
    });
  }

  public onDeleteSkillsfront(idSkillf: number):void{
    this.skillsfService.deleteSkillsF(idSkillf).subscribe({
      next:(response:void)=>{
        console.log(response);
        this.getSkillsfront();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      },
    });
  }
}
