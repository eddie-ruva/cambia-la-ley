/**
 * LawController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

// Compare function to use with Array.sort()
// compares articles by the amount of annotations
// DESC order
var descCompareArticles = function(a, b) {
  if (a.annotations.length < b.annotations.length) return 1;
  if (a.annotations.length > b.annotations.length) return -1;
  return 0;
};

module.exports = {

  index: function(req, res) {
    var slug = req.param("tag");
    // Filter laws by tag
    Tag.findOne({slug: slug}).exec(function(err, tag) {
      // if tag found use it as filter
      var filterCriteria = tag ? {tag: tag.id} : {};
      if (err) return res.send((err, 500));
      Law.find(filterCriteria).exec(function(err, laws) {
        if (err) return res.send(err, 500);
        Tag.find().exec(function(err, tags) {
          if (err) return res.send(err, 500);
          res.view('law/index', {laws: laws, tags: tags});
        });
      });
    });
  },

  find: function(req, res) {
    var lawId = req.param("id");
    Law.findOne(lawId).exec(function(err, law) {
      if (err) return res.send(err, 500);
      Article.find({law: lawId}).populate('annotations').exec(function(err, articles) {
        if (err) return res.send(err, 500);
        // Sort articles by ammount of annotations on DESC order
        // Use only the top six articles
        law.articles = articles.sort(descCompareArticles).slice(0, 6);
        return res.view('law/find', {law: law});
      });
    });
  },

  newLaw: function(req, res) {
    Tag.find({}).exec(function(err, laws) {
      if (err) return res.send(500, err);
      return res.view('law/new', {tags: tags});
    });
  },

  edit: function(req, res) {
    Law.findOne(req.param('id')).exec(function(err, law) {
      if (err) return res.send(500, err);
      Tag.find({}).exec(function(err, tags) {
        if (err) return res.send(500, err);
        return res.view('law/edit', {law: law, tags: tags});
      });
    });
  }
	
};
