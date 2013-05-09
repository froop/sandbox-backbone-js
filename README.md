Backbone.js ベースの Web アプリケーション実験
====================

Web ブラウザ上の JavaScript が主体になって、画面の表示や遷移を行う。
サーバー側との通信は REST 形式の API を介す。


JavaScript ライブラリ
--------------------

### Backbone.js

http://backbonejs.org/

MVC フレームワーク。
JavaScript で多くの処理を行うようになると、構造をしっかりしないと非効率なため。


### jQuery

http://jquery.com/

定番。DOM 操作と Ajax 通信用。


### Underscore.js

http://underscorejs.org/

Backbone.js が依存しているライブラリ。便利なライブラリなので直接使う場面も多い。


### Require.js

http://requirejs.org/

JavaScript ファイルのローダー。
JavaScript で多くを処理するようになると、ファイルが増えて依存関係の管理などが煩雑になるため。


HTML 動的生成
--------------------

テンプレートエンジンは使用せず、jQuery で DOM を直接操作する。デザインとプログラミングで担当を分けない前提。
詳細は https://gist.github.com/froop/5492623 を参照。


単体テスト
--------------------

* フレームワーク: QUnit http://qunitjs.com/
* テストダブルライブラリ: Sinon.JS http://sinonjs.org/

最近は BDD 系で RSpec 風の [Jasmine](http://pivotal.github.io/jasmine/) が流行のようだが、
QUnit は昔ながらの JUnit 風でシンプルなため導入の敷居が低いのと、既に利用経験があり慣れているので。
