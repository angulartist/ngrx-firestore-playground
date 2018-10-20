import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// store
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// reducers
import { reducers, effects } from './store';

// containers
import * as fromContainers from './containers';

// services
import * as fromServices from './services';

// routing
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        ProductsRoutingModule,
        StoreModule.forFeature('products', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [...fromServices.services],
    declarations: [...fromContainers.containers],
    exports: [...fromContainers.containers],
})
export class ProductsModule { }
