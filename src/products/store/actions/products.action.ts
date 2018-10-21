import { Action } from '@ngrx/store';

// models
import { Product } from '../../models/product.interface';

// load products
export const LOAD_PRODUCTS = '[Products] Load Products';
export const LOAD_PRODUCTS_FAIL = '[Products] Load Products Fail';
export const LOAD_PRODUCTS_SUCCESS = '[Products] Load Products Success';

export class LoadProducts implements Action {
    readonly type = LOAD_PRODUCTS;
}

export class LoadProductsFail implements Action {
    readonly type = LOAD_PRODUCTS_FAIL;
    constructor(public payload: any) { }
}

export class LoadProductsSuccess implements Action {
    readonly type = LOAD_PRODUCTS_SUCCESS;
    constructor(public payload: Product[]) { }
}

// create products
export const CREATE_PRODUCT = '[Products] Create product';
export const CREATE_PRODUCT_FAIL = '[Products] Create product Fail';
export const CREATE_PRODUCT_SUCCESS = '[Products] Create product Success';

export class CreateProduct implements Action {
    readonly type = CREATE_PRODUCT;
    constructor(public payload: Product) { }
}

export class CreateProductFail implements Action {
    readonly type = CREATE_PRODUCT_FAIL;
    constructor(public payload: any) { }
}

export class CreateProductSuccess implements Action {
    readonly type = CREATE_PRODUCT_SUCCESS;
    constructor(public payload: Product) { }
}

// action types
export type ProductsAction
    = LoadProducts
    | LoadProductsFail
    | LoadProductsSuccess
    | CreateProduct
    | CreateProductFail
    | CreateProductSuccess;
