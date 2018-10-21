import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError, map } from 'rxjs/operators';

import * as fromStore from '../store';

// models
import { Product } from '../models/product.interface';

@Injectable()
export class ProductExistsGuard implements CanActivate {

    constructor(private store: Store<fromStore.ProductsState>) { }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.checkStore()
            .pipe(
                switchMap(() => {
                    const { productId: id } = route.params;
                    return this.hasProduct(id);
                }),
                catchError(() => of(false))
            );
    }

    hasProduct(id: string): Observable<boolean> {
        return this.store
            .select(fromStore.getProductsEntities)
            .pipe(
                map((entities: { [key: string]: Product }) => !!entities[id]),
                take(1)
            );
    }

    checkStore(): Observable<boolean> {
        return this.store.select(fromStore.getProductsLoaded)
            .pipe(
                tap(loaded => {
                    if (!loaded) {
                        this.store.dispatch(new fromStore.LoadProducts());
                    }
                }),
                filter(loaded => loaded),
                take(1)
            );
    }
}
