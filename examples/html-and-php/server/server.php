<?php

require __DIR__ . '/./vendor/autoload.php';

$app = new \Slim\App;

$app->map(['get', 'post'], '/', function ($request, $response, $args) {
    $fileName = trim($request->getUri()->getBasePath(), '/');

    if ($request->isPost()) {
        $api = new \Smartpay\Api(getenv('SECRET_KEY'), getenv('PUBLIC_KEY'));
        try {
            $checkoutSession = $api->checkoutSession([
                'amount' => 400,
                'currency' => 'JPY',
                'items' => [[
                    'name' => 'オリジナルス STAN SMITH',
                    'amount' => 250,
                    'currency' => 'JPY',
                    'quantity' => 1,
                ]],
                'customerInfo' => [
                    'accountAge' => 20,
                    'email' => 'merchant-support@smartpay.co',
                    'firstName' => '田中',
                    'lastName' => '太郎',
                    'firstNameKana' => 'たなか',
                    'lastNameKana' => 'たろう',
                    'address' => [
                        'line1' => '北青山 3-6-7',
                        'line2' => '青山パラシオタワー 11階',
                        'subLocality' => '',
                        'locality' => '港区',
                        'administrativeArea' => '東京都',
                        'postalCode' => '107-0061',
                        'country' => 'JP',
                    ],
                    'dateOfBirth' => '1985-06-30',
                    'gender' => 'male',
                ],
                'shippingInfo' => [
                    'address' => [
                        'line1' => '北青山 3-6-7',
                        'line2' => '青山パラシオタワー 11階',
                        'subLocality' => '',
                        'locality' => '港区',
                        'administrativeArea' => '東京都',
                        'postalCode' => '107-0061',
                        'country' => 'JP',
                    ],
                    'feeAmount' => 150,
                    'feeCurrency' => 'JPY',
                ],
                'reference' => 'order_ref_1234567',
                'successUrl' => 'https://docs.smartpay.co/example-pages/checkout-successful',
                'cancelUrl' => 'https://docs.smartpay.co/example-pages/checkout-canceled'
            ]);
        } catch (Exception $e) {
            echo $e;

            echo \GuzzleHttp\Psr7\Message::toString($e->getResponse());
        }

        return $response->withRedirect($checkoutSession->redirectUrl(), 302);
    } else {
        $filePath = __DIR__ . '/../client/build/' . $fileName;

        switch (pathinfo($filePath, PATHINFO_EXTENSION)) {
            case 'css':
                $mimeType = 'text/css';
                break;

            default:
                $mimeType = 'text/html';
        }

        $body = $response->getBody();
        $body->write(file_get_contents($filePath));
        return $response
            ->withHeader('Content-Type', $mimeType . '; charset=UTF-8')
            ->withBody($body);
    }
});

$app->run();
