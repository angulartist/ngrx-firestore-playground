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

    getProducts$(): Observable<Product[]> {
        return this.db.collection('slack').snapshotChanges()
            .pipe(
                map(actions => {
                    return actions.map(a => {
                        const data = a.payload.doc.data() as Product;
                        const id = a.payload.doc.id;
                        return { id, ...data };
                    });
                }),
                catchError((error: any) => throwError(error.json()))
            );
    }

    createProduct$(data): Observable<any> {
        const timestamp = this.timestamp;

        return from(this.db.collection('slack').add({
            ...data,
            updatedAt: timestamp,
            createdAt: timestamp
        }));
    }

    updateProduct$(data): Observable<any> {
        const timestamp = this.timestamp;
        const { id: documentName } = data;

        return from(this.db.doc(`slack/${documentName}`).set({
            ...data,
            updatedAt: timestamp
        }));
    }

    deleteProduct$(data): Observable<void> {
        const { id: documentName } = data;

        return from(this.db.doc(`slack/${documentName}`).delete());
    }
}
