import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

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
  deleteOffer(id: number): Observable<Offer> {
    return this.http.post<Offer>('https://maid-cafe.ch/controller.php?mode=deleteOffer', { id }, { observe: 'response' }).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }), catchError((error) => {
        console.log(error);
        return throwError(error);
      })
    );
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
  saveOffer(offer: OfferEdit) {
    return this.http.post<OfferEdit>('https://maid-cafe.ch/controller.php?mode=saveOffer', offer, { observe: 'response' }).pipe(
      map((response: any) => {
        return response;
      }), catchError((error) => {
        return throwError(error);
      })
    );
  }
}
