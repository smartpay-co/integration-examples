<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use GuzzleHttp\Psr7\LazyOpenStream;

require __DIR__ . '/./vendor/autoload.php';

$app = AppFactory::create();

$app->get('/', function (Request $request, Response $response, $args) {
    return $response
	->withHeader('Location', 'http://127.0.0.1:5000/index.html')
	->withStatus(302);
});

$app->get('/{file}', function (Request $request, Response $response, $args) {
    $filePath = __DIR__ . '/../client/build/' . $args['file'];
    switch (pathinfo($filePath, PATHINFO_EXTENSION)) {
	case 'css':
	    $mimeType = 'text/css';
	    break;

	default:
	    $mimeType = 'text/html';
    }

    $newResponse = $response->withHeader('Content-Type', $mimeType . '; charset=UTF-8');
    $newResponse->getBody()->write(file_get_contents($filePath));
    return $newResponse;
});

$app->post('/create-smartpay-checkout', function (Request $request, Response $response, $args) {
    $api = new \Smartpay\Api(getenv('PUBLIC_KEY'), getenv('SECRET_KEY'));
    try {
	$checkoutSession = $api->checkoutSession([
	    "customerInfo" => [
		"emailAddress" => "success@smartpay.co",
	    ],
	    "orderData" => [
		"amount" => 250,
		"currency" => "JPY",
		"shippingInfo" => [
		    "address" => [
			"line1" => "line1",
			"locality" => "locality",
			"postalCode" => "123",
			"country" => "JP"
		    ],
		],
		"lineItemData" => [[
		    "priceData" => [
			"productData" => [
			    "name" => "レブロン 18 LOW",
			],
			"amount" => 250,
			"currency" => "JPY",
		    ],
		    "quantity" => 1
		]]
	    ],
	    "reference" => "order_ref_1234567",
	    "successUrl" => "https://docs.smartpay.co/example-pages/checkout-successful",
	    "cancelUrl" => "https://docs.smartpay.co/example-pages/checkout-canceled"
	]);
    } catch (Exception $e) {
	echo \GuzzleHttp\Psr7\Message::toString($e->getResponse());
    }

    return $response
	->withHeader('Location', $checkoutSession->redirectUrl())
	->withStatus(302);
});

$app->run();
