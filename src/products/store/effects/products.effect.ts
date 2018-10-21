import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { Effect, Actions } from '@ngrx/effects';

import * as productsActions from '../actions/products.action';

// services
import * as fromServices from '../../services';

@Injectable()
export class ProductsEffects {
    constructor(
        private actions$: Actions,
        private productService: fromServices.ProductsService
    ) { }

    @Effect()
    loadProducts$ = this.actions$.ofType(productsActions.LOAD_PRODUCTS)
        .pipe(
            switchMap(() => {
                return this.productService.getProducts()
                    .pipe(
                        map(products => new productsActions.LoadProductsSuccess(products)),
                        catchError((err => of(new productsActions.LoadProductsFail(err))))
                    );
            })
        );

    @Effect()
    createProduct$ = this.actions$.ofType(productsActions.CREATE_PRODUCT)
        .pipe(
            map((action: productsActions.CreateProduct) => action.payload),
            switchMap((product) => {
                return this.productService.createProduct(product)
                    .pipe(
                        map(_product => new productsActions.CreateProductSuccess(_product)),
                        catchError((err => of(new productsActions.CreateProductFail(err))))
                    );
            })
        );

    @Effect()
    updateProduct$ = this.actions$.ofType(productsActions.UPDATE_PRODUCT)
        .pipe(
            map((action: productsActions.UpdateProduct) => action.payload),
            switchMap((product) => {
                return this.productService.updateProduct(product)
                    .pipe(
                        map(_product => new productsActions.UpdateProductSuccess(_product)),
                        catchError((err => of(new productsActions.UpdateProductFail(err))))
                    );
            })
        );
}
