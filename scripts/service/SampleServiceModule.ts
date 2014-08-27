///<reference path='../../typings/angularjs/angular.d.ts' />

///<reference path='../Model.ts' />

module Service {
	"use strict";

	export class SampleService {

		constructor(public $http:ng.IHttpService) {
		}

		test():ng.IHttpPromise<any> {
			return this.$http.get("");
		}
	}
}
