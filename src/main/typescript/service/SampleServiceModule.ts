///<reference path='../libs/DefinitelyTyped/angularjs/angular.d.ts' />

///<reference path='../Model.ts' />

module Service {
	'use strict';

	export class SampleService {

		constructor(public $http:ng.IHttpService) {
		}

		test():ng.IHttpPromise {
			return this.$http.get("");
		}
	}
}