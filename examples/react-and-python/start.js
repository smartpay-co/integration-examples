const util = require('util');
const chalk = require('chalk');
const boxen = require('boxen');
const { write: copy } = require('clipboardy');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});
const question = util.promisify(readline.question).bind(readline);

const FE_SERVER_URL = 'http://localhost:3080';

const main = async function () {
  let message = `${chalk.green(
    'Hey! Thank you for your interest in Smartpay'
  )}\n\nVisit ${FE_SERVER_URL} if the builds are done!\n\nOtherwise, wait for a couple more seconds :)`;

  if (!process.env.PUBLIC_KEY) {
    process.env.PUBLIC_KEY = await question(
      chalk.green('What is your Smartpay PUBLIC_KEY?  ')
    );
  }

  if (!process.env.SECRET_KEY) {
    process.env.SECRET_KEY = await question(
      chalk.green('What is your Smartpay SECRET_KEY?  ')
    );
  }

  readline.close();

  const runAll = require('npm-run-all');

  runAll(['client', 'server'], {
    parallel: true,
    stdout: process.stderr,
    stderr: process.stderr,
    printName: true,
    printLabel: true,
  })
    .then((results) => {
      console.log(`${results[0].name}: ${results[0].code}`); // client
      console.log(`${results[1].name}: ${results[1].code}`); // server
    })
    .catch((err) => {
      console.log('failed!');
    });

  setTimeout(async () => {
    try {
      await copy(FE_SERVER_URL);

      message += `\n\n${chalk.grey('Copied local address to clipboard!')}`;
    } catch (err) {
      console.error(error(`Cannot copy to clipboard: ${err.message}`));
    }

    console.log(
      boxen(message, {
        padding: 1,
        margin: 1,
        borderColor: 'green',
      })
    );
  }, 5001);
};

main();
