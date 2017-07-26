'uses strict';

const apiGateWay = require('ali-api-gateway');
const Api = apiGateWay.Api;
const get = new Api();

get.use(async function(ctx) {
  ctx.setHeaders('Content-Type', 'image/png');
  ctx.body = 'R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
  ctx.res.encoding = 'base64';
});

exports.get = get.wrap();
