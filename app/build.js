var pages_index=[{"slug":"2014-02-06-some-awesome-stuff","date":"2014-02-05T13:00:00.000Z","title":"Oh, no!","category":"Mind Fucks","tags":["ruby on rails","tdd"],"extract":"asdfasdfasdf #ruby-on-rails #TDD"},{"slug":"2015-02-14-my-sweet-valentine","date":"2015-02-13T13:00:00.000Z","title":"bla bla bla","category":"В Поисках Дома","tags":["nodejs"],"extract":"Oh, hi there #nodejs"}];
var document_text="post text",App=React.createClass({displayName:"App",render:function(){return React.createElement("html",null,React.createElement("head",null,React.createElement("title",null,"Hello"),React.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),React.createElement("link",{rel:"stylesheet",type:"text/css",href:"./application.css"})),React.createElement("body",null,React.createElement("header",null,React.createElement("div",{className:"paddings"},React.createElement("a",{href:"./",className:"logo"},"Nikolay.TheOsom"))),React.createElement("main",null,React.createElement("div",{className:"paddings"},React.createElement("article",null,React.createElement("h1",null,"Oh, hi there!"),React.createElement("p",null,document_text)))),React.createElement("footer",null,React.createElement("div",{className:"paddings"},React.createElement("p",null,"Copyright (C) 2012-",(new Date).getFullYear()," Nikolay Nemshilov")))))}});React.render(React.createElement(App,null),document.documentElement);