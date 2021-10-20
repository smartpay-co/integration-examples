
echo 'Backend: Python'

export PATH="${PATH}:$(python3 -c 'import site; print(site.USER_BASE)')/bin"

pip3 install --user -r requirements.txt
FLASK_APP=server flask run --host=127.0.0.1 --port=5000 &
PID="$!"

echo "Backend Server, Service PID: $PID"

function trap_ctrlc ()
{
    echo "Stop Backend Server, Service PID: $PID"

    kill -- $PID
    exit 2
}

trap "trap_ctrlc" RETURN INT ERR TERM EXIT

wait $PID
