import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Offer } from './offer.model';

@Injectable({ providedIn: 'root' })
export class OfferService {
  login() {
    throw new Error("Method not implemented.");
  }
  constructor(private http: HttpClient) { }

  getOffers(): Observable<any> {
    return this.http.get<Offer>('https://maid-cafe.ch/controller.php?mode=getOffers', {
    });
  }
  getOfferById(id: number): Observable<any> {
    return this.http.get<Offer>('https://maid-cafe.ch/controller.php?mode=getOfferById&id=' + id,{responseType: 'json'});
  }
}
