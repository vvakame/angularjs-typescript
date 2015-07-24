// app.hello モジュールのどこよりも早く実行されねばならない(コンパイル後実行順がモジュール内で一番早くならねばならない)ため独立したファイルとせざるをえない。
namespace app.hello {
	"use strict";

	angular.module("app.hello", [], ()=> false);
}
