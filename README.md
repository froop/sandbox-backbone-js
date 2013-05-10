Backbone.js ベースの Web アプリケーション実験
====================

基本方針
--------------------

Web ベース、クライアント-サーバー方式のシステムであるが、サーバー側主体である CGI の様な従来型ではなく、
クライアント側に重心を置く RIA (rich internet application) 方式とする。

この方針により、クライアント側の JavaScript プログラムが肥大化することが想定されるため、
プログラムに構造を持たせて開発や保守を効率化するために、MVC フレームワークである Backbone.js を導入する。

### クライアント

Web ブラウザ上で動作する JavaScript ベースのアプリケーション。
ページの動的な組み立てや遷移は、JavaScript が主体になって制御する。
サーバーとの通信は、Ajax により非同期で行う。

### サーバー

Web サーバーソフトウェアは Apache とする。背後の AP サーバーや DB サーバーは実験範囲外。
下記の機能をクライアントに提供する。

* HTTP による静的ファイル (HTML, CSS, JavaScript) の配布
* REST 形式の API を介し、永続データ (データベースなど) とそれにまつわるビジネスロジックを Web サービスとして提供


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

* フレームワーク: QUnit (http://qunitjs.com/)
* テストダブルライブラリ: Sinon.JS (http://sinonjs.org/)

最近は BDD 系で RSpec 風の [Jasmine](http://pivotal.github.io/jasmine/) が流行のようだが、
QUnit は昔ながらの JUnit 風でシンプルなため導入の敷居が低いのと、既に利用経験があり慣れているので。
