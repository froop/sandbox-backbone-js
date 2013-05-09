Backbone.js ベースの Web アプリケーション実験
====================

Web ブラウザ上の JavaScript が主体になって、画面の作成や遷移を制御する方式。
サーバー側処理の呼び出しは REST 形式の API を介して行う。


対象 Web ブラウザ
--------------------

HTML5 対応のモダンブラウザが前提。LocalStorage を使用したいため。

* Firefox
* Google Chrome
* Safari
* Internet Explorer 8 以降 (LocalStorage が Web サーバー経由でないと使用できないので注意)

JavaScript ライブラリ
--------------------

### Backbone.js (http://backbonejs.org/)

MVC フレームワーク。JavaScript で多くの処理を行うようになると、構造をしっかりしないと非効率なため導入。
LocalStorage を利用するために [backbone.localStorage.js](https://github.com/jeromegn/Backbone.localStorage) プラグインを導入。


### jQuery (http://jquery.com/)

定番。DOM 操作と Ajax 通信用。


### Underscore.js (http://underscorejs.org/)

Backbone.js が依存している。関数型言語的なユーティリティー関数群を提供するライブラリ。
便利なので Backbone と関係しない処理で直接使う場面も多い。


### RequireJS (http://requirejs.org/)

JavaScript ファイルのローダー。
JavaScript で多くを処理するようになると、ファイルが増えて依存関係の管理などが煩雑になるため。


HTML 動的生成
--------------------

テンプレートエンジンは使用せず、jQuery で DOM を直接操作する。
デザインとプログラミングで担当を分けない前提なら、テンプレートエンジンで複雑化する不利に見合わないという判断。
詳細は https://gist.github.com/froop/5492623 を参照。


単体テスト
--------------------

* フレームワーク: QUnit http://qunitjs.com/
* テストダブルライブラリ: Sinon.JS http://sinonjs.org/

最近は BDD 系で RSpec 風の [Jasmine](http://pivotal.github.io/jasmine/) が流行のようだが、
QUnit は昔ながらの JUnit 風でシンプルなため導入の敷居が低いのと、既に利用経験があり慣れているので。
