"use strict";

class SampleService {

	constructor(public $http: ng.IHttpService) {
	}

	test(): ng.IHttpPromise<any> {
		return this.$http.get("");
	}
}

export = SampleService;
