///<reference path='../../typings/mocha/mocha.d.ts' />
///<reference path='../../typings/assert/assert.d.ts' />

///<reference path='../../typings/angularjs/angular.d.ts' />
///<reference path='../../typings/angularjs/angular-route.d.ts' />

///<reference path='../../scripts/Ignite.ts' />

"use strict";

describe("Controllerの", ()=> {
	var $injector:ng.auto.IInjectorService;
	beforeEach(()=> {
		$injector = angular.injector(["ngMock", App.appName + ".service"]);
	});

	describe("Sample.TestControllerの", ()=> {
		var $scope:Sample.IScope;
		var $controller:ng.IControllerService;
		var $httpBackend:ng.IHttpBackendService;

		beforeEach(()=> {
			$httpBackend = $injector.get("$httpBackend");
			$controller = $injector.get("$controller");

			$scope = <any> $injector.get("$rootScope").$new();
		});

		it("Controllerの作成", ()=> {
			var controller:Sample.TestController = $controller(Sample.TestController, {
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
