///<reference path='../typings/angularjs/angular.d.ts' />
///<reference path='../typings/angularjs/angular-route.d.ts' />

///<reference path='./hello/index.ts' />

namespace app {
	"use strict";

	angular.module(
		"app",
		["ngRoute", "app.hello", "app.utils"],
		($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider)=> {
			$routeProvider
				.when("/sample", {
					templateUrl: "/template/sample.html"
				})
				.otherwise({
					templateUrl: "/template/main.html"
				});
			$locationProvider.html5Mode(true);
		}
	)
		.run(($rootScope: ng.IRootScopeService, $routeParams: ng.route.IRouteParamsService)=> {
			false;
		})
	;

	// モジュールの定義。filterに関するモジュール。
	angular.module(
		"app.utils",
		[],
		()=> {
			false;
		}
	)
	/**
	 * 指定した要素を {@type Array} 内から除外するフィルタ。
	 * @function
	 * @param {Array|Object} options
	 * @param {Array} [options.exclude] 除外する対象
	 * @param {function} [options.compare]
	 */
		.filter("rmDuplicated", ()=> {
			return (input: any[], options: any)=> {
				if (angular.isUndefined(input)) {
					return input;
				} else if (!angular.isArray(input)) {
					console.error("input is not array.", input);
					return input;
				}
				var excludeList: any;
				if (angular.isUndefined(options)) {
					console.error("options is required.");
					return input;
				} else if (angular.isArray(options)) {
					excludeList = options;
				} else if (angular.isArray(options.exclude)) {
					excludeList = options.exclude;
				}
				var compareFn = (a: any, b: any) => {
					return a.$key.keystr === b.$key.keystr;
				};
				if (angular.isUndefined(options)) {
					false;
				} else if (angular.isFunction(options.compare)) {
					compareFn = options.compare;
				}

				var result: any[] = [];
				input.forEach((data)=> {
					if (!excludeList.some((exclude: any) => compareFn(data, exclude))) {
						result.push(data);
					}
				});

				return result;
			};
		}
	)
	;
}
