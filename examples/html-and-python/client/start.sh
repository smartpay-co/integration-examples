
echo 'Frontend: HTML'

echo 'Try to use python3 http.server'
python3 -m http.server 8080 -d build &
PID="$!"

echo $PID

if ps -p $PID > /dev/null
then
  echo 'Using python3 http.server'
else
  echo 'Try to use npx serve'
  npx serve -p 8080 build &
  PID="$!"

  if ps -p $PID > /dev/null
  then
  echo 'Using npx serve'
  else
    echo 'Unable to serve Frontend service'
  fi
fi

function trap_ctrlc ()
{
    echo "Stop Frontend Server, Service PID: $PID"

    kill -- $PID
    exit 2
}

trap "trap_ctrlc" RETURN INT ERR TERM EXIT

wait $PID
