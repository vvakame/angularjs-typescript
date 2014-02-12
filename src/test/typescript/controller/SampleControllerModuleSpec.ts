///<reference path='../../../main/typescript/libs/typings/mocha/mocha.d.ts' />
///<reference path='../../../main/typescript/libs/typings/expectations/expectations.d.ts' />

///<reference path='../../../main/typescript/libs/typings/angularjs/angular.d.ts' />
///<reference path='../../../main/typescript/libs/typings/angularjs/angular-mocks.d.ts' />

///<reference path='../../../main/typescript/Ignite.ts' />

"use strict";

describe("Controllerの", ()=> {
	var $injector:ng.auto.IInjectorService;
	beforeEach(()=> {
		$injector = angular.injector(["ngMock", App.appName + ".service"]);
	});

	describe("Sample.TestControllerの", ()=> {
		var $scope:Sample.Scope;
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
			expect($scope.name).toBe("サーバと通信中");
			expect($scope.temp).toBe("仮");
		});
	});
});
