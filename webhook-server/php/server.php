<?php

require __DIR__ . '/./vendor/autoload.php';

use Tuupola\Base62;

$base62 = new Base62(["characters" => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789']);
$secret = 'YOUR_SIGNING_KEY';

$app = new \Slim\App;

$app->map(['get', 'post'], '/', function ($request, $response, $args) use (&$base62, &$secret) {
    $fileName = trim($request->getUri()->getBasePath(), '/');

    if ($fileName == 'webhooks') {

        $headers = $request->getHeaders();
        $smartpaySignature = $request->getHeader('Smartpay-Signature')[0];
        $smartpaySignatureTimestamp = $request->getHeader('Smartpay-Signature-Timestamp')[0];

        if ($smartpaySignature && $smartpaySignatureTimestamp) {
            $body = $request->getBody();
            $parsedBody = $request->getParsedBody();

            $calculatedSignature = hash_hmac('sha256', $smartpaySignatureTimestamp . "." . $body, $base62->decode($secret));

            print_r($calculatedSignature);
            print_r($headers);
            print_r($parsedBody);

            if ($smartpaySignature == $calculatedSignature) {
                return $response;
            }
        }

        return $response->withStatus(400);
    } else {
        return $response->withStatus(404);
    }
});

$app->run();
