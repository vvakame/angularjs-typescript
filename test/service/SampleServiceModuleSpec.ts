///<reference path='../../typings/mocha/mocha.d.ts' />
///<reference path='../../typings/power-assert/power-assert.d.ts' />

///<reference path='../../typings/angularjs/angular.d.ts' />
///<reference path='../../typings/angularjs/angular-route.d.ts' />

///<reference path='../../scripts/Ignite.ts' />

"use strict";

import ngMock = require('angular-mocks/ngMock');

import assert = require("power-assert");

import App = require("../../scripts/Ignite");
import SampleService = require("../../scripts/service/SampleServiceModule");

describe("Serviceの", ()=> {
	var $injector:ng.auto.IInjectorService;
	beforeEach(()=> {
		$injector = angular.injector([ngMock, App.appName + ".service"]);
	});

	describe("Service.SampleServiceの", ()=> {
		var $httpBackend:ng.IHttpBackendService;
		var service:SampleService;

		beforeEach(()=> {
			$httpBackend = $injector.get("$httpBackend");

			service = $injector.instantiate(SampleService, {
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
