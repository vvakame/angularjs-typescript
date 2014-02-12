///<reference path='../../../main/typescript/libs/typings/mocha/mocha.d.ts' />
///<reference path='../../../main/typescript/libs/typings/expectations/expectations.d.ts' />

///<reference path='../../../main/typescript/libs/typings/angularjs/angular.d.ts' />
///<reference path='../../../main/typescript/libs/typings/angularjs/angular-mocks.d.ts' />

///<reference path='../../../main/typescript/Ignite.ts' />

"use strict";

describe("Serviceの", ()=> {
	var $injector:ng.auto.IInjectorService;
	beforeEach(()=> {
		$injector = angular.injector(["ngMock", App.appName + ".service"]);
	});

	describe("Service.SampleServiceの", ()=> {
		var $httpBackend:ng.IHttpBackendService;
		var service:Service.SampleService;

		beforeEach(()=> {
			$httpBackend = $injector.get("$httpBackend");

			service = $injector.instantiate(Service.SampleService, {
			});
		});

		it("testメソッドのテスト", ()=> {
			$httpBackend.expect("GET", null).respond(200, {});
			var promise = service.test();

			var model: any;
			promise.success((data)=> model = data);

			$httpBackend.flush();

			expect(model).toBeDefined();
			// expect(model instanceof Model.Sample).toBeTruthy();
		});
	});
});
