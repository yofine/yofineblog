require.config({
  paths: {
    three: '../js/three.min',
    canvas: '../js/canvas'
  }
});

require(['three', 'canvas'], function (three, canvas) {
  console.log('Complete!');
});