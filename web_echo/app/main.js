define(function (require) {

  require("adapter");
  var Vue = require("app/vue");

  var AudioContext = window.AudioContext || window.webkitAudioContext;

  var audioPanel = new Vue({
    el: "#audio-panel",
    methods: {
      mediaPormiseSuccess: function (stream) {
        var self = this;
        self.$els.audioTag.src = window.URL.createObjectURL(stream);
        // process
        // TODO: 似乎不行
        self.mediaProcess();
      },
      mediaProcess: function () {
        var self = this;
        var context = new AudioContext();
        var source = context.createMediaElementSource(self.$els.audioTag);
        var delayNode = context.createDelay(4);
        source.connect(delayNode);
        delayNode.connect(context.destination);
      }
    },
    ready: function () {
      var self = this;
      self.$$mediaPormise = navigator.mediaDevices.getUserMedia({audio:true});
      self.$$mediaPormise.then(self.mediaPormiseSuccess);
    }
  });

})
