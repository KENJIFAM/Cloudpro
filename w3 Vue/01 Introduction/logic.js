const isNotNumericValue = value => isNaN(value) || !isFinite(value);

const calc = new Vue({
  el: '#app',
  data: { x: 0, y: 0, result: 0},
  methods: {
    multiplyBy: function() {
      let x = parseFloat(this.x);
      if(isNotNumericValue(x))
        return this.result;

      let y = parseFloat(this.y);
      if(isNotNumericValue(y))
        return this.result;
      
      this.result = x * y;
      return this.result;
    },
    divideBy: function() {
      let x = parseFloat(this.x);
      if(isNotNumericValue(x))
        return this.result;

      let y = parseFloat(this.y);
      if(isNotNumericValue(y))
        return this.result;

      this.result = x / y;
      return this.result;
    }
  }
});