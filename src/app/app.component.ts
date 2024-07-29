import { Component, HostListener, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Pet } from './entities/pet_entity';
import { PetService } from './data/data-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  pets: Pet[] = [];
  isResizing = false;
  clickedPet: Pet | null = null;
  resizer = document.querySelector('resizer');

  constructor(private petService: PetService) {}
  
  ngOnInit() {
    this.petService.getPetsByStatus('available').subscribe(
      (data: Pet[]) => {
        this.pets = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Ошибка при получении питомцев:', error);
      }
    );
  }

  onPetClicked(pet: Pet){
    console.log(pet.name);
    this.clickedPet = pet;
  }

  onMouseDown() {
    this.isResizing = true;
  }

  onMouseUp() {
    if(this.isResizing){
      this.isResizing = false;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isResizing) {
      const body = document.querySelector('.body');
      const petTable = document.querySelector('.pet-table') as HTMLElement;
      const petInfo = document.querySelector('.pet-info') as HTMLElement;

      if(body){
        const newWidth = event.clientX - body.getBoundingClientRect().left;

        if (newWidth > 100 && newWidth < body.clientWidth - 899) {
          petTable.style.width = `${newWidth}px`;
          petInfo.style.width = `${body.clientWidth - newWidth - 10}px`;
        }
      }
    }
  }

  getRows(): Pet[][] {
    const rows: Pet[][] = [];
    for (let i = 0; i < this.pets.length; i += 5) {
      rows.push(this.pets.slice(i, i + 5));
    }
    return rows;
  }
}
