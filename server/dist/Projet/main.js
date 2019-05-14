(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/WorkerAuth.service.ts":
/*!***********************************!*\
  !*** ./src/WorkerAuth.service.ts ***!
  \***********************************/
/*! exports provided: WorkerAuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkerAuthService", function() { return WorkerAuthService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");





var WorkerAuthService = /** @class */ (function () {
    function WorkerAuthService(http, router) {
        this.http = http;
        this.router = router;
    }
    WorkerAuthService.prototype.saveToken = function (token) {
        localStorage.setItem('userToken', token);
        this.token = token;
    };
    WorkerAuthService.prototype.getToken = function () {
        if (!this.token) {
            this.token = localStorage.getItem('userToken');
        }
        return this.token;
    };
    WorkerAuthService.prototype.getWorkerDetails = function () {
        var token = this.getToken();
        var payload;
        if (token) {
            payload = token.split('.')[1];
            payload = window.atob(payload);
            return JSON.parse(payload);
        }
        else {
            return null;
        }
    };
    WorkerAuthService.prototype.isLoggedIn = function () {
        var user = this.getWorkerDetails();
        if (user) {
            return user.exp > Date.now() / 1000;
        }
        else {
            return false;
        }
    };
    WorkerAuthService.prototype.register = function (user) {
        var _this = this;
        var base = this.http.post('/api/WorkerRegister', user);
        var request = base.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            if (data.token) {
                _this.saveToken(data.token);
            }
            return data;
        }));
        return request;
    };
    WorkerAuthService.prototype.login = function (user) {
        var _this = this;
        var base = this.http.post('/api/WorkerLogin', user);
        var request = base.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            if (data.token) {
                _this.saveToken(data.token);
            }
            return data;
        }));
        return request;
    };
    WorkerAuthService.prototype.profile = function () {
        return this.http.get('/api/WorkerProfile', {
            headers: { Authorization: "" + this.getToken() }
        });
    };
    WorkerAuthService.prototype.logout = function () {
        this.token = '';
        window.localStorage.removeItem('userToken');
        this.router.navigateByUrl('/');
    };
    WorkerAuthService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], WorkerAuthService);
    return WorkerAuthService;
}());



/***/ }),

/***/ "./src/admin-guard.service.ts":
/*!************************************!*\
  !*** ./src/admin-guard.service.ts ***!
  \************************************/
/*! exports provided: AdminGuardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminGuardService", function() { return AdminGuardService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _authentification_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./authentification.service */ "./src/authentification.service.ts");




var AdminGuardService = /** @class */ (function () {
    function AdminGuardService(auth, router) {
        this.auth = auth;
        this.router = router;
        this.isAdmin = 'false';
    }
    AdminGuardService.prototype.canActivate = function () {
        if (!this.auth.isLoggedIn()) {
            this.router.navigateByUrl('/');
            return false;
        }
        else {
            if (!this.auth.isAdmin()) {
                this.router.navigateByUrl('/');
                return false;
            }
            return true;
        }
    };
    AdminGuardService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_authentification_service__WEBPACK_IMPORTED_MODULE_3__["AuthentificationService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], AdminGuardService);
    return AdminGuardService;
}());



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");



var routes = [];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Header -->\n<mat-toolbar color=\"accent\">\n  <mat-toolbar-row>\n  <span>MyServices</span>\n  <span class=\"spacer\"></span>\n    <button mat-icon-button (click)=\"Cart()\" *ngIf=\"isAuth()\">\n      <mat-icon matBadge = {{OrderNumber}} >near_me</mat-icon>\n    </button>\n    <button mat-button [matMenuTriggerFor]=\"menu\"><mat-icon class=\"icon\">menu</mat-icon></button>\n    <mat-menu #menu=\"matMenu\" xPosition=\"before\">\n      <button mat-menu-item (click)=\"Login()\" *ngIf=\"!isAuth()\">Login</button>\n      <button mat-menu-item (click)=\"Register()\" *ngIf=\"!isAuth()\">Register</button>\n      <button mat-menu-item (click)=\"Logout() \" *ngIf=\"isAuth()\">Logout</button>\n      <button mat-menu-item (click)=\"Services() \" *ngIf=\"isAuth()\">Services</button>\n      <button mat-menu-item (click)=\"AddServices() \" *ngIf=\"isAdmin()\">Add Services</button>\n    </mat-menu>\n  </mat-toolbar-row>\n</mat-toolbar>\n\n\n<router-outlet></router-outlet>\n\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".spacer {\n  flex: 1 1 auto; }\n\n.icon {\n  padding: 0 14px; }\n\n.mat-toolbar {\n  box-shadow: 0 0 25px rgba(0, 0, 0, 0.2); }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvQzpcXFVzZXJzXFxNYXR0aGV3XFxEZXNrdG9wXFxQcm9qZXRfV0VCL3NyY1xcYXBwXFxhcHAuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxjQUFjLEVBQUE7O0FBR2hCO0VBQ0UsZUFBZSxFQUFBOztBQUdqQjtFQUNFLHVDQUE4QixFQUFBIiwiZmlsZSI6InNyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNwYWNlcntcclxuICBmbGV4OiAxIDEgYXV0bztcclxufVxyXG5cclxuLmljb257XHJcbiAgcGFkZGluZzogMCAxNHB4O1xyXG59XHJcblxyXG4ubWF0LXRvb2xiYXJ7XHJcbiAgYm94LXNoYWRvdzogMCAwIDI1cHggcmdiYSgjMDAwLCAwLjIpO1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _authentification_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../authentification.service */ "./src/authentification.service.ts");
/* harmony import */ var _order_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../order.service */ "./src/order.service.ts");





var AppComponent = /** @class */ (function () {
    function AppComponent(router, auth, order) {
        this.router = router;
        this.auth = auth;
        this.order = order;
        this.OrderNumber = 0;
    }
    AppComponent.prototype.ngOnInit = function () {
        if (this.isAuth()) {
            this.OrderCount();
        }
    };
    AppComponent.prototype.ngOnChanges = function () {
        if (this.isAuth()) {
            this.OrderCount();
        }
    };
    AppComponent.prototype.Cart = function () {
        this.router.navigate(['/cart']);
    };
    AppComponent.prototype.Login = function () {
        this.router.navigate(['']);
    };
    AppComponent.prototype.isAuth = function () {
        return this.auth.isLoggedIn();
    };
    AppComponent.prototype.isAdmin = function () {
        return this.auth.isAdmin();
    };
    AppComponent.prototype.Services = function () {
        this.router.navigate(['/services-list']);
    };
    AppComponent.prototype.AddServices = function () {
        this.router.navigate(['/services']);
    };
    AppComponent.prototype.Logout = function () {
        this.auth.logout();
        this.router.navigate(['']);
    };
    AppComponent.prototype.Register = function () {
        this.router.navigate(['register']);
    };
    AppComponent.prototype.OrderCount = function () {
        var _this = this;
        this.auth.profile().subscribe(function (user) {
            _this.order.getAllPendingOrders(user.id).subscribe(function (data) {
                _this.OrderNumber = data.length;
            });
        }, function (err) {
            console.error((err));
        });
    };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _authentification_service__WEBPACK_IMPORTED_MODULE_3__["AuthentificationService"], _order_service__WEBPACK_IMPORTED_MODULE_4__["OrderService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _register_register_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./register/register.component */ "./src/app/register/register.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _profile_profile_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./profile/profile.component */ "./src/app/profile/profile.component.ts");
/* harmony import */ var _authentification_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../authentification.service */ "./src/authentification.service.ts");
/* harmony import */ var _auth_guard_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../auth-guard.service */ "./src/auth-guard.service.ts");
/* harmony import */ var _services_services_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./services/services.component */ "./src/app/services/services.component.ts");
/* harmony import */ var _services_list_services_list_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./services-list/services-list.component */ "./src/app/services-list/services-list.component.ts");
/* harmony import */ var _services_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../services.service */ "./src/services.service.ts");
/* harmony import */ var _admin_guard_service__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../admin-guard.service */ "./src/admin-guard.service.ts");
/* harmony import */ var _order_service__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../order.service */ "./src/order.service.ts");
/* harmony import */ var _cart_cart_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./cart/cart.component */ "./src/app/cart/cart.component.ts");
/* harmony import */ var _worker_login_worker_login_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./worker-login/worker-login.component */ "./src/app/worker-login/worker-login.component.ts");
/* harmony import */ var _WorkerAuth_service__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../WorkerAuth.service */ "./src/WorkerAuth.service.ts");
/* harmony import */ var _worker_register_worker_register_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./worker-register/worker-register.component */ "./src/app/worker-register/worker-register.component.ts");
/* harmony import */ var _worker_profile_worker_profile_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./worker-profile/worker-profile.component */ "./src/app/worker-profile/worker-profile.component.ts");
/* harmony import */ var _order_pending_order_pending_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./order-pending/order-pending.component */ "./src/app/order-pending/order-pending.component.ts");



























var appRoutes = [
    { path: 'register', component: _register_register_component__WEBPACK_IMPORTED_MODULE_8__["RegisterComponent"] },
    { path: 'home', component: _home_home_component__WEBPACK_IMPORTED_MODULE_12__["HomeComponent"] },
    { path: 'services', component: _services_services_component__WEBPACK_IMPORTED_MODULE_16__["ServicesComponent"], canActivate: [_admin_guard_service__WEBPACK_IMPORTED_MODULE_19__["AdminGuardService"]] },
    { path: 'services-list', component: _services_list_services_list_component__WEBPACK_IMPORTED_MODULE_17__["ServicesListComponent"] },
    { path: 'profile', component: _profile_profile_component__WEBPACK_IMPORTED_MODULE_13__["ProfileComponent"], canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_15__["AuthGuardService"]] },
    { path: 'cart', component: _cart_cart_component__WEBPACK_IMPORTED_MODULE_21__["CartComponent"], canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_15__["AuthGuardService"]] },
    { path: 'worker-login', component: _worker_login_worker_login_component__WEBPACK_IMPORTED_MODULE_22__["WorkerLoginComponent"] },
    { path: 'worker-register', component: _worker_register_worker_register_component__WEBPACK_IMPORTED_MODULE_24__["WorkerRegisterComponent"] },
    { path: 'worker-profile', component: _worker_profile_worker_profile_component__WEBPACK_IMPORTED_MODULE_25__["WorkerProfileComponent"] },
    { path: 'order-pending', component: _order_pending_order_pending_component__WEBPACK_IMPORTED_MODULE_26__["OrderPendingComponent"] },
    { path: '', component: _login_login_component__WEBPACK_IMPORTED_MODULE_6__["LoginComponent"] }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                _login_login_component__WEBPACK_IMPORTED_MODULE_6__["LoginComponent"],
                _register_register_component__WEBPACK_IMPORTED_MODULE_8__["RegisterComponent"],
                _home_home_component__WEBPACK_IMPORTED_MODULE_12__["HomeComponent"],
                _profile_profile_component__WEBPACK_IMPORTED_MODULE_13__["ProfileComponent"],
                _services_services_component__WEBPACK_IMPORTED_MODULE_16__["ServicesComponent"],
                _services_list_services_list_component__WEBPACK_IMPORTED_MODULE_17__["ServicesListComponent"],
                _services_services_component__WEBPACK_IMPORTED_MODULE_16__["DialogOverviewExampleDialogComponent"],
                _cart_cart_component__WEBPACK_IMPORTED_MODULE_21__["CartComponent"],
                _worker_login_worker_login_component__WEBPACK_IMPORTED_MODULE_22__["WorkerLoginComponent"],
                _worker_register_worker_register_component__WEBPACK_IMPORTED_MODULE_24__["WorkerRegisterComponent"],
                _worker_profile_worker_profile_component__WEBPACK_IMPORTED_MODULE_25__["WorkerProfileComponent"],
                _order_pending_order_pending_component__WEBPACK_IMPORTED_MODULE_26__["OrderPendingComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["BrowserAnimationsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatFormFieldModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ReactiveFormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatExpansionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatMenuModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSidenavModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_11__["HttpClientModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatProgressBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSliderModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTableModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_10__["RouterModule"].forRoot(appRoutes),
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatBadgeModule"]
            ],
            entryComponents: [_services_services_component__WEBPACK_IMPORTED_MODULE_16__["DialogOverviewExampleDialogComponent"]],
            providers: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_15__["AuthGuardService"], _authentification_service__WEBPACK_IMPORTED_MODULE_14__["AuthentificationService"], _services_service__WEBPACK_IMPORTED_MODULE_18__["ServicesService"], _admin_guard_service__WEBPACK_IMPORTED_MODULE_19__["AdminGuardService"], _order_service__WEBPACK_IMPORTED_MODULE_20__["OrderService"], _WorkerAuth_service__WEBPACK_IMPORTED_MODULE_23__["WorkerAuthService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/cart/cart.component.html":
/*!******************************************!*\
  !*** ./src/app/cart/cart.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\" >\n\n  <ng-container matColumnDef=\"id\">\n    <th mat-header-cell *matHeaderCellDef> Id </th>\n    <td mat-cell *matCellDef=\"let element\"> {{element.idOrder}} </td>\n  </ng-container>\n\n  <!-- Name Column -->\n  <ng-container matColumnDef=\"date\">\n    <th mat-header-cell *matHeaderCellDef> Date </th>\n    <td mat-cell *matCellDef=\"let element\"> {{element.orderDate}} </td>\n  </ng-container>\n\n  <!-- Weight Column -->\n  <ng-container matColumnDef=\"status\">\n    <th mat-header-cell *matHeaderCellDef> Order Status </th>\n    <td mat-cell *matCellDef=\"let element\" [style.color]=\"getColor(element.orderStatus)\"> {{element.orderStatus}} </td>\n  </ng-container>\n\n  <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n  <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n</table>\n\n"

/***/ }),

/***/ "./src/app/cart/cart.component.scss":
/*!******************************************!*\
  !*** ./src/app/cart/cart.component.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n  min-width: 150px;\n  max-width: 500px;\n  width: 100%;\n  margin: 0 auto;\n  margin-top: 10%;\n  margin-bottom: 10%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY2FydC9DOlxcVXNlcnNcXE1hdHRoZXdcXERlc2t0b3BcXFByb2pldF9XRUIvc3JjXFxhcHBcXGNhcnRcXGNhcnQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBZ0I7RUFDaEIsZ0JBQWdCO0VBQ2hCLFdBQVk7RUFDWixjQUFjO0VBQ2QsZUFBZTtFQUNmLGtCQUFrQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvY2FydC9jYXJ0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsidGFibGV7XHJcbiAgbWluLXdpZHRoOiAxNTBweDtcclxuICBtYXgtd2lkdGg6IDUwMHB4O1xyXG4gIHdpZHRoOiAxMDAlIDtcclxuICBtYXJnaW46IDAgYXV0bztcclxuICBtYXJnaW4tdG9wOiAxMCU7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTAlO1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/cart/cart.component.ts":
/*!****************************************!*\
  !*** ./src/app/cart/cart.component.ts ***!
  \****************************************/
/*! exports provided: CartComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartComponent", function() { return CartComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _authentification_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../authentification.service */ "./src/authentification.service.ts");
/* harmony import */ var _order_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../order.service */ "./src/order.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");





var CartComponent = /** @class */ (function () {
    function CartComponent(auth, order) {
        this.auth = auth;
        this.order = order;
        this.Orders = [];
        this.displayedColumns = ['id', 'status', 'date'];
    }
    CartComponent.prototype.ngOnInit = function () {
        this.getAllOrder();
    };
    CartComponent.prototype.getColor = function (status) {
        if (status === 'pending') {
            return 'red';
        }
        else {
            return 'lime';
        }
    };
    CartComponent.prototype.getAllOrder = function () {
        var _this = this;
        this.auth.profile().subscribe(function (user) {
            _this.order.getAllPendingOrders(user.id).subscribe(function (data) {
                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                    var order = data_1[_i];
                    console.log(_this.Orders);
                    _this.Orders.push(order);
                }
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTableDataSource"](_this.Orders);
            });
        }, function (err) {
            console.error((err));
        });
    };
    CartComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-cart',
            template: __webpack_require__(/*! ./cart.component.html */ "./src/app/cart/cart.component.html"),
            styles: [__webpack_require__(/*! ./cart.component.scss */ "./src/app/cart/cart.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_authentification_service__WEBPACK_IMPORTED_MODULE_2__["AuthentificationService"], _order_service__WEBPACK_IMPORTED_MODULE_3__["OrderService"]])
    ], CartComponent);
    return CartComponent;
}());



/***/ }),

/***/ "./src/app/home/home.component.html":
/*!******************************************!*\
  !*** ./src/app/home/home.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1>Home</h1>\n"

/***/ }),

/***/ "./src/app/home/home.component.scss":
/*!******************************************!*\
  !*** ./src/app/home/home.component.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2hvbWUvaG9tZS5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


/** @title Responsive sidenav */
var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
    }
    HomeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.scss */ "./src/app/home/home.component.scss")]
        })
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/login/login.component.html":
/*!********************************************!*\
  !*** ./src/app/login/login.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n  <h2>Login</h2>\n  <form class=\"example-form\" [formGroup]=\"userForm\" (ngSubmit)=\"onSubmitForm()\">\n    <mat-form-field class=\"example-full-width\">\n      <input matInput placeholder=\"Email\" formControlName=\"email\">\n    </mat-form-field>\n    <mat-form-field class=\"example-full-width\">\n      <input type=\"password\" matInput placeholder=\"Password\" formControlName=\"password\">\n    </mat-form-field>\n    <button mat-raised-button color=\"accent\" type=\"submit\" [disabled]=\"userForm.invalid\">Login</button>\n  </form>\n</mat-card>\n"

/***/ }),

/***/ "./src/app/login/login.component.scss":
/*!********************************************!*\
  !*** ./src/app/login/login.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "h2 {\n  text-align: center; }\n\nmat-card {\n  min-width: 150px;\n  max-width: 500px;\n  width: 100%;\n  margin: 0 auto;\n  margin-top: 10%;\n  margin-bottom: 10%; }\n\n.example-form {\n  min-width: 150px;\n  max-width: 500px;\n  width: 90%; }\n\n.example-full-width {\n  width: 100%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbG9naW4vQzpcXFVzZXJzXFxNYXR0aGV3XFxEZXNrdG9wXFxQcm9qZXRfV0VCL3NyY1xcYXBwXFxsb2dpblxcbG9naW4uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBa0IsRUFBQTs7QUFHcEI7RUFDRSxnQkFBZ0I7RUFDaEIsZ0JBQWdCO0VBQ2hCLFdBQVk7RUFDWixjQUFjO0VBQ2QsZUFBZTtFQUNmLGtCQUFrQixFQUFBOztBQUdwQjtFQUNFLGdCQUFnQjtFQUNoQixnQkFBZ0I7RUFDaEIsVUFBVyxFQUFBOztBQUdiO0VBQ0UsV0FBVyxFQUFBIiwiZmlsZSI6InNyYy9hcHAvbG9naW4vbG9naW4uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJoMiB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG5tYXQtY2FyZCB7XHJcbiAgbWluLXdpZHRoOiAxNTBweDtcclxuICBtYXgtd2lkdGg6IDUwMHB4O1xyXG4gIHdpZHRoOiAxMDAlIDtcclxuICBtYXJnaW46IDAgYXV0bztcclxuICBtYXJnaW4tdG9wOiAxMCU7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTAlO1xyXG59XHJcblxyXG4uZXhhbXBsZS1mb3JtIHtcclxuICBtaW4td2lkdGg6IDE1MHB4O1xyXG4gIG1heC13aWR0aDogNTAwcHg7XHJcbiAgd2lkdGg6IDkwJSA7XHJcbn1cclxuXHJcbi5leGFtcGxlLWZ1bGwtd2lkdGgge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _authentification_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../authentification.service */ "./src/authentification.service.ts");





var LoginComponent = /** @class */ (function () {
    function LoginComponent(formBuilder, auth, router) {
        this.formBuilder = formBuilder;
        this.auth = auth;
        this.router = router;
        this.output = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.credentials = {
            id: 0,
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            phone: '',
        };
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.initForm();
    };
    LoginComponent.prototype.initForm = function () {
        this.userForm = this.formBuilder.group({
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].email]],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
    };
    LoginComponent.prototype.onSubmitForm = function () {
        var _this = this;
        var formValue = this.userForm.value;
        this.credentials.email = formValue['email'];
        this.credentials.password = formValue['password'];
        this.auth.login(this.credentials).subscribe(function (data) {
            console.log(data);
            if (data.error == 'Incorrect Details') {
                alert(data.error);
            }
            else {
                _this.router.navigate(['profile']);
                _this.output.emit('');
            }
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], LoginComponent.prototype, "output", void 0);
    LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.scss */ "./src/app/login/login.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _authentification_service__WEBPACK_IMPORTED_MODULE_4__["AuthentificationService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/order-pending/order-pending.component.html":
/*!************************************************************!*\
  !*** ./src/app/order-pending/order-pending.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<table mat-table [dataSource]=\"dataSource\" multiTemplateDataRows class=\"mat-elevation-z8\" >\n\n  <ng-container matColumnDef=\"{{column}}\" *ngFor=\"let column of displayedColumns\">\n    <th mat-header-cell *matHeaderCellDef>{{column}}</th>\n    <td mat-cell *matCellDef=\"let element\"> {{element[column]}} </td>\n  </ng-container>\n\n  <ng-container matColumnDef=\"expandedDetail\">\n    <td mat-cell *matCellDef=\"let element\" [attr.colspan]=\"displayedColumns.length\">\n      <div class=\"exemple-element-detail\" [@detailExpand]=\"element == expandedElement ? 'expanded' : 'collapsed'\">\n        <div class=\"example-element-description\">\n          {{element.idOrder}}\n          <button mat-raised-button type=\"submit\" color=\"accent\" (click)=\"PickAnOrder(element)\">Pick this one</button>\n        </div>\n      </div>\n    </td>\n  </ng-container>\n\n  <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n  <tr mat-row *matRowDef=\"let element; columns: displayedColumns;\"\n      class=\"example-element-row\"\n      [class.example-expanded-row]=\"expandedElement === element\"\n      (click)=\"expandedElement = expandedElement === element ? null : element\">\n  </tr>\n  <tr mat-row *matRowDef=\"let row; columns: ['expandedDetail']\" class=\"example-detail-row\"></tr>\n</table>\n\n"

/***/ }),

/***/ "./src/app/order-pending/order-pending.component.scss":
/*!************************************************************!*\
  !*** ./src/app/order-pending/order-pending.component.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n  min-width: 150px;\n  max-width: 500px;\n  width: 100%;\n  margin: 0 auto;\n  margin-top: 10%;\n  margin-bottom: 10%; }\n\ntr.example-detail-row {\n  height: 0; }\n\ntr.example-element-row:not(.example-expanded-row):hover {\n  background: #f5f5f5; }\n\ntr.example-element-row:not(.example-expanded-row):active {\n  background: #efefef; }\n\n.example-element-row td {\n  border-bottom-width: 0; }\n\n.example-element-detail {\n  overflow: hidden;\n  display: flex; }\n\n.example-element-diagram {\n  min-width: 80px;\n  border: 2px solid black;\n  padding: 8px;\n  font-weight: lighter;\n  margin: 8px 0;\n  height: 104px; }\n\n.example-element-symbol {\n  font-weight: bold;\n  font-size: 40px;\n  line-height: normal; }\n\n.example-element-description {\n  padding: 16px; }\n\n.example-element-description-attribution {\n  opacity: 0.5; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvb3JkZXItcGVuZGluZy9DOlxcVXNlcnNcXE1hdHRoZXdcXERlc2t0b3BcXFByb2pldF9XRUIvc3JjXFxhcHBcXG9yZGVyLXBlbmRpbmdcXG9yZGVyLXBlbmRpbmcuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBZ0I7RUFDaEIsZ0JBQWdCO0VBQ2hCLFdBQVk7RUFDWixjQUFjO0VBQ2QsZUFBZTtFQUNmLGtCQUFrQixFQUFBOztBQUdwQjtFQUNFLFNBQVMsRUFBQTs7QUFHWDtFQUNFLG1CQUFtQixFQUFBOztBQUdyQjtFQUNFLG1CQUFtQixFQUFBOztBQUdyQjtFQUNFLHNCQUFzQixFQUFBOztBQUd4QjtFQUNFLGdCQUFnQjtFQUNoQixhQUFhLEVBQUE7O0FBR2Y7RUFDRSxlQUFlO0VBQ2YsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixvQkFBb0I7RUFDcEIsYUFBYTtFQUNiLGFBQWEsRUFBQTs7QUFHZjtFQUNFLGlCQUFpQjtFQUNqQixlQUFlO0VBQ2YsbUJBQW1CLEVBQUE7O0FBR3JCO0VBQ0UsYUFBYSxFQUFBOztBQUdmO0VBQ0UsWUFBWSxFQUFBIiwiZmlsZSI6InNyYy9hcHAvb3JkZXItcGVuZGluZy9vcmRlci1wZW5kaW5nLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsidGFibGV7XHJcbiAgbWluLXdpZHRoOiAxNTBweDtcclxuICBtYXgtd2lkdGg6IDUwMHB4O1xyXG4gIHdpZHRoOiAxMDAlIDtcclxuICBtYXJnaW46IDAgYXV0bztcclxuICBtYXJnaW4tdG9wOiAxMCU7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTAlO1xyXG59XHJcblxyXG50ci5leGFtcGxlLWRldGFpbC1yb3cge1xyXG4gIGhlaWdodDogMDtcclxufVxyXG5cclxudHIuZXhhbXBsZS1lbGVtZW50LXJvdzpub3QoLmV4YW1wbGUtZXhwYW5kZWQtcm93KTpob3ZlciB7XHJcbiAgYmFja2dyb3VuZDogI2Y1ZjVmNTtcclxufVxyXG5cclxudHIuZXhhbXBsZS1lbGVtZW50LXJvdzpub3QoLmV4YW1wbGUtZXhwYW5kZWQtcm93KTphY3RpdmUge1xyXG4gIGJhY2tncm91bmQ6ICNlZmVmZWY7XHJcbn1cclxuXHJcbi5leGFtcGxlLWVsZW1lbnQtcm93IHRkIHtcclxuICBib3JkZXItYm90dG9tLXdpZHRoOiAwO1xyXG59XHJcblxyXG4uZXhhbXBsZS1lbGVtZW50LWRldGFpbCB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG59XHJcblxyXG4uZXhhbXBsZS1lbGVtZW50LWRpYWdyYW0ge1xyXG4gIG1pbi13aWR0aDogODBweDtcclxuICBib3JkZXI6IDJweCBzb2xpZCBibGFjaztcclxuICBwYWRkaW5nOiA4cHg7XHJcbiAgZm9udC13ZWlnaHQ6IGxpZ2h0ZXI7XHJcbiAgbWFyZ2luOiA4cHggMDtcclxuICBoZWlnaHQ6IDEwNHB4O1xyXG59XHJcblxyXG4uZXhhbXBsZS1lbGVtZW50LXN5bWJvbCB7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgZm9udC1zaXplOiA0MHB4O1xyXG4gIGxpbmUtaGVpZ2h0OiBub3JtYWw7XHJcbn1cclxuXHJcbi5leGFtcGxlLWVsZW1lbnQtZGVzY3JpcHRpb24ge1xyXG4gIHBhZGRpbmc6IDE2cHg7XHJcbn1cclxuXHJcbi5leGFtcGxlLWVsZW1lbnQtZGVzY3JpcHRpb24tYXR0cmlidXRpb24ge1xyXG4gIG9wYWNpdHk6IDAuNTtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/order-pending/order-pending.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/order-pending/order-pending.component.ts ***!
  \**********************************************************/
/*! exports provided: OrderPendingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderPendingComponent", function() { return OrderPendingComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _order_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../order.service */ "./src/order.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");
/* harmony import */ var _WorkerAuth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../WorkerAuth.service */ "./src/WorkerAuth.service.ts");






var OrderPendingComponent = /** @class */ (function () {
    function OrderPendingComponent(order, worker) {
        this.order = order;
        this.worker = worker;
        this.Orders = [];
        this.displayedColumns = ['idOrder', 'orderStatus', 'orderDate'];
    }
    OrderPendingComponent.prototype.ngOnInit = function () {
        this.getAllPendingOrder();
    };
    OrderPendingComponent.prototype.getAllPendingOrder = function () {
        var _this = this;
        this.order.getPendingOrders().subscribe(function (data) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var order = data_1[_i];
                console.log(_this.Orders);
                _this.Orders.push(order);
            }
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTableDataSource"](_this.Orders);
        });
    };
    OrderPendingComponent.prototype.PickAnOrder = function (name) {
        var _this = this;
        console.log(name);
        this.Orders = [];
        this.worker.profile().subscribe(function (user) {
            _this.order.PickAnOrder(name, user.id).subscribe(function (data) {
                _this.getAllPendingOrder();
                console.log(data);
            });
        }, function (err) {
            console.error((err));
        });
    };
    OrderPendingComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-order-pending',
            template: __webpack_require__(/*! ./order-pending.component.html */ "./src/app/order-pending/order-pending.component.html"),
            animations: [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["trigger"])('detailExpand', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["state"])('collapsed', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["style"])({ height: '0px', minHeight: '0', display: 'none' })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["state"])('expanded', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["style"])({ height: '*' })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["transition"])('expanded <=> collapsed', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["animate"])('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                ]),
            ],
            styles: [__webpack_require__(/*! ./order-pending.component.scss */ "./src/app/order-pending/order-pending.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_order_service__WEBPACK_IMPORTED_MODULE_2__["OrderService"], _WorkerAuth_service__WEBPACK_IMPORTED_MODULE_5__["WorkerAuthService"]])
    ], OrderPendingComponent);
    return OrderPendingComponent;
}());



/***/ }),

/***/ "./src/app/profile/profile.component.html":
/*!************************************************!*\
  !*** ./src/app/profile/profile.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"profile-container\">\n  <div class=\"profile-menu\">\n    <div class=\"image-container\">\n      <img src=\"https://pixeltime.ro/profile.jpg\" alt=\"\">\n    </div>\n    <ul>\n      <li class=\"active\">Profile</li>\n      <li>Private Informations</li>\n      <li>Edit Profile</li>\n      <li>Logout</li>\n    </ul>\n  </div>\n  <div class=\"profile-content\">\n    <div class=\"actions\">\n      <mat-icon class=\"icon\">add_a_photo</mat-icon>\n      <mat-icon class=\"icon\">create</mat-icon>\n    </div>\n    <div class=\"pic\">\n      <img src=\"https://pixeltime.ro/profile.jpg\" alt=\"\">\n      <h2>{{details?.firstname}} {{details?.lastname}}</h2>\n      <span>{{details?.email}}</span>\n    </div>\n    <div class=\"summary\">\n      <div class=\"content\">\n        <span>0</span>\n        <span>Services</span>\n      </div>\n      <div class=\"content\">\n        <span>0</span>\n        <span>Review posted</span>\n      </div>\n    </div>\n    <div class=\"profile-details\">\n\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/profile/profile.component.scss":
/*!************************************************!*\
  !*** ./src/app/profile/profile.component.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".profile-container {\n  width: 485px;\n  height: 485px;\n  margin: 0 auto;\n  margin-top: 50px; }\n  .profile-container .profile-menu {\n    float: left;\n    width: 37%;\n    height: 482px;\n    background: #fff;\n    box-shadow: 0 0 25px rgba(0, 0, 0, 0.2); }\n  .profile-container .profile-menu .image-container {\n      width: 70px;\n      height: 70px;\n      margin: 60px; }\n  .profile-container .profile-menu .image-container img {\n        max-width: 100%;\n        height: auto;\n        border-radius: 50%; }\n  .profile-container .profile-menu .image-container img:hover {\n          opacity: 0.8; }\n  .profile-container .profile-menu ul {\n      list-style: none;\n      margin: 0;\n      padding: 0; }\n  .profile-container .profile-menu ul li {\n        padding: 10px 20px;\n        font-size: 13px; }\n  .profile-container .profile-menu ul li:hover, .profile-container .profile-menu ul li.active {\n          background: #f7f7f7;\n          border-left: 5px solid  #ff3c8a; }\n  .profile-container .profile-menu ul li:last-child {\n          margin-top: 50px; }\n  .profile-container .profile-content {\n    width: 63%;\n    float: right;\n    background: #fff;\n    box-shadow: 0 0 25px rgba(0, 0, 0, 0.2); }\n  .profile-container .profile-content .actions {\n      width: 100%;\n      background: linear-gradient(to right, #ff3c8a 0%, #ffbcd7 100%);\n      height: 40px;\n      line-height: 40;\n      color: #fff;\n      padding: 20px 0 0 0; }\n  .profile-container .profile-content .actions mat-icon {\n        padding-left: 20px;\n        float: left; }\n  .profile-container .profile-content .actions mat-icon:hover {\n          opacity: 0.8; }\n  .profile-container .profile-content .actions mat-icon + mat-icon {\n        padding-right: 20px;\n        float: right; }\n  .profile-container .profile-content .pic {\n      background: linear-gradient(to right, #ff3c8a 0%, #ffbcd7 100%);\n      text-align: center;\n      color: #fff;\n      padding: 0 0 20px 0; }\n  .profile-container .profile-content .pic img {\n        width: 90px;\n        height: auto;\n        border-radius: 50%; }\n  .profile-container .profile-content .pic img:hover {\n          opacity: 0.8; }\n  .profile-container .profile-content .pic h2 {\n        font-size: 17px;\n        padding: 0;\n        margin: 0;\n        font-weight: 400; }\n  .profile-container .profile-content .pic span {\n        font-size: 15px;\n        font-weight: 300; }\n  .profile-container .profile-content .summary {\n      color: #fff; }\n  .profile-container .profile-content .summary .content {\n        width: 50%;\n        float: left;\n        text-align: center;\n        display: block;\n        background: linear-gradient(to right, #ff3c8a 0%, #ffbcd7 100%);\n        padding: 10px 0; }\n  .profile-container .profile-content .summary .content span {\n          display: block;\n          font-size: 15px;\n          font-weight: 500; }\n  .profile-container .profile-content .profile-details {\n      padding: 0;\n      margin: 0;\n      color: #929292; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJvZmlsZS9DOlxcVXNlcnNcXE1hdHRoZXdcXERlc2t0b3BcXFByb2pldF9XRUIvc3JjXFxhcHBcXHByb2ZpbGVcXHByb2ZpbGUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFZO0VBQ1osYUFBYTtFQUNiLGNBQWM7RUFDZCxnQkFBZ0IsRUFBQTtFQUpsQjtJQU1JLFdBQVc7SUFDWCxVQUFVO0lBQ1YsYUFBYTtJQUNiLGdCQUFnQjtJQUNoQix1Q0FBOEIsRUFBQTtFQVZsQztNQVlNLFdBQVc7TUFDWCxZQUFZO01BQ1osWUFBWSxFQUFBO0VBZGxCO1FBZ0JRLGVBQWU7UUFDZixZQUFZO1FBQ1osa0JBQWlCLEVBQUE7RUFsQnpCO1VBb0JVLFlBQVksRUFBQTtFQXBCdEI7TUF5Qk0sZ0JBQWdCO01BQ2hCLFNBQVM7TUFDVCxVQUFVLEVBQUE7RUEzQmhCO1FBNkJRLGtCQUFrQjtRQUNsQixlQUFlLEVBQUE7RUE5QnZCO1VBZ0NVLG1CQUFtQjtVQUNuQiwrQkFBK0IsRUFBQTtFQWpDekM7VUFvQ1UsZ0JBQWdCLEVBQUE7RUFwQzFCO0lBMENJLFVBQVU7SUFDVixZQUFZO0lBQ1osZ0JBQWdCO0lBQ2hCLHVDQUE4QixFQUFBO0VBN0NsQztNQStDTSxXQUFXO01BQ1gsK0RBQStEO01BQy9ELFlBQVk7TUFDWixlQUFlO01BQ2YsV0FBVztNQUNYLG1CQUFtQixFQUFBO0VBcER6QjtRQXNEUSxrQkFBa0I7UUFDbEIsV0FBVyxFQUFBO0VBdkRuQjtVQXlEVSxZQUFZLEVBQUE7RUF6RHRCO1FBNkRRLG1CQUFtQjtRQUNuQixZQUFZLEVBQUE7RUE5RHBCO01Ba0VNLCtEQUErRDtNQUMvRCxrQkFBa0I7TUFDbEIsV0FBVztNQUNYLG1CQUFtQixFQUFBO0VBckV6QjtRQXVFUSxXQUFXO1FBQ1gsWUFBWTtRQUNaLGtCQUFrQixFQUFBO0VBekUxQjtVQTJFVSxZQUFZLEVBQUE7RUEzRXRCO1FBK0VRLGVBQWU7UUFDZixVQUFVO1FBQ1YsU0FBUztRQUNULGdCQUFnQixFQUFBO0VBbEZ4QjtRQXFGUSxlQUFlO1FBQ2YsZ0JBQWdCLEVBQUE7RUF0RnhCO01BMEZNLFdBQVcsRUFBQTtFQTFGakI7UUE0RlEsVUFBVTtRQUNWLFdBQVc7UUFDWCxrQkFBa0I7UUFDbEIsY0FBYztRQUNkLCtEQUFnRTtRQUNoRSxlQUFlLEVBQUE7RUFqR3ZCO1VBbUdVLGNBQWM7VUFDZCxlQUFlO1VBQ2YsZ0JBQWdCLEVBQUE7RUFyRzFCO01BMEdNLFVBQVU7TUFDVixTQUFTO01BQ1QsY0FBYyxFQUFBIiwiZmlsZSI6InNyYy9hcHAvcHJvZmlsZS9wcm9maWxlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnByb2ZpbGUtY29udGFpbmVye1xyXG4gIHdpZHRoOiA0ODVweDtcclxuICBoZWlnaHQ6IDQ4NXB4O1xyXG4gIG1hcmdpbjogMCBhdXRvO1xyXG4gIG1hcmdpbi10b3A6IDUwcHg7XHJcbiAgLnByb2ZpbGUtbWVudXtcclxuICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgd2lkdGg6IDM3JTtcclxuICAgIGhlaWdodDogNDgycHg7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gICAgYm94LXNoYWRvdzogMCAwIDI1cHggcmdiYSgjMDAwLCAwLjIpO1xyXG4gICAgLmltYWdlLWNvbnRhaW5lcntcclxuICAgICAgd2lkdGg6IDcwcHg7XHJcbiAgICAgIGhlaWdodDogNzBweDtcclxuICAgICAgbWFyZ2luOiA2MHB4O1xyXG4gICAgICBpbWd7XHJcbiAgICAgICAgbWF4LXdpZHRoOiAxMDAlO1xyXG4gICAgICAgIGhlaWdodDogYXV0bztcclxuICAgICAgICBib3JkZXItcmFkaXVzOjUwJTtcclxuICAgICAgICAmOmhvdmVye1xyXG4gICAgICAgICAgb3BhY2l0eTogMC44O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdWx7XHJcbiAgICAgIGxpc3Qtc3R5bGU6IG5vbmU7XHJcbiAgICAgIG1hcmdpbjogMDtcclxuICAgICAgcGFkZGluZzogMDtcclxuICAgICAgbGl7XHJcbiAgICAgICAgcGFkZGluZzogMTBweCAyMHB4O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgICAgICAmOmhvdmVyLCAmLmFjdGl2ZXtcclxuICAgICAgICAgIGJhY2tncm91bmQ6ICNmN2Y3Zjc7XHJcbiAgICAgICAgICBib3JkZXItbGVmdDogNXB4IHNvbGlkICAjZmYzYzhhO1xyXG4gICAgICAgIH1cclxuICAgICAgICAmOmxhc3QtY2hpbGR7XHJcbiAgICAgICAgICBtYXJnaW4tdG9wOiA1MHB4O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICAucHJvZmlsZS1jb250ZW50e1xyXG4gICAgd2lkdGg6IDYzJTtcclxuICAgIGZsb2F0OiByaWdodDtcclxuICAgIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgICBib3gtc2hhZG93OiAwIDAgMjVweCByZ2JhKCMwMDAsIDAuMik7XHJcbiAgICAuYWN0aW9uc3tcclxuICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgI2ZmM2M4YSAwJSwgI2ZmYmNkNyAxMDAlKTtcclxuICAgICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgICBsaW5lLWhlaWdodDogNDA7XHJcbiAgICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgICBwYWRkaW5nOiAyMHB4IDAgMCAwO1xyXG4gICAgICBtYXQtaWNvbntcclxuICAgICAgICBwYWRkaW5nLWxlZnQ6IDIwcHg7XHJcbiAgICAgICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICAgICAgJjpob3ZlcntcclxuICAgICAgICAgIG9wYWNpdHk6IDAuODtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgbWF0LWljb24rbWF0LWljb257XHJcbiAgICAgICAgcGFkZGluZy1yaWdodDogMjBweDtcclxuICAgICAgICBmbG9hdDogcmlnaHQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC5waWN7XHJcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgI2ZmM2M4YSAwJSwgI2ZmYmNkNyAxMDAlKTtcclxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICBjb2xvcjogI2ZmZjtcclxuICAgICAgcGFkZGluZzogMCAwIDIwcHggMDtcclxuICAgICAgaW1ne1xyXG4gICAgICAgIHdpZHRoOiA5MHB4O1xyXG4gICAgICAgIGhlaWdodDogYXV0bztcclxuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICAgICAgJjpob3ZlcntcclxuICAgICAgICAgIG9wYWNpdHk6IDAuODtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaDJ7XHJcbiAgICAgICAgZm9udC1zaXplOiAxN3B4O1xyXG4gICAgICAgIHBhZGRpbmc6IDA7XHJcbiAgICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbiAgICAgIH1cclxuICAgICAgc3BhbntcclxuICAgICAgICBmb250LXNpemU6IDE1cHg7XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDMwMDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLnN1bW1hcnl7XHJcbiAgICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgICAuY29udGVudHtcclxuICAgICAgICB3aWR0aDogNTAlO1xyXG4gICAgICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICAjZmYzYzhhIDAlLCAjZmZiY2Q3IDEwMCUpO1xyXG4gICAgICAgIHBhZGRpbmc6IDEwcHggMDtcclxuICAgICAgICBzcGFue1xyXG4gICAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgICBmb250LXNpemU6IDE1cHg7XHJcbiAgICAgICAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLnByb2ZpbGUtZGV0YWlsc3tcclxuICAgICAgcGFkZGluZzogMDtcclxuICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICBjb2xvcjogIzkyOTI5MjtcclxuXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/profile/profile.component.ts":
/*!**********************************************!*\
  !*** ./src/app/profile/profile.component.ts ***!
  \**********************************************/
/*! exports provided: ProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileComponent", function() { return ProfileComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _authentification_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../authentification.service */ "./src/authentification.service.ts");



var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(auth) {
        this.auth = auth;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.auth.profile().subscribe(function (user) {
            _this.details = user;
        }, function (err) {
            console.error((err));
        });
    };
    ProfileComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-profile',
            template: __webpack_require__(/*! ./profile.component.html */ "./src/app/profile/profile.component.html"),
            styles: [__webpack_require__(/*! ./profile.component.scss */ "./src/app/profile/profile.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_authentification_service__WEBPACK_IMPORTED_MODULE_2__["AuthentificationService"]])
    ], ProfileComponent);
    return ProfileComponent;
}());



/***/ }),

/***/ "./src/app/register/register.component.html":
/*!**************************************************!*\
  !*** ./src/app/register/register.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n  <h2>Register</h2>\n  <form class=\"example-form\" [formGroup]=\"userForm\" (ngSubmit)=\"onSubmitForm()\">\n    <table class=\"example-full-width\" cellspacing=\"0\"><tr>\n      <td><mat-form-field class=\"example-full-width\">\n        <input matInput placeholder=\"First name\" formControlName=\"firstname\">\n      </mat-form-field></td>\n      <td><mat-form-field class=\"example-full-width\">\n        <input matInput placeholder=\"Last Name\" formControlName=\"lastname\">\n      </mat-form-field></td>\n    </tr></table>\n    <mat-form-field class=\"example-full-width\">\n      <input matInput placeholder=\"Email\" formControlName=\"email\">\n    </mat-form-field>\n    <mat-form-field class=\"example-full-width\">\n      <input type=\"password\" matInput placeholder=\"Password\" formControlName=\"password\">\n    </mat-form-field>\n    <mat-form-field class=\"example-full-width\">\n      <input type=\"password\" matInput placeholder=\"Confirm Password\" formControlName=\"cpassword\">\n    </mat-form-field>\n    <mat-form-field class=\"example-full-width\">\n      <span matPrefix>+33 &nbsp;</span>\n      <input type=\"tel\" matInput placeholder=\"Telephone\" formControlName=\"phone\">\n      <mat-icon matSuffix>mode_edit</mat-icon>\n    </mat-form-field>\n    <button mat-raised-button color=\"accent\" type=\"submit\" [disabled]=\"userForm.invalid\">Submit</button>\n  </form>\n</mat-card>\n\n"

/***/ }),

/***/ "./src/app/register/register.component.scss":
/*!**************************************************!*\
  !*** ./src/app/register/register.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "h2 {\n  text-align: center; }\n\nmat-card {\n  min-width: 150px;\n  max-width: 500px;\n  width: 100%;\n  margin: 0 auto;\n  margin-top: 10%;\n  margin-bottom: 10%; }\n\n.example-form {\n  min-width: 150px;\n  max-width: 500px;\n  width: 90%; }\n\n.example-full-width {\n  width: 100%; }\n\ntd {\n  padding-right: 8px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcmVnaXN0ZXIvQzpcXFVzZXJzXFxNYXR0aGV3XFxEZXNrdG9wXFxQcm9qZXRfV0VCL3NyY1xcYXBwXFxyZWdpc3RlclxccmVnaXN0ZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBa0IsRUFBQTs7QUFHcEI7RUFDRSxnQkFBZ0I7RUFDaEIsZ0JBQWdCO0VBQ2hCLFdBQVk7RUFDWixjQUFjO0VBQ2QsZUFBZTtFQUNmLGtCQUFrQixFQUFBOztBQUdwQjtFQUNFLGdCQUFnQjtFQUNoQixnQkFBZ0I7RUFDaEIsVUFBVyxFQUFBOztBQUdiO0VBQ0UsV0FBVyxFQUFBOztBQUdiO0VBQ0Usa0JBQWtCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9yZWdpc3Rlci9yZWdpc3Rlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImgyIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbm1hdC1jYXJkIHtcclxuICBtaW4td2lkdGg6IDE1MHB4O1xyXG4gIG1heC13aWR0aDogNTAwcHg7XHJcbiAgd2lkdGg6IDEwMCUgO1xyXG4gIG1hcmdpbjogMCBhdXRvO1xyXG4gIG1hcmdpbi10b3A6IDEwJTtcclxuICBtYXJnaW4tYm90dG9tOiAxMCU7XHJcbn1cclxuXHJcbi5leGFtcGxlLWZvcm0ge1xyXG4gIG1pbi13aWR0aDogMTUwcHg7XHJcbiAgbWF4LXdpZHRoOiA1MDBweDtcclxuICB3aWR0aDogOTAlIDtcclxufVxyXG5cclxuLmV4YW1wbGUtZnVsbC13aWR0aCB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbnRke1xyXG4gIHBhZGRpbmctcmlnaHQ6IDhweDtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/register/register.component.ts":
/*!************************************************!*\
  !*** ./src/app/register/register.component.ts ***!
  \************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _authentification_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../authentification.service */ "./src/authentification.service.ts");





var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(formBuilder, auth, router) {
        this.formBuilder = formBuilder;
        this.auth = auth;
        this.router = router;
        this.credentials = {
            id: 0,
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            phone: '',
        };
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.initForm();
    };
    RegisterComponent.prototype.initForm = function () {
        this.userForm = this.formBuilder.group({
            firstname: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            lastname: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].email]],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            cpassword: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            phone: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
    };
    // @ts-ignore
    RegisterComponent.prototype.onSubmitForm = function () {
        var _this = this;
        var formValue = this.userForm.value;
        if (formValue.password != formValue.cpassword) {
            alert('Passwords do not match');
            return;
        }
        this.credentials.firstname = formValue.firstname;
        this.credentials.lastname = formValue.lastname;
        this.credentials.email = formValue.email;
        this.credentials.password = formValue.password;
        this.credentials.phone = formValue.phone;
        this.auth.register(this.credentials).subscribe(function (data) {
            console.log(data);
            if (data.error == 'User already exists') {
                alert('User already exist');
            }
            else {
                _this.router.navigate(['profile']);
            }
        }, function (err) {
            console.error(err);
        });
    };
    RegisterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(/*! ./register.component.html */ "./src/app/register/register.component.html"),
            styles: [__webpack_require__(/*! ./register.component.scss */ "./src/app/register/register.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _authentification_service__WEBPACK_IMPORTED_MODULE_4__["AuthentificationService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], RegisterComponent);
    return RegisterComponent;
}());



/***/ }),

/***/ "./src/app/services-list/services-list.component.html":
/*!************************************************************!*\
  !*** ./src/app/services-list/services-list.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"service\" *ngFor=\"let service of this.MyServices\">\n    <mat-card>\n      <h2>{{service.name}}</h2>\n      <h4>{{service.idType}}</h4>\n      <img id=\"img1\" src=\"assets/images/service.jpg\">\n      <p>{{service.price}} €</p>\n      <p>{{service.desc}}</p>\n      <button mat-raised-button color=\"accent\" type=\"submit\" (click)=\"OrderOne(service.name)\">Order</button>\n    </mat-card>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/services-list/services-list.component.scss":
/*!************************************************************!*\
  !*** ./src/app/services-list/services-list.component.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#img1 {\n  width: 90%;\n  text-align: center;\n  display: block; }\n\nimg {\n  margin: 0 auto;\n  display: block; }\n\n.container {\n  min-width: 150px;\n  max-width: 500px;\n  width: 100%;\n  height: 485px;\n  margin: 0 auto;\n  margin-top: 50px;\n  text-align: center; }\n\n.container .service {\n    width: 50%;\n    float: left;\n    text-align: center;\n    display: block;\n    box-shadow: 0 0 25px rgba(0, 0, 0, 0.2); }\n\n.container .service .h1 {\n      padding-top: 5px; }\n\n.container .service .h1 .h2 {\n        padding-top: 5px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VydmljZXMtbGlzdC9DOlxcVXNlcnNcXE1hdHRoZXdcXERlc2t0b3BcXFByb2pldF9XRUIvc3JjXFxhcHBcXHNlcnZpY2VzLWxpc3RcXHNlcnZpY2VzLWxpc3QuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxVQUFVO0VBQ1Ysa0JBQWtCO0VBQ2xCLGNBQWMsRUFBQTs7QUFHaEI7RUFDRSxjQUFjO0VBQ2QsY0FBYyxFQUFBOztBQUdoQjtFQUNFLGdCQUFnQjtFQUNoQixnQkFBZ0I7RUFDaEIsV0FBVztFQUNYLGFBQWE7RUFDYixjQUFjO0VBQ2QsZ0JBQWdCO0VBQ2hCLGtCQUFrQixFQUFBOztBQVBwQjtJQVVJLFVBQVU7SUFDVixXQUFXO0lBQ1gsa0JBQWtCO0lBQ2xCLGNBQWM7SUFDZCx1Q0FBOEIsRUFBQTs7QUFkbEM7TUFpQk0sZ0JBQWdCLEVBQUE7O0FBakJ0QjtRQW9CUSxnQkFBZ0IsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3NlcnZpY2VzLWxpc3Qvc2VydmljZXMtbGlzdC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiNpbWcxe1xyXG4gIHdpZHRoOiA5MCU7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcblxyXG5pbWd7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbn1cclxuXHJcbi5jb250YWluZXIge1xyXG4gIG1pbi13aWR0aDogMTUwcHg7XHJcbiAgbWF4LXdpZHRoOiA1MDBweDtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDQ4NXB4O1xyXG4gIG1hcmdpbjogMCBhdXRvO1xyXG4gIG1hcmdpbi10b3A6IDUwcHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG5cclxuICAuc2VydmljZSB7XHJcbiAgICB3aWR0aDogNTAlO1xyXG4gICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIGJveC1zaGFkb3c6IDAgMCAyNXB4IHJnYmEoIzAwMCwgMC4yKTtcclxuXHJcbiAgICAuaDEge1xyXG4gICAgICBwYWRkaW5nLXRvcDogNXB4O1xyXG5cclxuICAgICAgLmgyIHtcclxuICAgICAgICBwYWRkaW5nLXRvcDogNXB4O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/services-list/services-list.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/services-list/services-list.component.ts ***!
  \**********************************************************/
/*! exports provided: ServicesListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServicesListComponent", function() { return ServicesListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services.service */ "./src/services.service.ts");
/* harmony import */ var _authentification_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../authentification.service */ "./src/authentification.service.ts");
/* harmony import */ var _order_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../order.service */ "./src/order.service.ts");





var ServicesListComponent = /** @class */ (function () {
    function ServicesListComponent(services, auth, order) {
        this.services = services;
        this.auth = auth;
        this.order = order;
    }
    ServicesListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.services.getServices().subscribe(function (service) {
            _this.MyServices = service;
            var AllServices = [];
            for (var i = 0; i < _this.MyServices.length; i++) {
                _this.GetLibelle(_this.MyServices[i].idType, i);
            }
        }, function (err) {
            console.error((err));
        });
    };
    ServicesListComponent.prototype.GetLibelle = function (type, i) {
        var _this = this;
        this.services.LibelleOfServices(type).subscribe(function (data) {
            _this.MyServices[i].idType = data.libelle.toString();
            console.log(_this.MyServices);
        });
    };
    ServicesListComponent.prototype.OrderOne = function (name) {
        var _this = this;
        this.auth.profile().subscribe(function (user) {
            _this.order.OrderOne(name, user.id);
            alert('Ty for your order');
        }, function (err) {
            console.error((err));
        });
    };
    ServicesListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-services-list',
            template: __webpack_require__(/*! ./services-list.component.html */ "./src/app/services-list/services-list.component.html"),
            styles: [__webpack_require__(/*! ./services-list.component.scss */ "./src/app/services-list/services-list.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_service__WEBPACK_IMPORTED_MODULE_2__["ServicesService"],
            _authentification_service__WEBPACK_IMPORTED_MODULE_3__["AuthentificationService"],
            _order_service__WEBPACK_IMPORTED_MODULE_4__["OrderService"]])
    ], ServicesListComponent);
    return ServicesListComponent;
}());



/***/ }),

/***/ "./src/app/services/dialog-overview-example-dialog.html":
/*!**************************************************************!*\
  !*** ./src/app/services/dialog-overview-example-dialog.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div mat-dialog-content>\r\n  <p>Upload File</p>\r\n  <input #file type=\"file\" [hidden]=\"true\" accept=\"image/*\" [(ngModel)]=\"data.file\">\r\n  <button mat-button (click)= \"file.click()\">\r\n    <mat-icon color=\"accent\">file_upload</mat-icon>\r\n  </button>\r\n</div>\r\n<div mat-dialog-actions>\r\n  <button mat-button (click)=\"onNoClick()\">Back</button>\r\n  <button mat-button>Upload</button>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/services/services.component.html":
/*!**************************************************!*\
  !*** ./src/app/services/services.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"form\">\n    <mat-card>\n      <h1>Form</h1>\n      <form [formGroup]=\"serviceForm\" (ngSubmit)=\"onSubmitForm()\">\n        <button mat-icon-button type=\"submit\" (click)=\"openDialog()\">\n          <mat-icon color=\"accent\">cloud_upload</mat-icon>\n        </button>\n        <mat-form-field appearance=\"outline\">\n          <mat-label>Service name</mat-label>\n          <input matInput placeholder=\"Enter service name\" formControlName=\"name\">\n        </mat-form-field>\n        <mat-form-field>\n          <mat-label>Services Types</mat-label>\n          <mat-select formControlName=\"type\">\n            <mat-option>-- None --</mat-option>\n            <mat-optgroup *ngFor=\"let group of TypesGroups\" [label]=\"group.name\"\n                          [disabled]=\"group.disabled\">\n              <mat-option *ngFor=\"let type of group.type\" [value]=\"type\">\n                {{type.libelle}}\n              </mat-option>\n            </mat-optgroup>\n          </mat-select>\n        </mat-form-field>\n        <mat-slider [max]=\"50\" [min]=\"0\" [step]=\"0.5\" [thumbLabel]=\"true\" formControlName=\"price\"></mat-slider>\n        <mat-form-field class=\"example-full-width\">\n          <textarea matInput #message maxlength=\"42\" placeholder=\"Description\" formControlName=\"desc\"></textarea>\n          <mat-hint align=\"start\"><strong>Describe the service</strong> </mat-hint>\n          <mat-hint align=\"end\">{{message.value.length}} / 42</mat-hint>\n        </mat-form-field>\n        <button id=\"button1\" mat-raised-button color=\"accent\" type=\"submit\" [disabled]=\"serviceForm.invalid\">Submit</button>\n      </form>\n    </mat-card>\n  </div>\n  <div class=\"preview\">\n    <mat-card>\n      <h1>Preview</h1>\n\n      <h2>{{serviceForm.value['name']}}</h2>\n      <h4>{{serviceForm.value['type'].libelle}}</h4>\n      <img id=\"img1\" src=\"assets/images/service.jpg\">\n      <h4>{{serviceForm.value['price']}} €</h4>\n      <p>{{serviceForm.value['desc']}}</p>\n    </mat-card>\n  </div>\n</div>\n\n"

/***/ }),

/***/ "./src/app/services/services.component.scss":
/*!**************************************************!*\
  !*** ./src/app/services/services.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#button1 {\n  margin-top: 30px;\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); }\n\n#img1 {\n  width: 90%;\n  text-align: center;\n  display: block; }\n\nimg {\n  margin: 0 auto;\n  display: block; }\n\n.container {\n  min-width: 150px;\n  max-width: 500px;\n  width: 100%;\n  height: 485px;\n  margin: 0 auto;\n  margin-top: 50px;\n  text-align: center; }\n\n.container .form {\n    width: 50%;\n    float: left;\n    text-align: center;\n    display: block;\n    box-shadow: 0 0 25px rgba(0, 0, 0, 0.2); }\n\n.container .form .button {\n      margin-top: 50px; }\n\n.container .form .mat-icon {\n      font-size: 64px;\n      margin: 0 auto;\n      height: 64px;\n      width: 64px;\n      margin-bottom: 30px; }\n\n.container .form .mat-icon:hover {\n        opacity: 0.8; }\n\n.container .form .textarea {\n      margin-top: 30px; }\n\n.container .form .mat-slider {\n      width: 90%; }\n\n.container .preview {\n    width: 50%;\n    float: left;\n    text-align: center;\n    display: block;\n    box-shadow: 0 0 25px rgba(0, 0, 0, 0.2); }\n\n.container .preview .h1 {\n      padding-top: 5px; }\n\n.container .preview .h1 .h2 {\n        padding-top: 5px; }\n\nmat-icon {\n  font-size: 64px;\n  margin: 0 auto;\n  height: 64px;\n  width: 64px; }\n\nmat-icon:hover {\n    opacity: 0.8; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VydmljZXMvQzpcXFVzZXJzXFxNYXR0aGV3XFxEZXNrdG9wXFxQcm9qZXRfV0VCL3NyY1xcYXBwXFxzZXJ2aWNlc1xcc2VydmljZXMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBZ0I7RUFDaEIsdUNBQThCLEVBQUE7O0FBRWhDO0VBQ0UsVUFBVTtFQUNWLGtCQUFrQjtFQUNsQixjQUFjLEVBQUE7O0FBR2hCO0VBQ0UsY0FBYztFQUNkLGNBQWMsRUFBQTs7QUFHaEI7RUFDRSxnQkFBZ0I7RUFDaEIsZ0JBQWdCO0VBQ2hCLFdBQVk7RUFDWixhQUFhO0VBQ2IsY0FBYztFQUNkLGdCQUFnQjtFQUNoQixrQkFBa0IsRUFBQTs7QUFQcEI7SUFVSSxVQUFVO0lBQ1YsV0FBVztJQUNYLGtCQUFrQjtJQUNsQixjQUFjO0lBQ2QsdUNBQThCLEVBQUE7O0FBZGxDO01BZ0JNLGdCQUFlLEVBQUE7O0FBaEJyQjtNQW1CTSxlQUFlO01BQ2YsY0FBYztNQUNkLFlBQVk7TUFDWixXQUFXO01BQ1gsbUJBQW1CLEVBQUE7O0FBdkJ6QjtRQXlCUSxZQUFZLEVBQUE7O0FBekJwQjtNQTZCTSxnQkFBZ0IsRUFBQTs7QUE3QnRCO01BZ0NNLFVBQVUsRUFBQTs7QUFoQ2hCO0lBb0NJLFVBQVU7SUFDVixXQUFXO0lBQ1gsa0JBQWtCO0lBQ2xCLGNBQWM7SUFDZCx1Q0FBOEIsRUFBQTs7QUF4Q2xDO01BMENNLGdCQUFnQixFQUFBOztBQTFDdEI7UUE0Q1EsZ0JBQWdCLEVBQUE7O0FBTXhCO0VBQ0UsZUFBZTtFQUNmLGNBQWM7RUFDZCxZQUFZO0VBQ1osV0FBVyxFQUFBOztBQUpiO0lBTUksWUFBWSxFQUFBIiwiZmlsZSI6InNyYy9hcHAvc2VydmljZXMvc2VydmljZXMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjYnV0dG9uMXtcclxuICBtYXJnaW4tdG9wOiAzMHB4O1xyXG4gIGJveC1zaGFkb3c6IDAgMCAxMHB4IHJnYmEoIzAwMCwgMC4yKTtcclxufVxyXG4jaW1nMXtcclxuICB3aWR0aDogOTAlO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBkaXNwbGF5OiBibG9jaztcclxufVxyXG5cclxuaW1ne1xyXG4gIG1hcmdpbjogMCBhdXRvO1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcblxyXG4uY29udGFpbmVyIHtcclxuICBtaW4td2lkdGg6IDE1MHB4O1xyXG4gIG1heC13aWR0aDogNTAwcHg7XHJcbiAgd2lkdGg6IDEwMCUgO1xyXG4gIGhlaWdodDogNDg1cHg7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbiAgbWFyZ2luLXRvcDogNTBweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblxyXG4gIC5mb3JtIHtcclxuICAgIHdpZHRoOiA1MCU7XHJcbiAgICBmbG9hdDogbGVmdDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgYm94LXNoYWRvdzogMCAwIDI1cHggcmdiYSgjMDAwLCAwLjIpO1xyXG4gICAgLmJ1dHRvbntcclxuICAgICAgbWFyZ2luLXRvcDo1MHB4O1xyXG4gICAgfVxyXG4gICAgLm1hdC1pY29ue1xyXG4gICAgICBmb250LXNpemU6IDY0cHg7XHJcbiAgICAgIG1hcmdpbjogMCBhdXRvO1xyXG4gICAgICBoZWlnaHQ6IDY0cHg7XHJcbiAgICAgIHdpZHRoOiA2NHB4O1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xyXG4gICAgICAmOmhvdmVye1xyXG4gICAgICAgIG9wYWNpdHk6IDAuODtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLnRleHRhcmVhe1xyXG4gICAgICBtYXJnaW4tdG9wOiAzMHB4O1xyXG4gICAgfVxyXG4gICAgLm1hdC1zbGlkZXJ7XHJcbiAgICAgIHdpZHRoOiA5MCU7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC5wcmV2aWV3IHtcclxuICAgIHdpZHRoOiA1MCU7XHJcbiAgICBmbG9hdDogbGVmdDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgYm94LXNoYWRvdzogMCAwIDI1cHggcmdiYSgjMDAwLCAwLjIpO1xyXG4gICAgLmgxe1xyXG4gICAgICBwYWRkaW5nLXRvcDogNXB4O1xyXG4gICAgICAuaDJ7XHJcbiAgICAgICAgcGFkZGluZy10b3A6IDVweDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxubWF0LWljb257XHJcbiAgZm9udC1zaXplOiA2NHB4O1xyXG4gIG1hcmdpbjogMCBhdXRvO1xyXG4gIGhlaWdodDogNjRweDtcclxuICB3aWR0aDogNjRweDtcclxuICAmOmhvdmVye1xyXG4gICAgb3BhY2l0eTogMC44O1xyXG4gIH1cclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/services/services.component.ts":
/*!************************************************!*\
  !*** ./src/app/services/services.component.ts ***!
  \************************************************/
/*! exports provided: ServicesComponent, DialogOverviewExampleDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServicesComponent", function() { return ServicesComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogOverviewExampleDialogComponent", function() { return DialogOverviewExampleDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services.service */ "./src/services.service.ts");






var ServicesComponent = /** @class */ (function () {
    function ServicesComponent(dialog, formBuilder, services, router) {
        this.dialog = dialog;
        this.formBuilder = formBuilder;
        this.services = services;
        this.router = router;
        this.TypesGroups = [];
        this.infos = {
            name: '',
            type: '',
            desc: '',
            price: 0
        };
    }
    ServicesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initForm();
        this.services.getTypes().subscribe(function (service) {
            var add = {
                name: 'Ménager',
                type: service
            };
            console.log(add);
            _this.TypesGroups.push(add);
        }, function (err) {
            console.error((err));
        });
    };
    ServicesComponent.prototype.initForm = function () {
        this.serviceForm = this.formBuilder.group({
            name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            type: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            desc: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            price: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
    };
    ServicesComponent.prototype.onSubmitForm = function () {
        var _this = this;
        var formValue = this.serviceForm.value;
        this.infos.name = formValue['name'];
        this.infos.type = formValue['type'].idType;
        this.infos.desc = formValue['desc'];
        this.infos.price = formValue['price'];
        this.services.addService2(this.infos).then(function (res) {
            _this.router.navigate(['/services-list']);
        });
    };
    ServicesComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
            width: '250px',
            data: { file: this.file }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            _this.file = result;
        });
    };
    ServicesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-services',
            template: __webpack_require__(/*! ./services.component.html */ "./src/app/services/services.component.html"),
            styles: [__webpack_require__(/*! ./services.component.scss */ "./src/app/services/services.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _services_service__WEBPACK_IMPORTED_MODULE_5__["ServicesService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], ServicesComponent);
    return ServicesComponent;
}());

var DialogOverviewExampleDialogComponent = /** @class */ (function () {
    function DialogOverviewExampleDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    DialogOverviewExampleDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    DialogOverviewExampleDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-dialog-overview-example-dialog',
            template: __webpack_require__(/*! ./dialog-overview-example-dialog.html */ "./src/app/services/dialog-overview-example-dialog.html"),
            styles: [__webpack_require__(/*! ./services.component.scss */ "./src/app/services/services.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"], Object])
    ], DialogOverviewExampleDialogComponent);
    return DialogOverviewExampleDialogComponent;
}());



/***/ }),

/***/ "./src/app/worker-login/worker-login.component.html":
/*!**********************************************************!*\
  !*** ./src/app/worker-login/worker-login.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n  <h2>Login</h2>\n  <form class=\"example-form\" [formGroup]=\"userForm\" (ngSubmit)=\"onSubmitForm()\">\n    <mat-form-field class=\"example-full-width\">\n      <input matInput placeholder=\"Email\" formControlName=\"email\">\n    </mat-form-field>\n    <mat-form-field class=\"example-full-width\">\n      <input type=\"password\" matInput placeholder=\"Password\" formControlName=\"password\">\n    </mat-form-field>\n    <button mat-raised-button color=\"accent\" type=\"submit\" [disabled]=\"userForm.invalid\">Login</button>\n  </form>\n</mat-card>\n"

/***/ }),

/***/ "./src/app/worker-login/worker-login.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/worker-login/worker-login.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "h2 {\n  text-align: center; }\n\nmat-card {\n  min-width: 150px;\n  max-width: 500px;\n  width: 100%;\n  margin: 0 auto;\n  margin-top: 10%;\n  margin-bottom: 10%; }\n\n.example-form {\n  min-width: 150px;\n  max-width: 500px;\n  width: 90%; }\n\n.example-full-width {\n  width: 100%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvd29ya2VyLWxvZ2luL0M6XFxVc2Vyc1xcTWF0dGhld1xcRGVza3RvcFxcUHJvamV0X1dFQi9zcmNcXGFwcFxcd29ya2VyLWxvZ2luXFx3b3JrZXItbG9naW4uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBa0IsRUFBQTs7QUFHcEI7RUFDRSxnQkFBZ0I7RUFDaEIsZ0JBQWdCO0VBQ2hCLFdBQVk7RUFDWixjQUFjO0VBQ2QsZUFBZTtFQUNmLGtCQUFrQixFQUFBOztBQUdwQjtFQUNFLGdCQUFnQjtFQUNoQixnQkFBZ0I7RUFDaEIsVUFBVyxFQUFBOztBQUdiO0VBQ0UsV0FBVyxFQUFBIiwiZmlsZSI6InNyYy9hcHAvd29ya2VyLWxvZ2luL3dvcmtlci1sb2dpbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImgyIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbm1hdC1jYXJkIHtcclxuICBtaW4td2lkdGg6IDE1MHB4O1xyXG4gIG1heC13aWR0aDogNTAwcHg7XHJcbiAgd2lkdGg6IDEwMCUgO1xyXG4gIG1hcmdpbjogMCBhdXRvO1xyXG4gIG1hcmdpbi10b3A6IDEwJTtcclxuICBtYXJnaW4tYm90dG9tOiAxMCU7XHJcbn1cclxuXHJcbi5leGFtcGxlLWZvcm0ge1xyXG4gIG1pbi13aWR0aDogMTUwcHg7XHJcbiAgbWF4LXdpZHRoOiA1MDBweDtcclxuICB3aWR0aDogOTAlIDtcclxufVxyXG5cclxuLmV4YW1wbGUtZnVsbC13aWR0aCB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/worker-login/worker-login.component.ts":
/*!********************************************************!*\
  !*** ./src/app/worker-login/worker-login.component.ts ***!
  \********************************************************/
/*! exports provided: WorkerLoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkerLoginComponent", function() { return WorkerLoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _WorkerAuth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../WorkerAuth.service */ "./src/WorkerAuth.service.ts");





var WorkerLoginComponent = /** @class */ (function () {
    function WorkerLoginComponent(formBuilder, worker, router) {
        this.formBuilder = formBuilder;
        this.worker = worker;
        this.router = router;
        this.credentials = {
            id: 0,
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            phone: '',
        };
    }
    WorkerLoginComponent.prototype.ngOnInit = function () {
        this.initForm();
    };
    WorkerLoginComponent.prototype.initForm = function () {
        this.userForm = this.formBuilder.group({
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].email]],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
    };
    WorkerLoginComponent.prototype.onSubmitForm = function () {
        var _this = this;
        var formValue = this.userForm.value;
        this.credentials.email = formValue.email;
        this.credentials.password = formValue.password;
        this.worker.login(this.credentials).subscribe(function (data) {
            console.log(data);
            if (data.error === 'Incorrect Details') {
                alert(data.error);
            }
            else {
                _this.router.navigate(['worker-profile']);
            }
        });
    };
    WorkerLoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-worker-login',
            template: __webpack_require__(/*! ./worker-login.component.html */ "./src/app/worker-login/worker-login.component.html"),
            styles: [__webpack_require__(/*! ./worker-login.component.scss */ "./src/app/worker-login/worker-login.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _WorkerAuth_service__WEBPACK_IMPORTED_MODULE_4__["WorkerAuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], WorkerLoginComponent);
    return WorkerLoginComponent;
}());



/***/ }),

/***/ "./src/app/worker-profile/worker-profile.component.html":
/*!**************************************************************!*\
  !*** ./src/app/worker-profile/worker-profile.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"profile-container\">\n  <div class=\"profile-menu\">\n    <div class=\"image-container\">\n      <img src=\"https://pixeltime.ro/profile.jpg\" alt=\"\">\n    </div>\n    <ul>\n      <li class=\"active\">Profile</li>\n      <li>Private Informations</li>\n      <li>Edit Profile</li>\n      <li>Logout</li>\n    </ul>\n  </div>\n  <div class=\"profile-content\">\n    <div class=\"actions\">\n      <mat-icon class=\"icon\">add_a_photo</mat-icon>\n      <mat-icon class=\"icon\">create</mat-icon>\n    </div>\n    <div class=\"pic\">\n      <img src=\"https://pixeltime.ro/profile.jpg\" alt=\"\">\n      <h2>{{details?.firstname}} {{details?.lastname}}</h2>\n      <span>{{details?.email}}</span>\n    </div>\n    <div class=\"summary\">\n      <div class=\"content\">\n        <span>0</span>\n        <span>Services</span>\n      </div>\n      <div class=\"content\">\n        <span>0</span>\n        <span>Review posted</span>\n      </div>\n    </div>\n    <div class=\"profile-details\">\n\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/worker-profile/worker-profile.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/worker-profile/worker-profile.component.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".profile-container {\n  width: 485px;\n  height: 485px;\n  margin: 0 auto;\n  margin-top: 50px; }\n  .profile-container .profile-menu {\n    float: left;\n    width: 37%;\n    height: 482px;\n    background: #fff;\n    box-shadow: 0 0 25px rgba(0, 0, 0, 0.2); }\n  .profile-container .profile-menu .image-container {\n      width: 70px;\n      height: 70px;\n      margin: 60px; }\n  .profile-container .profile-menu .image-container img {\n        max-width: 100%;\n        height: auto;\n        border-radius: 50%; }\n  .profile-container .profile-menu .image-container img:hover {\n          opacity: 0.8; }\n  .profile-container .profile-menu ul {\n      list-style: none;\n      margin: 0;\n      padding: 0; }\n  .profile-container .profile-menu ul li {\n        padding: 10px 20px;\n        font-size: 13px; }\n  .profile-container .profile-menu ul li:hover, .profile-container .profile-menu ul li.active {\n          background: #f7f7f7;\n          border-left: 5px solid  #ff3c8a; }\n  .profile-container .profile-menu ul li:last-child {\n          margin-top: 50px; }\n  .profile-container .profile-content {\n    width: 63%;\n    float: right;\n    background: #fff;\n    box-shadow: 0 0 25px rgba(0, 0, 0, 0.2); }\n  .profile-container .profile-content .actions {\n      width: 100%;\n      background: linear-gradient(to right, #ff3c8a 0%, #ffbcd7 100%);\n      height: 40px;\n      line-height: 40;\n      color: #fff;\n      padding: 20px 0 0 0; }\n  .profile-container .profile-content .actions mat-icon {\n        padding-left: 20px;\n        float: left; }\n  .profile-container .profile-content .actions mat-icon:hover {\n          opacity: 0.8; }\n  .profile-container .profile-content .actions mat-icon + mat-icon {\n        padding-right: 20px;\n        float: right; }\n  .profile-container .profile-content .pic {\n      background: linear-gradient(to right, #ff3c8a 0%, #ffbcd7 100%);\n      text-align: center;\n      color: #fff;\n      padding: 0 0 20px 0; }\n  .profile-container .profile-content .pic img {\n        width: 90px;\n        height: auto;\n        border-radius: 50%; }\n  .profile-container .profile-content .pic img:hover {\n          opacity: 0.8; }\n  .profile-container .profile-content .pic h2 {\n        font-size: 17px;\n        padding: 0;\n        margin: 0;\n        font-weight: 400; }\n  .profile-container .profile-content .pic span {\n        font-size: 15px;\n        font-weight: 300; }\n  .profile-container .profile-content .summary {\n      color: #fff; }\n  .profile-container .profile-content .summary .content {\n        width: 50%;\n        float: left;\n        text-align: center;\n        display: block;\n        background: linear-gradient(to right, #ff3c8a 0%, #ffbcd7 100%);\n        padding: 10px 0; }\n  .profile-container .profile-content .summary .content span {\n          display: block;\n          font-size: 15px;\n          font-weight: 500; }\n  .profile-container .profile-content .profile-details {\n      padding: 0;\n      margin: 0;\n      color: #929292; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvd29ya2VyLXByb2ZpbGUvQzpcXFVzZXJzXFxNYXR0aGV3XFxEZXNrdG9wXFxQcm9qZXRfV0VCL3NyY1xcYXBwXFx3b3JrZXItcHJvZmlsZVxcd29ya2VyLXByb2ZpbGUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFZO0VBQ1osYUFBYTtFQUNiLGNBQWM7RUFDZCxnQkFBZ0IsRUFBQTtFQUpsQjtJQU1JLFdBQVc7SUFDWCxVQUFVO0lBQ1YsYUFBYTtJQUNiLGdCQUFnQjtJQUNoQix1Q0FBOEIsRUFBQTtFQVZsQztNQVlNLFdBQVc7TUFDWCxZQUFZO01BQ1osWUFBWSxFQUFBO0VBZGxCO1FBZ0JRLGVBQWU7UUFDZixZQUFZO1FBQ1osa0JBQWlCLEVBQUE7RUFsQnpCO1VBb0JVLFlBQVksRUFBQTtFQXBCdEI7TUF5Qk0sZ0JBQWdCO01BQ2hCLFNBQVM7TUFDVCxVQUFVLEVBQUE7RUEzQmhCO1FBNkJRLGtCQUFrQjtRQUNsQixlQUFlLEVBQUE7RUE5QnZCO1VBZ0NVLG1CQUFtQjtVQUNuQiwrQkFBK0IsRUFBQTtFQWpDekM7VUFvQ1UsZ0JBQWdCLEVBQUE7RUFwQzFCO0lBMENJLFVBQVU7SUFDVixZQUFZO0lBQ1osZ0JBQWdCO0lBQ2hCLHVDQUE4QixFQUFBO0VBN0NsQztNQStDTSxXQUFXO01BQ1gsK0RBQStEO01BQy9ELFlBQVk7TUFDWixlQUFlO01BQ2YsV0FBVztNQUNYLG1CQUFtQixFQUFBO0VBcER6QjtRQXNEUSxrQkFBa0I7UUFDbEIsV0FBVyxFQUFBO0VBdkRuQjtVQXlEVSxZQUFZLEVBQUE7RUF6RHRCO1FBNkRRLG1CQUFtQjtRQUNuQixZQUFZLEVBQUE7RUE5RHBCO01Ba0VNLCtEQUErRDtNQUMvRCxrQkFBa0I7TUFDbEIsV0FBVztNQUNYLG1CQUFtQixFQUFBO0VBckV6QjtRQXVFUSxXQUFXO1FBQ1gsWUFBWTtRQUNaLGtCQUFrQixFQUFBO0VBekUxQjtVQTJFVSxZQUFZLEVBQUE7RUEzRXRCO1FBK0VRLGVBQWU7UUFDZixVQUFVO1FBQ1YsU0FBUztRQUNULGdCQUFnQixFQUFBO0VBbEZ4QjtRQXFGUSxlQUFlO1FBQ2YsZ0JBQWdCLEVBQUE7RUF0RnhCO01BMEZNLFdBQVcsRUFBQTtFQTFGakI7UUE0RlEsVUFBVTtRQUNWLFdBQVc7UUFDWCxrQkFBa0I7UUFDbEIsY0FBYztRQUNkLCtEQUFnRTtRQUNoRSxlQUFlLEVBQUE7RUFqR3ZCO1VBbUdVLGNBQWM7VUFDZCxlQUFlO1VBQ2YsZ0JBQWdCLEVBQUE7RUFyRzFCO01BMEdNLFVBQVU7TUFDVixTQUFTO01BQ1QsY0FBYyxFQUFBIiwiZmlsZSI6InNyYy9hcHAvd29ya2VyLXByb2ZpbGUvd29ya2VyLXByb2ZpbGUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucHJvZmlsZS1jb250YWluZXJ7XHJcbiAgd2lkdGg6IDQ4NXB4O1xyXG4gIGhlaWdodDogNDg1cHg7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbiAgbWFyZ2luLXRvcDogNTBweDtcclxuICAucHJvZmlsZS1tZW51e1xyXG4gICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICB3aWR0aDogMzclO1xyXG4gICAgaGVpZ2h0OiA0ODJweDtcclxuICAgIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgICBib3gtc2hhZG93OiAwIDAgMjVweCByZ2JhKCMwMDAsIDAuMik7XHJcbiAgICAuaW1hZ2UtY29udGFpbmVye1xyXG4gICAgICB3aWR0aDogNzBweDtcclxuICAgICAgaGVpZ2h0OiA3MHB4O1xyXG4gICAgICBtYXJnaW46IDYwcHg7XHJcbiAgICAgIGltZ3tcclxuICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgaGVpZ2h0OiBhdXRvO1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6NTAlO1xyXG4gICAgICAgICY6aG92ZXJ7XHJcbiAgICAgICAgICBvcGFjaXR5OiAwLjg7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB1bHtcclxuICAgICAgbGlzdC1zdHlsZTogbm9uZTtcclxuICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICBwYWRkaW5nOiAwO1xyXG4gICAgICBsaXtcclxuICAgICAgICBwYWRkaW5nOiAxMHB4IDIwcHg7XHJcbiAgICAgICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgICAgICY6aG92ZXIsICYuYWN0aXZle1xyXG4gICAgICAgICAgYmFja2dyb3VuZDogI2Y3ZjdmNztcclxuICAgICAgICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgICNmZjNjOGE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICY6bGFzdC1jaGlsZHtcclxuICAgICAgICAgIG1hcmdpbi10b3A6IDUwcHg7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIC5wcm9maWxlLWNvbnRlbnR7XHJcbiAgICB3aWR0aDogNjMlO1xyXG4gICAgZmxvYXQ6IHJpZ2h0O1xyXG4gICAgYmFja2dyb3VuZDogI2ZmZjtcclxuICAgIGJveC1zaGFkb3c6IDAgMCAyNXB4IHJnYmEoIzAwMCwgMC4yKTtcclxuICAgIC5hY3Rpb25ze1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCAjZmYzYzhhIDAlLCAjZmZiY2Q3IDEwMCUpO1xyXG4gICAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICAgIGxpbmUtaGVpZ2h0OiA0MDtcclxuICAgICAgY29sb3I6ICNmZmY7XHJcbiAgICAgIHBhZGRpbmc6IDIwcHggMCAwIDA7XHJcbiAgICAgIG1hdC1pY29ue1xyXG4gICAgICAgIHBhZGRpbmctbGVmdDogMjBweDtcclxuICAgICAgICBmbG9hdDogbGVmdDtcclxuICAgICAgICAmOmhvdmVye1xyXG4gICAgICAgICAgb3BhY2l0eTogMC44O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBtYXQtaWNvbittYXQtaWNvbntcclxuICAgICAgICBwYWRkaW5nLXJpZ2h0OiAyMHB4O1xyXG4gICAgICAgIGZsb2F0OiByaWdodDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLnBpY3tcclxuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCAjZmYzYzhhIDAlLCAjZmZiY2Q3IDEwMCUpO1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgICBwYWRkaW5nOiAwIDAgMjBweCAwO1xyXG4gICAgICBpbWd7XHJcbiAgICAgICAgd2lkdGg6IDkwcHg7XHJcbiAgICAgICAgaGVpZ2h0OiBhdXRvO1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgICAgICAmOmhvdmVye1xyXG4gICAgICAgICAgb3BhY2l0eTogMC44O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBoMntcclxuICAgICAgICBmb250LXNpemU6IDE3cHg7XHJcbiAgICAgICAgcGFkZGluZzogMDtcclxuICAgICAgICBtYXJnaW46IDA7XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICAgICAgfVxyXG4gICAgICBzcGFue1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTVweDtcclxuICAgICAgICBmb250LXdlaWdodDogMzAwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAuc3VtbWFyeXtcclxuICAgICAgY29sb3I6ICNmZmY7XHJcbiAgICAgIC5jb250ZW50e1xyXG4gICAgICAgIHdpZHRoOiA1MCU7XHJcbiAgICAgICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgICNmZjNjOGEgMCUsICNmZmJjZDcgMTAwJSk7XHJcbiAgICAgICAgcGFkZGluZzogMTBweCAwO1xyXG4gICAgICAgIHNwYW57XHJcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgICAgIGZvbnQtc2l6ZTogMTVweDtcclxuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAucHJvZmlsZS1kZXRhaWxze1xyXG4gICAgICBwYWRkaW5nOiAwO1xyXG4gICAgICBtYXJnaW46IDA7XHJcbiAgICAgIGNvbG9yOiAjOTI5MjkyO1xyXG5cclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/worker-profile/worker-profile.component.ts":
/*!************************************************************!*\
  !*** ./src/app/worker-profile/worker-profile.component.ts ***!
  \************************************************************/
/*! exports provided: WorkerProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkerProfileComponent", function() { return WorkerProfileComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _WorkerAuth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../WorkerAuth.service */ "./src/WorkerAuth.service.ts");



var WorkerProfileComponent = /** @class */ (function () {
    function WorkerProfileComponent(auth) {
        this.auth = auth;
    }
    WorkerProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.auth.profile().subscribe(function (user) {
            _this.details = user;
        }, function (err) {
            console.error((err));
        });
    };
    WorkerProfileComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-worker-profile',
            template: __webpack_require__(/*! ./worker-profile.component.html */ "./src/app/worker-profile/worker-profile.component.html"),
            styles: [__webpack_require__(/*! ./worker-profile.component.scss */ "./src/app/worker-profile/worker-profile.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_WorkerAuth_service__WEBPACK_IMPORTED_MODULE_2__["WorkerAuthService"]])
    ], WorkerProfileComponent);
    return WorkerProfileComponent;
}());



/***/ }),

/***/ "./src/app/worker-register/worker-register.component.html":
/*!****************************************************************!*\
  !*** ./src/app/worker-register/worker-register.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n  <h2>Register</h2>\n  <form class=\"example-form\" [formGroup]=\"userForm\" (ngSubmit)=\"onSubmitForm()\">\n    <table class=\"example-full-width\" cellspacing=\"0\"><tr>\n      <td><mat-form-field class=\"example-full-width\">\n        <input matInput placeholder=\"First name\" formControlName=\"firstname\">\n      </mat-form-field></td>\n      <td><mat-form-field class=\"example-full-width\">\n        <input matInput placeholder=\"Last Name\" formControlName=\"lastname\">\n      </mat-form-field></td>\n    </tr></table>\n    <mat-form-field class=\"example-full-width\">\n      <input matInput placeholder=\"Email\" formControlName=\"email\">\n    </mat-form-field>\n    <mat-form-field class=\"example-full-width\">\n      <input type=\"password\" matInput placeholder=\"Password\" formControlName=\"password\">\n    </mat-form-field>\n    <mat-form-field class=\"example-full-width\">\n      <input type=\"password\" matInput placeholder=\"Confirm Password\" formControlName=\"cpassword\">\n    </mat-form-field>\n    <mat-form-field class=\"example-full-width\">\n      <span matPrefix>+33 &nbsp;</span>\n      <input type=\"tel\" matInput placeholder=\"Telephone\" formControlName=\"phone\">\n      <mat-icon matSuffix>mode_edit</mat-icon>\n    </mat-form-field>\n    <button mat-raised-button color=\"accent\" type=\"submit\" [disabled]=\"userForm.invalid\">Submit</button>\n  </form>\n</mat-card>\n\n"

/***/ }),

/***/ "./src/app/worker-register/worker-register.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/worker-register/worker-register.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "h2 {\n  text-align: center; }\n\nmat-card {\n  min-width: 150px;\n  max-width: 500px;\n  width: 100%;\n  margin: 0 auto;\n  margin-top: 10%;\n  margin-bottom: 10%; }\n\n.example-form {\n  min-width: 150px;\n  max-width: 500px;\n  width: 90%; }\n\n.example-full-width {\n  width: 100%; }\n\ntd {\n  padding-right: 8px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvd29ya2VyLXJlZ2lzdGVyL0M6XFxVc2Vyc1xcTWF0dGhld1xcRGVza3RvcFxcUHJvamV0X1dFQi9zcmNcXGFwcFxcd29ya2VyLXJlZ2lzdGVyXFx3b3JrZXItcmVnaXN0ZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBa0IsRUFBQTs7QUFHcEI7RUFDRSxnQkFBZ0I7RUFDaEIsZ0JBQWdCO0VBQ2hCLFdBQVk7RUFDWixjQUFjO0VBQ2QsZUFBZTtFQUNmLGtCQUFrQixFQUFBOztBQUdwQjtFQUNFLGdCQUFnQjtFQUNoQixnQkFBZ0I7RUFDaEIsVUFBVyxFQUFBOztBQUdiO0VBQ0UsV0FBVyxFQUFBOztBQUdiO0VBQ0Usa0JBQWtCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC93b3JrZXItcmVnaXN0ZXIvd29ya2VyLXJlZ2lzdGVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaDIge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxubWF0LWNhcmQge1xyXG4gIG1pbi13aWR0aDogMTUwcHg7XHJcbiAgbWF4LXdpZHRoOiA1MDBweDtcclxuICB3aWR0aDogMTAwJSA7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbiAgbWFyZ2luLXRvcDogMTAlO1xyXG4gIG1hcmdpbi1ib3R0b206IDEwJTtcclxufVxyXG5cclxuLmV4YW1wbGUtZm9ybSB7XHJcbiAgbWluLXdpZHRoOiAxNTBweDtcclxuICBtYXgtd2lkdGg6IDUwMHB4O1xyXG4gIHdpZHRoOiA5MCUgO1xyXG59XHJcblxyXG4uZXhhbXBsZS1mdWxsLXdpZHRoIHtcclxuICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxudGR7XHJcbiAgcGFkZGluZy1yaWdodDogOHB4O1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/worker-register/worker-register.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/worker-register/worker-register.component.ts ***!
  \**************************************************************/
/*! exports provided: WorkerRegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkerRegisterComponent", function() { return WorkerRegisterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _WorkerAuth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../WorkerAuth.service */ "./src/WorkerAuth.service.ts");





var WorkerRegisterComponent = /** @class */ (function () {
    function WorkerRegisterComponent(formBuilder, worker, router) {
        this.formBuilder = formBuilder;
        this.worker = worker;
        this.router = router;
        this.credentials = {
            id: 0,
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            phone: '',
        };
    }
    WorkerRegisterComponent.prototype.ngOnInit = function () {
        this.initForm();
    };
    WorkerRegisterComponent.prototype.initForm = function () {
        this.userForm = this.formBuilder.group({
            firstname: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            lastname: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].email]],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            cpassword: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            phone: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
    };
    // @ts-ignore
    WorkerRegisterComponent.prototype.onSubmitForm = function () {
        var _this = this;
        var formValue = this.userForm.value;
        if (formValue.password != formValue.cpassword) {
            alert('Passwords do not match');
            return;
        }
        this.credentials.firstname = formValue.firstname;
        this.credentials.lastname = formValue.lastname;
        this.credentials.email = formValue.email;
        this.credentials.password = formValue.password;
        this.credentials.phone = formValue.phone;
        this.worker.register(this.credentials).subscribe(function (data) {
            console.log(data);
            if (data.error == 'User already exists') {
                alert('User already exist');
            }
            else {
                _this.router.navigate(['worker-profile']);
            }
        }, function (err) {
            console.error(err);
        });
    };
    WorkerRegisterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-worker-register',
            template: __webpack_require__(/*! ./worker-register.component.html */ "./src/app/worker-register/worker-register.component.html"),
            styles: [__webpack_require__(/*! ./worker-register.component.scss */ "./src/app/worker-register/worker-register.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _WorkerAuth_service__WEBPACK_IMPORTED_MODULE_4__["WorkerAuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], WorkerRegisterComponent);
    return WorkerRegisterComponent;
}());



/***/ }),

/***/ "./src/auth-guard.service.ts":
/*!***********************************!*\
  !*** ./src/auth-guard.service.ts ***!
  \***********************************/
/*! exports provided: AuthGuardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuardService", function() { return AuthGuardService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _authentification_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./authentification.service */ "./src/authentification.service.ts");




var AuthGuardService = /** @class */ (function () {
    function AuthGuardService(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    AuthGuardService.prototype.canActivate = function () {
        if (!this.auth.isLoggedIn()) {
            this.router.navigateByUrl('/');
            return false;
        }
        return true;
    };
    AuthGuardService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_authentification_service__WEBPACK_IMPORTED_MODULE_3__["AuthentificationService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], AuthGuardService);
    return AuthGuardService;
}());



/***/ }),

/***/ "./src/authentification.service.ts":
/*!*****************************************!*\
  !*** ./src/authentification.service.ts ***!
  \*****************************************/
/*! exports provided: AuthentificationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthentificationService", function() { return AuthentificationService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");





var AuthentificationService = /** @class */ (function () {
    function AuthentificationService(http, router) {
        this.http = http;
        this.router = router;
    }
    AuthentificationService.prototype.saveToken = function (token) {
        localStorage.setItem('userToken', token);
        this.token = token;
    };
    AuthentificationService.prototype.getToken = function () {
        if (!this.token) {
            this.token = localStorage.getItem('userToken');
        }
        return this.token;
    };
    AuthentificationService.prototype.getUserDetails = function () {
        var token = this.getToken();
        var payload;
        if (token) {
            payload = token.split('.')[1];
            payload = window.atob(payload);
            return JSON.parse(payload);
        }
        else {
            return null;
        }
    };
    AuthentificationService.prototype.isLoggedIn = function () {
        var user = this.getUserDetails();
        if (user) {
            return user.exp > Date.now() / 1000;
        }
        else {
            return false;
        }
    };
    AuthentificationService.prototype.isAdmin = function () {
        var user = this.getUserDetails();
        if (user) {
            if (user.isAdmin === 'false') {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    };
    AuthentificationService.prototype.register = function (user) {
        var _this = this;
        var base = this.http.post('/api/register', user);
        var request = base.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            if (data.token) {
                _this.saveToken(data.token);
            }
            return data;
        }));
        return request;
    };
    AuthentificationService.prototype.login = function (user) {
        var _this = this;
        var base = this.http.post('/api/login', user);
        var request = base.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            if (data.token) {
                _this.saveToken(data.token);
            }
            return data;
        }));
        return request;
    };
    AuthentificationService.prototype.profile = function () {
        var base = this.http.get('/api/profile', {
            headers: { Authorization: "" + this.getToken() }
        });
        var request = base.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            return data;
        }));
        return request;
    };
    AuthentificationService.prototype.logout = function () {
        this.token = '';
        window.localStorage.removeItem('userToken');
        this.router.navigateByUrl('/');
    };
    AuthentificationService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], AuthentificationService);
    return AuthentificationService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ "./src/order.service.ts":
/*!******************************!*\
  !*** ./src/order.service.ts ***!
  \******************************/
/*! exports provided: OrderService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderService", function() { return OrderService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");




var OrderService = /** @class */ (function () {
    function OrderService(http, router) {
        this.http = http;
        this.router = router;
        this.order = {
            name: '',
            idUser: 0
        };
    }
    OrderService.prototype.OrderOne = function (name, idUser) {
        this.order.name = name;
        this.order.idUser = idUser;
        this.http.post('/api/orderOne', this.order).subscribe(function () {
            console.log('order added');
        });
    };
    OrderService.prototype.getAllPendingOrders = function (idUser) {
        return this.http.get('/api/OrderPending/' + idUser);
    };
    OrderService.prototype.getPendingOrders = function () {
        return this.http.get('/api/OrderAllPending');
    };
    OrderService.prototype.PickAnOrder = function (order, id) {
        return this.http.put('/api/PickAnOrder/' + id, order);
    };
    OrderService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], OrderService);
    return OrderService;
}());



/***/ }),

/***/ "./src/services.service.ts":
/*!*********************************!*\
  !*** ./src/services.service.ts ***!
  \*********************************/
/*! exports provided: ServicesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServicesService", function() { return ServicesService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");




var ServicesService = /** @class */ (function () {
    function ServicesService(http, router) {
        this.http = http;
        this.router = router;
    }
    ServicesService.prototype.addService2 = function (service) {
        var _this = this;
        return new Promise(function (resolve) {
            console.log(service);
            _this.http.post('/api/addService', service).subscribe(function () {
                console.log('service added');
                resolve();
            });
        });
    };
    ServicesService.prototype.getTypes = function () {
        return this.http.get('/api/typeServices');
    };
    ServicesService.prototype.getServices = function () {
        return this.http.get('/api/getServices');
    };
    ServicesService.prototype.LibelleOfServices = function (idType) {
        return this.http.get('/api/LibelleOfServices/' + idType);
    };
    ServicesService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], ServicesService);
    return ServicesService;
}());



/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Matthew\Desktop\Projet_WEB\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map