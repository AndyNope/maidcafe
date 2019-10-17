import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Offer } from '../model/offer.model';

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
  getOffers(): Observable<any> {
    return this.http.get<Offer>('https://maid-cafe.ch/controller.php?mode=getOffers', {});
  }

  /**
   * Deletes offer
   * @param id 
   * @returns offer 
   */
  deleteOffer(id: number): Observable<any> {
    return this.http.get<Offer>('https://maid-cafe.ch/controller.php?mode=deleteOffer&id=' + id, { responseType: 'json' });
  }

  /**
   * Gets offer by id
   * @param id 
   * @returns offer by id 
   */
  getOfferById(id: number): Observable<any> {
    return this.http.get<Offer>('https://maid-cafe.ch/controller.php?mode=getOfferById&id=' + id, { responseType: 'json' });
  }

  /**
   * Saves offer
   * @param id 
   * @param name 
   * @param price 
   * @param description 
   * @param image 
   * @returns offer 
   */
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
