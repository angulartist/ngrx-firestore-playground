import { Injectable } from '@angular/core';

import { Observable, throwError, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// db
import { AngularFirestore } from '@angular/fire/firestore';

// interfaces
import { Product } from '../models/product.interface';

@Injectable()
export class ProductsService {
    constructor
        (
        private db: AngularFirestore
        ) { }

    getProducts(): Observable<Product[]> {
        return this.db.collection('slack').snapshotChanges()
            .pipe(
                map(actions => {
                    return actions.map(a => {
                        const data = a.payload.doc.data() as Product;
                        const uid = a.payload.doc.id;
                        return { uid, ...data };
                    });
                }),
                catchError((error: any) => throwError(error.json()))
            );
    }

    createProduct(product): Observable<Product> {
        const subject = new Subject();

        this.db.collection('slack').add(product)
            .then(
                val => {
                    subject.next(val);
                    subject.complete();

                },
                err => {
                    subject.error(err);
                    subject.complete();
                }
            );

        return subject.asObservable();
    }
}
