import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromProducts from './products.reducer';

export interface ProductsState {
    products: fromProducts.ProductState;
}

export const reducers: ActionReducerMap<ProductsState> = {
    products: fromProducts.reducer
};

export const getProductsState = createFeatureSelector<ProductsState>(
    'products'
);

// products state
export const getProductState = createSelector(
    getProductsState,
    (state: ProductsState) => state.products
);

export const getProductsEntities = createSelector(
    getProductState,
    fromProducts.getProductsEntities
);

export const getAllProducts = createSelector(
    getProductsEntities,
    (entities) => {
        return Object.keys(entities).map(id => entities[id]);
    }
);

export const getProductsLoaded = createSelector(
    getProductState,
    fromProducts.getProductsLoaded
);

export const getProductsLoading = createSelector(
    getProductState,
    fromProducts.getProductsLoading
);
