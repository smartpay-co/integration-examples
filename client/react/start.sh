
echo 'Frontend: React'

yarn
yarn_status=$?

if [ $yarn_status -eq 0 ]
then
  PORT=8080 yarn start &
  PID="$!"
else
  npm install
  PORT=8080 npm run start &
  PID="$!"
fi

function trap_ctrlc ()
{
    echo "Stop Frontend Server, Service PID: $PID"

    kill -- $PID
    exit 2
}

trap "trap_ctrlc" RETURN INT ERR TERM EXIT

wait $PID
