/* global hexo */

'use strict';

const { parse } = require('url');
const crypto = require('crypto');
const fixkey = (key) => key.toString().substr(0, 15).padEnd(32, 'a');

const encryption = (data, key, iv) => {
    iv = iv || "";
    var clearEncoding = 'utf8';
    var cipherEncoding = 'base64';
    var cipherChunks = [];
    var cipher = crypto.createCipheriv('aes-256-ecb', key, iv);
    cipher.setAutoPadding(true);
    cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));
    cipherChunks.push(cipher.final(cipherEncoding));
    return cipherChunks.join('');
}
hexo.extend.filter.register('after_post_render', data => {
  const { config } = hexo;
  const theme = hexo.theme.config;
  if (!theme.exturl && !theme.lazyload && !data.password) return;
  if (theme.lazyload) {
    data.content = data.content.replace(/(<img[^>]*) src=/img, '$1 data-src=');
  }
  if (theme.exturl) {
    const siteHost = parse(config.url).hostname || config.url;
    data.content = data.content.replace(/<a[^>]* href="([^"]+)"[^>]*>([^<]+)<\/a>/img, (match, href, html) => {
      // Exit if the href attribute doesn't exists.
      if (!href) return match;

      // Exit if the url has same host with `config.url`, which means it's an internal link.
      const link = parse(href);
      if (!link.protocol || link.hostname === siteHost) return match;

      return `<span class="exturl" data-url="${Buffer.from(href).toString('base64')}">${html}<i class="fa fa-external-link-alt"></i></span>`;
    });
  }
  if(data.password){
    let passageContent = encryption(data.content.toString(), fixkey(data.password));
    data.__passageContent = passageContent;
  }
}, 0);
