'use strict';

window.onload = function () {
  if (!!document.getElementById('accordion')) {
    var accordion = new Vue({
      el: '#accordion',
      delimiters: ['${', '}'],
      data: {
        nodeId: drupalSettings.internalPath,
        items: [],
        response: ''
      },
      methods: {
        beforeEnter: function beforeEnter(el) {
          this.items.forEach(function (item) {
            item.show = false;
          });
          el.style.height = '0';
        },
        enter: function enter(el) {
          el.style.height = el.scrollHeight + 'px';
        },
        beforeLeave: function beforeLeave(el) {
          el.style.height = el.scrollHeight + 'px';
        },
        leave: function leave(el) {
          el.style.height = '0';
        }
      },
      created: function created() {
        var _this = this;

        var self = this;

        axios.get(window.location.origin + '/entity/router?path=' + this.nodeId + '&format=api_json').then(function (response) {
          self.items = response.data.data.attributes.items;
        }).catch(function (error) {
          console.log(error);
        }).then(function () {
          for (var i = 0; i < self.items.length; i++) {
            self.$set(_this.items[i], 'show', false);
          }
        });
      }
    });
  }
};
//# sourceMappingURL=main-vue.js.map
