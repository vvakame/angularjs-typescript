namespace app.hello {
	"use strict";

	export class SampleService {

		constructor(public $http: ng.IHttpService) {
		}

		test(): ng.IHttpPromise<any> {
			return this.$http.get("");
		}
	}

	angular.module("app.hello").service("sampleService", SampleService);
}
