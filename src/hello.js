'uses strict';

const urllib = require('urllib');
const apiGateWay = require('ali-api-gateway');
const dataUriToBuffer = require('data-uri-to-buffer');
const fileType = require('file-type');
const Api = apiGateWay.Api;
const get = new Api();

get.use(async function(ctx) {
  if (!ctx.req.queryParameters.src) {
    throw ctx.newError(404, '缺少 src');
  }

  let dataUri = ctx.req.queryParameters.src;
  if (typeof dataUri !== 'string') {
    throw ctx.newError(404, 'src 不是 string');
  }

  const MIME_WHITELIST = ['image/png', 'image/jpeg', 'image/gif'];
  let buffer = null;

  if (dataUri.indexOf('data:') === 0) {
    buffer = dataUriToBuffer(dataUri);
  } else {
    buffer = urllib.request(dataUri).then(res => res.data).catch(e => null);
  }

  if (!buffer) {
    throw ctx.newError(404, 'buffer 为空');
  }
  let type = fileType(buffer);

  if (!type || MIME_WHITELIST.indexOf(type.mime) === -1) {
    throw ctx.newError(404, '图片格式有误');
  }

  ctx.setHeader('Content-Type', type.mime);
  ctx.body = buffer.toString('base64');
  ctx.res.encoding = 'base64';
});

exports.get = get.wrap();
