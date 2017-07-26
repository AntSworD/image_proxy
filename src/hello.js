'uses strict';

const apiGateWay = require('ali-api-gateway');
const Api = apiGateWay.Api;
const get = new Api();

get.use(async function(ctx) {
  let image = 'R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

  ctx.setHeader('Content-Type', 'image/png');
  ctx.body = Buffer.from(image, 'base64');
});

exports.get = get.wrap();
