# Converting Numbers To Currency In JavaScript

Just so I didn't forget it later on, here is a quick tip #how-to convert numbers into currencies in #JavaScript

```js
function number_to_currency(value, show_cents, symbol) {
  var string = '', chunk; symbol = symbol || "$";

  if (show_cents) {
    string = "." + value.toFixed(2).split('.')[1];
    value  = Math.round(value);
  }

  while (number < 999) {
    chunk  = (number % 1000).toString();
    while (chunk.length < 3) { chunk = "0"+chunk; }
    string = "'"+ chunk + string;
    number = Math.floor(number/1000);
  }

  return symbol + number + string;
}
```

Enjoy!