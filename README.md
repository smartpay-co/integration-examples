# Smartpay - Integration Examples

## Requirements

The following assumes the dev envioronment is on MacOS.

- Nodejs v12+
- jq (`brew install jq`)
- sponge (`brew install moreutils`)

## Get started with the examples

Environment variables are available for `PUBLIC_KEY` and `SECRET_KEY` to get you off the ground quickly without having to edit the code.

To get started, go into any examples under `./examples`, then execute the following:

```sh
PUBLIC_KEY=<YOUR_PUBLIC_KEY> SECRET_KEY=<YOUR_SECRET_KEY> npm run start
```

## Structure

```
├── client - front-end examples
├── examples - auto-generated fe/be compbined examples
├── public - downloadable zipped examples
├── scripts - build scripts
└── server - back-end examples
```

## Development

When you are working on the back-end (server) support, here are a couple of things you might want to know before you start.

1. Two folders are required for each back-end language. Say if you're working on the support for Ruby, two new folders will be required - `server/ruby` and `server/ruby-with-html`. The former offers the solution for the case where the frontend handles the redirection after the `checkout session` is created, on the other hand, for the latter, back-end handles the redirection (redirect via HTTP 303). Hence, the server implementation for the endpoint that creates the session would be different for the two cases. Please refer to the existing implementation for a more straightforward understanding.
2. Routes for both `success` and `cancel` need to be provided - `/payment-success` and `payment-cancel`.


## Build Examples


```shell
./scripts/build.sh
```
