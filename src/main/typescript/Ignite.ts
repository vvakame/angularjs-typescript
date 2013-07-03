///<reference path='Model.ts' />
///<reference path='Service.ts' />
///<reference path='Controller.ts' />

console.log("ignite!");

/**
 * モジュールの作成や動作の定義。
 */
module App {
	'use strict';

	export var appName = "gae-standards";

	// モジュールの定義
	angular.module(
		appName,
		[appName + ".controller", appName + ".service", appName + ".filter", appName + ".directive"],
		($routeProvider:ng.IRouteProvider, $locationProvider:ng.ILocationProvider)=> {
			$routeProvider
				.when("/sample", {
					templateUrl: "/template/sample.html"
				})
				.otherwise({
					templateUrl: "/template/main.html"
				});
			// hashの書き換えの代わりにHTML5のHistory API関係を使うモードを設定する。
			$locationProvider.html5Mode(true);
		}
	)
		// モジュールとして登録する。angular.module() -> .config() -> .run() で1セット。
		.run(($rootScope:ng.IRootScopeService, $routeParams:ng.IRouteParamsService)=> {
		})
	;

	// モジュールの定義。
	angular.module(
		// モジュール名
		appName + ".service",
		// 依存モジュールはなし
		[],
		// .configで設定する項目はなし
		()=> {
		}
	)
		.factory("sampleService", ($http:ng.IHttpService):Service.SampleService=> {
			return new Service.SampleService($http);
		})
	;

	angular.module(
		appName + ".controller",
		[appName + ".service"],
		()=> {
		}
	)
		.controller("SampleTestController", Sample.TestController)
	;

	// モジュールの定義。directiveに関するモジュール。
	angular.module(
		appName + ".directive",
		[],
		()=> {
		}
	)
		.directive("tgFileBind", ()=> {
			return (scope, elm, attrs) => {
				elm.bind("change", (evt) => {
					scope.$apply((scope)=> {
						scope[attrs.name] = evt.target.files;
					});
				});
			};
		})
		.directive("tgContenteditable", ($parse:ng.IParseService)=> {
			return {
				require: 'ngModel',
				link: (scope, elm, attrs, ctrl:ng.INgModelController) => {
					var value = $parse(attrs.ngModel)(scope);

					elm.attr("contenteditable", "");
					// view -> model
					var viewToModel = () => {
						scope.$apply(()=> {
							ctrl.$setViewValue(elm.html());
						});
					};
					elm.bind('blur', viewToModel);
					elm.bind('keyup', viewToModel);
					elm.bind('keydown', viewToModel);

					// model -> view
					ctrl.$render = () => {
						elm.html(ctrl.$viewValue);
					};

					// load init value from DOM
					if (value) {
						ctrl.$setViewValue(value);
						ctrl.$render();
					} else {
						ctrl.$setViewValue(elm.html());
					}
				}
			};
		})
	;

	// モジュールの定義。filterに関するモジュール。
	angular.module(
		appName + ".filter",
		[],
		()=> {
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
			return (input:any[], options)=> {
				if (angular.isUndefined(input)) {
					return input;
				} else if (!angular.isArray(input)) {
					console.error("input is not array.", input);
					return input;
				}
				var excludeList;
				if (angular.isUndefined(options)) {
					console.error("options is required.");
					return input;
				} else if (angular.isArray(options)) {
					excludeList = options;
				} else if (angular.isArray(options.exclude)) {
					excludeList = options.exclude;
				}
				var compareFn = (a, b) => {
					return a.$key.keystr === b.$key.keystr;
				};
				if (angular.isUndefined(options)) {
				} else if (angular.isFunction(options.compare)) {
					compareFn = options.compare;
				}

				var result = [];
				input.forEach((data)=> {
					if (!excludeList.some((exclude) => compareFn(data, exclude))) {
						result.push(data);
					}
				});

				return result;
			}
		}
	)
	;
}
