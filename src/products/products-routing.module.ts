import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// containers
import * as fromContainers from './containers';

// services
import * as fromGuards from './guards';

const ROUTES: Routes = [
    {
        path: '',
        canActivate: [fromGuards.ProductsGuard],
        component: fromContainers.ProductsComponent,
    },
    {
        path: ':productId',
        canActivate: [fromGuards.ProductExistsGuard],
        component: fromContainers.ProductItemComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class ProductsRoutingModule { }
