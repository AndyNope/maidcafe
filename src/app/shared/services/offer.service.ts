import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Offer, OfferEdit } from '../models/offer.model';

@Injectable({ providedIn: 'root' })
export class OfferService {
  /**
   * Creates an instance of offer service.
   * @param http
   */
  constructor(private http: HttpClient) { }

  /**
   * Gets offers
   * @returns offers
   */
  getOffers(): Observable<Offer> {
    return this.http.get<Offer>('https://maid-cafe.ch/controller.php?mode=getOffers', {});
  }

  /**
   * Deletes offer
   * @param id
   * @returns offer
   */
  deleteOffer(id: number): Observable<any> {
    return this.http.post<Offer>('https://maid-cafe.ch/controller.php?mode=deleteOffer', {
      id
    });
  }

  /**
   * Gets offer by id
   * @param id
   * @returns offer by id
   */
  getOfferById(id: number): Observable<Offer> {
    return this.http.get<Offer>('https://maid-cafe.ch/controller.php?mode=getOfferById&id=' + id, { responseType: 'json' });
  }

  /**
   * Saves offer
   * @param offer
   * @returns offer
   */
  saveOffer(offer: OfferEdit): Observable<any> {
    return this.http.post<Offer>('https://maid-cafe.ch/controller.php?mode=saveOffer', offer);
  }
}
