Vue.component('my-list', {
  template: '#my-list',
  props: [ 'title', 'items' ]
});

Vue.component('my-new-list', {
  template: '#my-new-list',
  props: [ 'title', 'items' ]
});

new Vue({
  el: '#app',
  data: {
    persons: [ 
      { name: 'Michelle', tweet: '@MichelleObama' }, 
      { name: 'Barack', tweet: '@BarackObama' }, 
      { name: 'Donald', tweet: '@realDonaldTrump' }
    ],
    parties: [
      { name: 'Republican Party', senators: 53, },
      { name: 'Democratic Party', senators: 45 },
      { name: 'Independent', senators: 2 }
    ]
  }
});