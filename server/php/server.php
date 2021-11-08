<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Slim\Factory\AppFactory;

require __DIR__ . '/./vendor/autoload.php';

$app = AppFactory::create();

$app->add(function ($request, $handler) {
    $response = $handler->handle($request);
    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

$app->options('/create-smartpay-checkout', function (Request $request, Response $response) {
    return $response
        ->withHeader('Content-Type', 'application/json');
});

$app->post('/create-smartpay-checkout', function (Request $request, Response $response, $args = []) {
    $api = new \Smartpay\Api(getenv('PUBLIC_KEY'), getenv('SECRET_KEY'));

    $checkoutSession = $api->checkoutSession($request->getParsedBody());
    $payload = json_encode($checkoutSession->asJson());
    $response->getBody()->write($payload);
    return $response->withHeader('Content-Type', 'application/json');
});

$app->run();
