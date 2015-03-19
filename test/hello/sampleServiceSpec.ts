///<reference path='../../typings/mocha/mocha.d.ts' />
///<reference path='../../typings/power-assert/power-assert.d.ts' />

///<reference path='../../typings/angularjs/angular.d.ts' />
///<reference path='../../typings/angularjs/angular-route.d.ts' />

///<reference path='../../scripts/index.ts' />

"use strict";

describe("Serviceの", ()=> {
	var $injector:ng.auto.IInjectorService;
	beforeEach(()=> {
		$injector = angular.injector(["ngMock", "app.hello"]);
	});

	describe("Service.SampleServiceの", ()=> {
		var $httpBackend:ng.IHttpBackendService;
		var service:app.hello.SampleService;

		beforeEach(()=> {
			$httpBackend = $injector.get("$httpBackend");

			service = $injector.instantiate(app.hello.SampleService, {
			});
		});

		it("testメソッドのテスト", ()=> {
			$httpBackend.expect("GET", null).respond(200, {});
			var promise = service.test();

			var model: any;
			promise.success((data)=> model = data);

			$httpBackend.flush();

			assert(model);
			// expect(model instanceof Model.Sample).toBeTruthy();
		});
	});
});
