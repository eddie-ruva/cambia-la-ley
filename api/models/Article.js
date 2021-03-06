/**
 * Article.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	attributes: {
    number: 'INTEGER',
    body: 'STRING',
    law: {
      model: 'law'
    },
    annotations: {
      collection: 'annotation',
      via: 'article'
    }
	},

  beforeCreate: function(attrs, next) {
    var marked = require('marked');
    marked(attrs.body, function(err, body) {
      if (err) return next(err);

      attrs.body = body;
      next();
    });
  },

  beforeUpdate: function(attrs, next) {
    var marked = require('marked');
    marked(attrs.body, function(err, body) {
      if (err) return next(err);

      attrs.body = body;
      next();
    });
  },

};
