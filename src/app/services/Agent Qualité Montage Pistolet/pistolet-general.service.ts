import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pistolet } from 'src/app/Modeles/Pistolet';

@Injectable({
  providedIn: 'root'
})
export class PistoletGeneralService {

  constructor(private http: HttpClient) {}

  getDernierNumeroCycle(typePistolet: string, numPistolet: number, categorie: string, segment: number, nomPlant: string): Observable<number> {
    const token = localStorage.getItem('token');
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    const params = new HttpParams()
      .set('typePistolet', typePistolet)
      .set('numPistolet', numPistolet.toString())
      .set('categorie', categorie)
      .set('segment', segment.toString())
      .set('nomPlant', nomPlant); // enum ou string
  
    return this.http.get<number>(
      `http://localhost:8281/operations/pistolet/dernier-numero-cycle`,
      { params, headers }
    );
  }
  
  getPistoletsParPdekEtPage(pdekId: number, pageNumber: number): Observable<Pistolet[]> {
    const token = localStorage.getItem('token'); // récupère le token depuis le localStorage
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    const params = new HttpParams()
      .set('pdekId', pdekId.toString())
      .set('pageNumber', pageNumber.toString());
  
    return this.http.get<Pistolet[]>(
      'http://localhost:8281/operations/pistolet/pistolets-par-pdek-et-page',
      { headers, params }
    );
  }
  
}