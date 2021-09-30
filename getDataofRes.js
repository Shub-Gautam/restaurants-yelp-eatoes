var request = require("request-promise");
var cherrio = require("cheerio");

const resDataObject = require("./schemas/restaurentS.js");

var name, address, workinghours, imgurl, latandlang;

function getDataofRes(url) {
  // Extract Data
  request(url, (err, response, html) => {
    if (!err && response.statusCode == 200) {
      var $ = cherrio.load(html);

      //   Find Data on the page
      name = $(".css-m7s7xv").text();
      address = $("address").text();
      workinghours = $(
        "html>body>div>div>yelp-react-root>div>div>div>div>div>div>div>div>div>div>span>span"
      ).text();
      latandlang = $("").text();
      imgurl = $("").text();
    }
  });

  //   Adding Data to the mongodb object
  var file = new resDataObject({
    name: name,
    imgurl: "imgurl",
    address: address,
    latlng: "latandlang",
    bussinesshours: workinghours,
  });

  setTimeout(() => {
    const response = file.save().then(console.log("successfully stored"));
  }, 10000);

  // Save it to the mongodb Atlas
  // Define another module for saving this.
}

getDataofRes("https://www.yelp.com/biz/firepie-san-francisco");

//   var imgurl = $("css-bq71j2").text();
//   var imgurl = $("img").find(".photo-header-media-image__373c0__rKqBU")
//     .attribs.src;
// console.log(imgurl);
