import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// containers
import * as fromContainers from './containers';

const ROUTES: Routes = [
    {
        path: '',
        component: fromContainers.ProductsComponent,
    },
    {
        path: ':productUid',
        component: fromContainers.ProductItemComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class ProductsRoutingModule { }
