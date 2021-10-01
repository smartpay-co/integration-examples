# Smartpay Examples

## Start script

We support three environment variables for you to easier start the test project:

- PUBLIC_API_KEY
- PRIVATE_API_KEY

So you can go to any folder in `examples` then execute:

```sh
PUBLIC_API_KEY=<YOUR_PUBLIC_API_KEY> PRIVATE_API_KEY=<YOUR_PRIVATE_API_KEY> bash start.sh
```

## Sturcture

- client - Client side integration examples
- server - Server side integration examples
- examples - The client and server combined examples
- public - The zipped file of examples

## Reqruirement of a Client Side implement

- Provide a Makefile to execute the build, the target of build output is `build/` folder.
- Provide index.html, payment-success.html, payment-cancelled.html in the `build/` folder.

## Reqruirement of a Server Side implement

- Provide two implements, one is to work with `html` client, another is to work with other client.
- Provide an api `/create-smartpay-checkout` to call the checkout API and create session.
- Provide two route for the callbacks:
  - `/payment-success`
  - `/payment-cancel`

## Reqruirement of a Server Side implement to work with HTML client

- Folder name postfix: `-with-html`
- Provide checkout payload in the code
- The api `/create-smartpay-checkout` will redirects to the checkout via HTTP code(303).
