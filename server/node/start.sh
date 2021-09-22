
echo 'Backend: NodeJS'

yarn
yarn_status=$?

if [ $yarn_status -eq 0 ]
then
  yarn start &
  PID="$!"
else
  npm install
  npm run start &
  PID="$!"
fi

function trap_ctrlc ()
{
    echo "Stop Backend Server, Service PID: $PID"

    kill -- $PID
    exit 2
}

trap "trap_ctrlc" RETURN INT ERR TERM EXIT

wait $PID
