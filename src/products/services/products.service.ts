import { Injectable } from '@angular/core';

import { Observable, throwError, from } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

// db
import * as firebase from 'firebase/app';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';

// interfaces
import { Product } from '../models/product.interface';

@Injectable()
export class ProductsService {
    constructor(private db: AngularFirestore) { }

    get timestamp() {
        return firebase.firestore.FieldValue.serverTimestamp();
    }

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

    createProduct(data): Observable<any> {
        const timestamp = this.timestamp;

        return from(this.db.collection('slack').add({
            ...data,
            updatedAt: timestamp,
            createdAt: timestamp
        })).pipe(
            tap(a => console.log('create: ', a))
        );
    }

    updateProduct(data): Observable<any> {
        const timestamp = this.timestamp;

        return from(this.db.doc(`slack/0aMwkyVWF33PF7qDIvKy`).set({
            ...data,
            updatedAt: timestamp,
            createdAt: timestamp
        })).pipe(
            tap(a => console.log('update: ', a))
        );
    }
}
