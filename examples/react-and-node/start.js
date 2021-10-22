const util = require('util');
const boxen = require('boxen');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});
const question = util.promisify(readline.question).bind(readline);

const main = async function () {
  if (!process.env.PUBLIC_KEY) {
    process.env.PUBLIC_KEY = await question(
      'What is your Smartpay PUBLIC_KEY?  '
    );
  }

  if (!process.env.SECRET_KEY) {
    process.env.SECRET_KEY = await question(
      'What is your Smartpay SECRET_KEY?  '
    );
  }

  readline.close();

  const runAll = require('npm-run-all');

  runAll(['client', 'server'], {
    parallel: true,
    // stdout: process.stdout,
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

  setTimeout(function () {
    console.log(
      boxen('Please visit: http://localhost:3080', {
        padding: 1,
        margin: 1,
        borderColor: 'green',
      })
    );
  }, 3000);
};

main();
