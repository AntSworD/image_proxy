'use strict';

const test = require('ava');
const apiGateway = require('ali-api-gateway');
const hello = require('../src/hello.js');

const http = apiGateway.http;

test.cb('parse params success', t => {
  http(hello.get, {body: {test: 'test'}, params: {haha: 'haha'}}, function(err, res) {
    t.deepEqual(res, { headers: {}, cookies: {}, encoding: 'utf8', statusCode: 200, body: 'hello world' });
    t.end();
  });
});

test.cb('parse params catch error', t => {
  http(hello.get, {body: {test: 'test'}}, function(err, res) {
    t.deepEqual(res, {'statusCode': 400, 'body': 'lack of request paramas haha', headers: {}, cookies: {}});
    t.end();
  });
});

test.cb('parse body catch error', t => {
  http(hello.get, {}, function(err, res) {
    t.deepEqual(res, {'statusCode': 400, 'body': 'lack of request body test', headers: {}, cookies: {}});
    t.end();
  });
});
