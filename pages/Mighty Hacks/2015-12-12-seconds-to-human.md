# Converting Seconds To Human

I have this recurring task that pops up every time when I need to say present
an ETA time frame or any other arbitrary time span. How do you convert a time
period that is milliseconds into a human friendly text?

I have figured a relatively straight forward and flexible solution in #javascript
and thought I should post it over here:

```js
function msToHuman(ms) {
  let total   = Math.floor(ms / 1000);
  let seconds = total % 60; total = Math.floor(total / 60);
  let minutes = total % 60; total = Math.floor(total / 60);
  let hours   = total % 24; total = Math.floor(total / 24);
  let days    = total % 30; total = Math.floor(total / 30);
  let months  = total;

  if (months) {
    return `${months} months, ${days} days`;
  } else if (days) {
    return `${days} days, ${hours} hours`;
  } else if (hours) {
    return `${zerofy(hours)}:${zerofy(minutes)}:${zerofy(seconds)}`;
  } else if (minutes) {
    return `${zerofy(minutes)}:${zerofy(seconds)}`;
  } else {
    return `${seconds}sec`;
  }

  function zerofy(num) {
    return num > 9 ? num : "0"+num;
  }
}
```

The idea is pretty simple, I continuously get a mod value from the total and
then divide and floor the total sequentially by the number of seconds, minutes,
hours and days.

Once I have those numbers, I go in the reverse order from larger spans to the
smaller ones, find the one that is non-zero and present the values we collected
in an appropriate way for the scale of the time span.

That's pretty much it, enjoy!
