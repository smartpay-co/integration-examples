const util = require('util');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});
const question = util.promisify(readline.question).bind(readline);

const main = async function () {
  if (!process.env.PUBLIC_API_KEY) {
    process.env.PUBLIC_API_KEY = await question(
      'What is your Smartpay PUBLIC_API_KEY?  '
    );
  }

  if (!process.env.PRIVATE_API_KEY) {
    process.env.PRIVATE_API_KEY = await question(
      'What is your Smartpay PRIVATE_API_KEY? '
    );
  }

  readline.close();

  const runAll = require('npm-run-all');

  runAll(['client', 'server'], {
    parallel: true,
    stdout: process.stdout,
    stderr: process.stderr,
  })
    .then(() => {
      console.log('done!');
    })
    .catch((err) => {
      console.log('failed!');
    });

  setTimeout(function () {
    console.log('');
    console.log('');
    console.log('Please visit: http://localhost:8080');
    console.log('');
    console.log('');
  }, 3000);
};

main();