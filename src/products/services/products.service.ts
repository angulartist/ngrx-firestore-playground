import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Product } from '../models/product.interface';

@Injectable()
export class ProductsService {
    constructor(private http: HttpClient) { }

    // testing purposes
    getProducts(): Observable<Product[]> {
        return this.http
            .get<Product[]>('http://hp-api.herokuapp.com/api/characters/students')
            .pipe(catchError((err: any) => throwError(err.json())));
    }
}
