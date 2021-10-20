
echo 'Frontend: React'

yarn
yarn_status=$?

if [ $yarn_status -eq 0 ]
then
  PORT=8080 REACT_APP_PUBLIC_API_KEY=$PUBLIC_API_KEY yarn start &
  PID="$!"
else
  npm install
  PORT=8080 REACT_APP_PUBLIC_API_KEY=$PUBLIC_API_KEY npm run start &
  PID="$!"
fi

echo "Frontend Server, Service PID: $PID"

function trap_ctrlc ()
{
    echo "Stop Frontend Server, Service PID: $PID"

    kill -- $PID
    exit 2
}

trap "trap_ctrlc" RETURN INT ERR TERM EXIT

wait $PID
