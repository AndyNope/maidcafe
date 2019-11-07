import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  /**
     * Creates an instance of order service.
     * @param http 
     */
  constructor(private http: HttpClient) { }

  /**
   * Gets orders
   * @returns orders 
   */
  getOrders(): Observable<Order> {
    return this.http.get<Order>('https://maid-cafe.ch/controller.php?mode=getOrders', {});
  }

  /**
   * Gets orders
   * @returns orders 
   */
  getMyOrders(id: number): Observable<Order> {
    return this.http.get<Order>('https://maid-cafe.ch/controller.php?mode=getMyOrders&id=' + id, {});
  }

  /**
   * Deletes order
   * @param id 
   * @returns order 
   */
  deleteOrder(id: number): Observable<any> {
    return this.http.post<Order>('https://maid-cafe.ch/controller.php?mode=deleteorder', {
      id: id
    });
  }

  /**
   * Gets order by id
   * @param id 
   * @returns order by id 
   */
  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>('https://maid-cafe.ch/controller.php?mode=getOrderById&id=' + id, { responseType: 'json' });
  }

  /**
   * Saves order
   * @param id 
   * @param name 
   * @param price 
   * @param description 
   * @param image 
   * @returns order 
   */
  saveOrder(id: number, name: string, price: number, description: string, image: string): Observable<any> {
    return this.http.post<Order>('https://maid-cafe.ch/controller.php?mode=saveorder', {
      id: id,
      name: name,
      price: price,
      description: description,
      image: image
    });
  }
}
