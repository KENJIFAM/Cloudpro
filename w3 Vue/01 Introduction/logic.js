const isNotNumericValue = value => isNaN(value) || !isFinite(value);

const STORAGE_KEY = 'calcResult-vuejs';
const calcStorage = {
  fetch: function () {
    const calcResults = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    calcResults.forEach((calcResult, index) => calcResult.id = index);
    calcStorage.uid = calcResults.length;
    return calcResults;
  },
  save: function (calcResult) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(calcResult));
  }
};

const calc = new Vue({
  el: '#app',
  data: { 
    x: 0, 
    y: 0, 
    result: 0,
    calcResults: calcStorage.fetch()
  },
  methods: {
    multiplyBy: function() {
      let x = parseFloat(this.x);
      if(isNotNumericValue(x))
        return this.result;

      let y = parseFloat(this.y);
      if(isNotNumericValue(y))
        return this.result;
      
      this.result = x * y;

      this.calcResults.push({
        id: calcStorage.uid++,
        number1: x,
        number2: y,
        method: "Multiply",
        result: this.result
      });

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

      this.calcResults.push({
        id: calcStorage.uid++,
        number1: x,
        number2: y,
        method: "Divide",
        result: this.result
      });

      return this.result;
    }
  },
  watch: {
    calcResults: {
      handler: function (calcResults) {
        calcStorage.save(calcResults);
      },
      deep: true
    }
  }
});