window.onload = function() {
  if (!!document.getElementById('accordion')) {
    let accordion = new Vue({
      el: '#accordion',
      delimiters: ['${', '}'],
      data: {
        nodeId: drupalSettings.internalPath,
        items: [],
        response: ''
      },
      methods: {
        beforeEnter: function(el) {
          this.items.forEach(function(item) {
            item.show = false;
          });
          el.style.height = '0';
        },
        enter: function(el) {
          el.style.height = el.scrollHeight + 'px';
        },
        beforeLeave: function(el) {
          el.style.height = el.scrollHeight + 'px';
        },
        leave: function(el) {
          el.style.height = '0';
        }
      },
      created() {
        let self = this;

        axios.get(window.location.origin + '/entity/router?path=' + this.nodeId + '&format=api_json')
          .then(response => {
            self.items = response.data.data.attributes.items;
          })
          .catch(error => {
            console.log(error);
          })
          .then(() => {
            for (let i = 0; i < self.items.length; i++) {
              self.$set(this.items[i], 'show', false);
            }
          });
      }
    });
  }
};
