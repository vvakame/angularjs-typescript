"use strict";

import angular = require("angular");

/**
 * モデルのモジュール。
 */
class Sample {
	test: string;

	constructor(data: any) {
		if (angular.isString(data)) {
			data = angular.fromJson(data);
		}
		this.test = data.test;
	}
}

export = Sample;
