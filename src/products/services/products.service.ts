import { Injectable } from '@angular/core';

import { Observable, throwError, Subject, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// db
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';

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

    createProduct(product): Observable<DocumentReference> {

        return from(this.db.collection('slack').add(product));
    }
}
