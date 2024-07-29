import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet } from '../entities/pet_entity';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private apiUrl: string = 'https://petstore.swagger.io/v2/pet';

  constructor(private http: HttpClient) { }

  getPetsByStatus(status: string): Observable<any[]> {
    return this.http.get<Pet[]>(`${this.apiUrl}/findByStatus`, { params: { status } });
  }
}