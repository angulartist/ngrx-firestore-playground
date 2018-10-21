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
                return this.productService.getProducts$()
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
                return this.productService.createProduct$(product)
                    .pipe(
                        map(x => new productsActions.CreateProductSuccess(x)),
                        catchError((err => of(new productsActions.CreateProductFail(err))))
                    );
            })
        );

    @Effect()
    updateProduct$ = this.actions$.ofType(productsActions.UPDATE_PRODUCT)
        .pipe(
            map((action: productsActions.UpdateProduct) => action.payload),
            switchMap((product) => {
                return this.productService.updateProduct$(product)
                    .pipe(
                        map(x => new productsActions.UpdateProductSuccess(x)),
                        catchError((err => of(new productsActions.UpdateProductFail(err))))
                    );
            })
        );

    @Effect()
    deleteProduct$ = this.actions$.ofType(productsActions.DELETE_PRODUCT)
        .pipe(
            map((action: productsActions.DeleteProduct) => action.payload),
            switchMap((product) => {
                return this.productService.deleteProduct$(product)
                    .pipe(
                        map(() => new productsActions.DeleteProductSuccess(product)),
                        catchError((err => of(new productsActions.DeleteProductFail(err))))
                    );
            })
        );
}
