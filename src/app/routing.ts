import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from "@angular/router";

export class CustomReuseStrategy implements RouteReuseStrategy {
    routesToCache: string[] = [""];
    storedRouteHandles = new Map<string, DetachedRouteHandle>();

    // Decides if the route should be stored
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        // console.log('should detach', route, this.routesToCache.indexOf(route.routeConfig.path) > -1);
        return this.routesToCache.indexOf(route.routeConfig.path) > -1;
    }

    // Store the information for the route we're destructing
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        this.storedRouteHandles.set(route.routeConfig.path, handle);
    }

    // Return true if we have a stored route object for the next route
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return this.storedRouteHandles.has(route.routeConfig.path);
    }

    // If we returned true in shouldAttach(), now return the actual route data for restoration
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        return this.storedRouteHandles.get(route.routeConfig.path);
    }

    // Reuse the route if we're going to and from the same route
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        // console.log('should reuse', future.routeConfig === curr.routeConfig);
        return future.routeConfig === curr.routeConfig;
    }
}