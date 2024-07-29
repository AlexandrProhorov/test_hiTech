import { Component, Input } from '@angular/core';
import { Pet } from 'src/app/entities/pet_entity';

@Component({
  selector: 'app-pet-info',
  templateUrl: './pet-info.component.html',
  styleUrls: ['./pet-info.component.scss']
})
export class PetInfoComponent {
  @Input() petInfo: Pet | null = null;
  constructor() {}

  onClose() {
    this.petInfo = null;
  }
}
