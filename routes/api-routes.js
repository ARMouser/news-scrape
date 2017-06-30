var request = require('request');
var cheerio = require('cheerio');

module.exports = function(app) {
    app.get('/scrape', function(req, res) {
        request("http://www.echojs.com/", function(error, response, html) {
                var $ = cheerio.load(html);
                var result = {}
                $("article h2").each(function(i, element) {
                    result.title = $(this).children("a").text();
                    result.link = $(this).children("a").attr("href"); 
                    res.render('index', result)
                });
            });
        })
}

// // Routes
// // ======

// // A GET request to scrape the echojs website
// app.get("/scrape", function(req, res) {
//   // First, we grab the body of the html with request
//   request("http://www.echojs.com/", function(error, response, html) {
//     // Then, we load that into cheerio and save it to $ for a shorthand selector
//     var $ = cheerio.load(html);
//     // Now, we grab every h2 within an article tag, and do the following:
//     $("article h2").each(function(i, element) {

//       // Save an empty result object
//       var result = {};

//       // Add the text and href of every link, and save them as properties of the result object
//       result.title = $(this).children("a").text();
//       result.link = $(this).children("a").attr("href");

//       // Using our Article model, create a new entry
//       // This effectively passes the result object to the entry (and the title and link)
//       var entry = new Article(result);

//       // Now, save that entry to the db
//       entry.save(function(err, doc) {
//         // Log any errors
//         if (err) {
//           console.log(err);
//         }
//         // Or log the doc
//         else {
//           console.log(doc);
//         }
//       });

//     });
//   });
//   // Tell the browser that we finished scraping the text
//   res.send("Scrape Complete");
// });

// // This will get the articles we scraped from the mongoDB
// app.get("/articles", function(req, res) {
//   // TODO: Finish the route so it grabs all of the articles
//   Article.find({}, function (err, response) {
//     if (err) throw err;
//     res.send(response);
//   });

// });

// // This will grab an article by it's ObjectId
// app.get("/articles/:id", function(req, res) {
//   // TODO
//   // ====

//   // Finish the route so it finds one article using the req.params.id,

//   // and run the populate method with "note",

//   // then responds with the article with the note included
// Article.find({
//   "_id": req.params.id
//   })
//   .populate('note')
//   .exec(function(err, data) {
//     if (err) throw err;
//     res.send(data)
//   })
// });

// // Create a new note or replace an existing note
// app.post("/articles/:id", function(req, res) {
//   var newNote = new Note(req.body);
//   newNote.save(function (err, doc) {
//     if (err) throw error;
//     Article.findOneAndUpdate({"_id": req.params.id}, {"note":doc._id})
//     .exec(function(err, doc) {
//       if (err) throw err;
//       res.send(doc)
//     })
//   })
//   // TODO
//   // ====

//   // save the new note that gets posted to the Notes collection

//   // then find an article from the req.params.id

//   // and update it's "note" property with the _id of the new note


// });

