///<reference path='libs/DefinitelyTyped/angularjs/angular.d.ts' />

/**
 * モデルのモジュール。
 */
module Model {
	'use strict';

	export class Sample {
		test:string;

		/**
		 * @constructor
		 * @param data JSONObjectまたはJSON文字列
		 */
			constructor(data) {
			if (angular.isString(data)) {
				data = angular.fromJson(data);
			}
			this.test = data.test;
		}
	}
}
