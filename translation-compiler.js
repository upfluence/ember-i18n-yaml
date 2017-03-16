'use strict';

const fs = require('fs');
const utils = require('./utils');
const Filter = require('broccoli-persistent-filter');

function TranslationCompiler (inputTree, options) {
  if (!(this instanceof TranslationCompiler)) {
    return new TranslationCompiler(inputTree, options);
  }

  if (!options.hasOwnProperty('persist')) {
    options.persist = true;
  }

  Filter.call(this, inputTree, options); // this._super()

  this.options = options;
}

TranslationCompiler.prototype = Object.create(Filter.prototype);
TranslationCompiler.prototype.constructor = TranslationCompiler;
TranslationCompiler.prototype.extensions = ['yml'];
TranslationCompiler.prototype.targetExtension = 'js';

TranslationCompiler.prototype.baseDir = function() {
  return __dirname;
};

TranslationCompiler.prototype.canProcessFile = function (relativePath) {
  return relativePath.indexOf('locales/') !== -1;
};

TranslationCompiler.prototype.processString = function (string) {
  return `export default ${utils.toJson(string)};`;
};

TranslationCompiler.prototype.cacheKeyProcessString = function(string, relativePath) {
  return Filter.prototype.cacheKeyProcessString.call(this, string, relativePath);
};

module.exports = TranslationCompiler;
