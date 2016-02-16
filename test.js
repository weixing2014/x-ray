var Xray = require('./');
var fs = require('fs');
var xray = new Xray();
var Download = require('download');

var pageUrl = "http://cl.1024s.info/thread0806.php?fid=16&search=&page=1"

xray(pageUrl, 'tr.t_one', [{
  url: 'h3 a@href'
}])(function(err, arr) {
  if (arr) {
    arr.forEach(function(post, postIndex){
      xray(post.url, 'input', [{
        url: '@src',
      }])(function(err, images) {
        if(images) {
          var download = new Download({mode: '755'}).dest('./images/' + postIndex)
          images.forEach(function(image, imageIndex) {
            console.log(image.url);
            download.get(image.url);
          });
          download.run();
        }
      });
    })
  }
});


//
// xray(postUrl, 'input',
//     [{
//         img: '',
//         src: '@src',
//         width: '@width',
//         height: '@height'
//     }]
// )
// (function(err, results) {
//     var download = new Download();
//     results = results.filter(
//       function(image) {
//         return true;
//         //image.width > 300;
//       }).forEach(function(image) {
//         download.get(image.src);
//       });
//     download.dest('./images');
//     download.run();
//     fs.writeFile("./results.json", JSON.stringify(results, null, '\t'));
// })
