# A Simple Bounce Effect In CSS3

Just so I didn't loose it later. A simple bouncing effect in pure #CSS3

```css
.bounce {
  -webkit-animation: bounce 2.5s infinite;
}

@-webkit-keyframes bounce {
  0%  { -webkit-transform: translate(0px, 0px)  }
  10% { -webkit-transform: translate(0px, -50%) }
  20% { -webkit-transform: translate(0px, 0px)  }
}
```

See this thing [in action](http://jsfiddle.net/vrbSn)