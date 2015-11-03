///<reference path='../../typings/mocha/mocha.d.ts' />
///<reference path='../../typings/power-assert/power-assert.d.ts' />

///<reference path='../../typings/angularjs/angular.d.ts' />
///<reference path='../../typings/angularjs/angular-route.d.ts' />

///<reference path='../../scripts/index.ts' />

"use strict";

describe("Controllerの", ()=> {
	var $injector:angular.auto.IInjectorService;
	beforeEach(()=> {
		$injector = angular.injector(["ngMock", "app.hello"]);
	});

	describe("app.hello.TestControllerの", ()=> {
		var $scope:app.hello.TestScope;
		var $controller:angular.IControllerService;
		var $httpBackend:angular.IHttpBackendService;

		beforeEach(()=> {
			$httpBackend = $injector.get<angular.IHttpBackendService>("$httpBackend");
			$controller = $injector.get<angular.IControllerService>("$controller");

			$scope = $injector.get<angular.IRootScopeService>("$rootScope").$new();
		});

		it("Controllerの作成", ()=> {
			var controller:app.hello.TestController = $controller(app.hello.TestController, {
				$scope: $scope,
				$routeParams: {
					domain: "topgate.co.jp"
				}
			});
			controller.$scope;
			assert($scope.name === "サーバと通信中");
			assert($scope.temp === "仮");
		});
	});
});
