namespace app.hello {
	"use strict";

	export interface TestScope extends ng.IScope {
		name: string;
		temp: string;
	}

	export class TestController {

		constructor(public $scope: TestScope, public sampleService: SampleService) {
			$scope.name = "サーバと通信中";
			$scope.temp = "仮";
		}

		update() {
			this.sampleService.test();
		}
	}

	angular.module("app.hello").controller("TestController", TestController);
}
