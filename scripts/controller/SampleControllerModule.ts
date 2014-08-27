///<reference path='../../typings/angularjs/angular.d.ts' />

///<reference path='../Model.ts' />
///<reference path='../service/SampleServiceModule.ts' />

module Sample {
	"use strict";

	export interface IScope extends ng.IScope {
		name: string;
		temp: string;
	}

	export class TestController {

		constructor(public $scope:IScope, public sampleService:Service.SampleService) {
			$scope.name = "サーバと通信中";
			$scope.temp = "仮";
		}

		update() {
			this.sampleService.test();
		}
	}
}
