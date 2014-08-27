# 簡単な解説 [![Build Status](https://travis-ci.org/vvakame/angularjs-typescript.png)](https://travis-ci.org/vvakame/angularjs-typescript) [![Dependency Status](https://david-dm.org/vvakame/angularjs-typescript.png)](https://david-dm.org/vvakame/angularjs-typescript)

## cloneした後にやること

`./setup.sh` を実行する。
たまに別のメンバーが構成を変更して手元の環境が古くなってしまう場合がある。もしかしたら、そういう状態かな…と思ったら `./setup.sh` を動かしてみよう。きっとそれで上手くいくようになります。

## 開発したい時にやること

`grunt` ってやるとTypeScriptやSCSSのコンパイルが走ります。
ちなみに、`grunt --help`とすると、ちょびっと説明が出たりするかもしれません。

## 動かしたい時にやること

`grunt serve` とやると、開発用サーバが起動します。[開発サーバ](http://localhost:9000/)にアクセス可能です。

## コミット前にすること

`grunt test` して、プログラムが壊れていないかチェックしましょう。
