import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Offer } from './offer.model';

@Injectable({ providedIn: 'root' })
export class OfferService {
  constructor(private http: HttpClient) { }

  getOffers(): Observable<any> {
    return this.http.get<Offer>('https://maid-cafe.ch/controller.php?mode=getOffers', {
    });
  }
  deleteOffer(id: number): Observable<any> {
    return this.http.get<Offer>('https://maid-cafe.ch/controller.php?mode=deleteOffer&id=' + id, { responseType: 'json' });
  }
  getOfferById(id: number): Observable<any> {
    return this.http.get<Offer>('https://maid-cafe.ch/controller.php?mode=getOfferById&id=' + id, { responseType: 'json' });
  }
  saveOffer(id: number, name: string, price: number, description: string, image: string): Observable<any> {
    return this.http.post<Offer>('https://maid-cafe.ch/controller.php?mode=saveOffer', {
      id: id,
      name: name,
      price: price,
      description: description,
      image: image
    });
  }
}
