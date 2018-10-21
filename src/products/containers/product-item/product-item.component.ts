import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../../store';

// models
import { Product } from '../../models/product.interface';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-product-item',
    styleUrls: ['product-item.component.scss'],
    templateUrl: 'product-item.component.html'
})
export class ProductItemComponent implements OnInit {
    product$: Observable<Product>;

    constructor(private store: Store<fromStore.ProductsState>) { }

    ngOnInit() {
        this.product$ = this.store.select(fromStore.getSelectedProduct);
    }

    onUpdate() {
        // fake data
        const newData: Product = {
            name: 'pipi'
        };

        this.store.dispatch(new fromStore.UpdateProduct(newData));
    }
}
