import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../../store';

// models
import { Product } from '../../models/product.interface';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-products',
    styleUrls: ['products.component.scss'],
    templateUrl: 'products.component.html'
})
export class ProductsComponent implements OnInit {
    products$: Observable<Product[]>;

    constructor(private store: Store<fromStore.ProductsState>) { }

    ngOnInit() {
        this.products$ = this.store.select(fromStore.getAllProducts);
        this.store.dispatch(new fromStore.LoadProducts());
    }

    onCreate() {
        // fake data, should use form
        const data: Product = {
            name: 'Prout'
        };

        this.store.dispatch(new fromStore.CreateProduct(data));
    }
}
