const pluginRss = require('@11ty/eleventy-plugin-rss');
const { DateTime } = require('luxon');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addPassthroughCopy({
    './public/': '/',
  });

  eleventyConfig.addWatchTarget('./public/styles.css');

  eleventyConfig.addFilter('readableDate', (dateObj, format, zone) => {
    // Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
    return DateTime.fromJSDate(dateObj, { zone: zone || 'utc' }).toFormat(
      format || 'LLLL dd, yyyy'
    );
  });

  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    // dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
  });
};
