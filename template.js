/**
 * In this module, we export a handlebars template "function"
 * for every ".hbs" file we find in the templates directory.
 *
 * The export name is the filename of the ".hbs" file minus
 * the ".hbs" extension.
 */

const fs = require('fs');
const handlebars = require('handlebars');

function createTemplate(filename) {
  const templateHtml = fs.readFileSync(filename, 'utf8');
  return handlebars.compile(templateHtml);
}

const templatePath = `${__dirname}/template`;
const templateDir = fs.readdirSync(templatePath);
templateDir.forEach(filename => {
  // Only create templates from *.hbs files
  const filenameParts = filename.match(/^(.+?)\.hbs$/);
  if (filenameParts) {
    const templateName = filenameParts[1];

    // export template function into templateName key
    module.exports[templateName] = createTemplate(`${templatePath}/${filename}`);
  }
});
