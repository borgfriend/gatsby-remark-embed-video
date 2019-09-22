"use strict";

/**
 * Gatsby plugins always reference from './' thus files in ./dist were not found.
 * Thus to avoid any issues with how Gatsby works this file was added
*/

module.exports = require("./dist/index");
