import * as fromProducts from '../actions/products.action';

// models
import { Product } from '../../models/product.interface';

export interface ProductState {
    entities: { [id: string]: Product };
    loaded: boolean;
    loading: boolean;
}

export const initialState: ProductState = {
    entities: {},
    loaded: false,
    loading: false
};

export function reducer(
    state = initialState,
    action: fromProducts.ProductsAction
): ProductState {

    switch (action.type) {
        case fromProducts.LOAD_PRODUCTS: {
            return {
                ...state,
                loading: true
            };
        }

        case fromProducts.LOAD_PRODUCTS_SUCCESS: {
            const products = action.payload;

            const entities = products.reduce(
                (_entities: { [id: string]: Product }, product: Product) => {
                    return {
                        ..._entities,
                        [product.id]: product
                    };
                }, {
                    ...state.entities
                });

            console.log(entities);

            return {
                ...state,
                loading: false,
                loaded: true,
                entities
            };
        }

        case fromProducts.LOAD_PRODUCTS_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case fromProducts.UPDATE_PRODUCT_SUCCESS:
        case fromProducts.CREATE_PRODUCT_SUCCESS: {
            const product = action.payload;
            const entities = {
                ...state.entities,
                [product.id]: product
            };

            return {
                ...state,
                entities
            };
        }

        case fromProducts.DELETE_PRODUCT_SUCCESS: {
            const product = action.payload;
            const { [product.id]: removed, ...entities } = state.entities;

            return {
                ...state,
                entities
            };
        }
    }

    return state;
}

export const getProductsEntities = (state: ProductState) => state.entities;
export const getProductsLoading = (state: ProductState) => state.loading;
export const getProductsLoaded = (state: ProductState) => state.loaded;
