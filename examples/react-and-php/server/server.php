<?php

require __DIR__ . '/./vendor/autoload.php';

$app = new \Slim\App;

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Origin')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

$app->options('/', function ($request, $response, $args) {
    return $response
        ->withHeader('Content-Type', 'application/json');
});

$app->post('/', function ($request, $response, $args = []) {
    $api = new \Smartpay\Api(getenv('SECRET_KEY'), getenv('PUBLIC_KEY'));

    $checkoutSession = $api->checkoutSession($request->getParsedBody());
    $payload = json_encode($checkoutSession->asJson());
    $response->getBody()->write($payload);
    return $response->withHeader('Content-Type', 'application/json');
});

$app->run();
