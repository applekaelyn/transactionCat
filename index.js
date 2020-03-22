const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const spy = require('./spy.js');

const app = new Koa();
app.use(bodyParser());

app.use(async ctx => {
  const params = ctx.request.query;
  const goods = params.goodsIds.split(','); 

  console.log('goods:', goods);
  const res = await spy(params.ip, goods);

  ctx.body = res;
});

app.listen(3000, () => {
  console.log('server is starting at port 3000!');
});
