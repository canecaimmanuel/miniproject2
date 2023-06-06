
var iframe = document.createElement('iframe');

var loc1 = "commonfiles/"
var loc2 = "game.html"

iframe.src = loc1 + loc2;


iframe.width = '100%'; // Set width to 100%
iframe.height = '300';
iframe.frameBorder = '0';

var container = document.getElementById('canvas');
container.appendChild(iframe);
