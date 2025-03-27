import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pistolet } from 'src/app/Modeles/Pistolet';

@Injectable({
  providedIn: 'root'
})
export class PistoletPneumatiqueService {
  private apiUrl = 'http://localhost:8281/operations/pistolet'; 

  constructor(private http: HttpClient) {}

  ajouterPistolet(matricule: number, pistolet: Pistolet): Observable<Pistolet> {
    const token = localStorage.getItem('token');
    return this.http.post<Pistolet>(`${this.apiUrl}/ajouterPDEK/${matricule}`, pistolet,
       {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  }

  // Obtenir le dernier numéro de cycle
  getLastNumeroCycle(
    sectionFilSelectionne: string,
    segment: number,
    nomPlant: string,
    projetName: string
  ): Observable<number | null> {
    return this.http.get<number | null>(
      `${this.apiUrl}/dernier-numero-cycle?sectionFil=${sectionFilSelectionne}&segment=${segment}&plant=${nomPlant}&projet=${projetName}`
    );
  }
}
