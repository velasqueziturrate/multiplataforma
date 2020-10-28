import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", loadChildren: "~/app/home/home.module#HomeModule" },
    { path: "browse", loadChildren: "~/app/browse/browse.module#BrowseModule" },
    { path: "search", loadChildren: "~/app/search/search.module#SearchModule" },
    { path: "featured", loadChildren: "~/app/featured/featured.module#FeaturedModule" },
    { path: "settings", loadChildren: "~/app/settings/settings.module#SettingsModule" },
    { path: "componente1", loadChildren: "~/app/componente1/componente1.module#Componente1Module" },
    { path: "componente12", loadChildren: "~/app/componente12/componente12.module#Componente12Module" },
    { path: "cart", loadChildren: "~/app/cart/cart.module#CartModule" },
    { path: "wishlist", loadChildren: "~/app/wishlist/wishlist.module#WishlistModule" },
    { path: "account", loadChildren: "~/app/account/account.module#AccountModule" },
    { path: "list", loadChildren: "~/app/account/account.module#AccountModule" },
    { path: "list", loadChildren: () => import("~/app/listado/listado.module").then((m) => m.ListadoModule) }

];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
