let accordion = new Vue({
  el: '#accordion',
  data: {
    // show: false,
    items: [
      {
        title: '1What is presbyopia?',
        content: '1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur aut consequatur doloribus eos ex impedit nostrum sint sunt suscipit velit. Assumenda aut autem cupiditate debitis deleniti dolore ea expedita iste, molestiae molestias non odio officia quis rem sed vitae voluptatem. Cum expedita itaque minus nobis odio possimus rem sed totam.',
        show: false
      },
      {
        title: '2What is presbyopia?',
        content: '2Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur aut consequatur doloribus eos ex impedit nostrum sint sunt suscipit velit. Assumenda aut autem cupiditate debitis deleniti dolore ea expedita iste, molestiae molestias non odio officia quis rem sed vitae voluptatem. Cum expedita itaque minus nobis odio possimus rem sed totam.',
        show: false
      },
      {
        title: '3What is presbyopia?',
        content: '3Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur aut consequatur doloribus eos ex impedit nostrum sint sunt suscipit velit. Assumenda aut autem cupiditate debitis deleniti dolore ea expedita iste, molestiae molestias non odio officia quis rem sed vitae voluptatem. Cum expedita itaque minus nobis odio possimus rem sed totam.',
        show: false
      }
    ]
  },
  methods: {
    // toggle: function(e) {
    //   this.show = !this.show;
    //   // this.accItem = e.target.closest('.faq-item').children[1];
    // },
    beforeEnter: function(el) {
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
  mounted() {
    // this.items = this.$el.children;
  }
});
