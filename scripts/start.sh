
echo "Please visit http://127.0.0.1:8080/"

cd client 
bash start.sh &
FE_PID="$!"

cd ..

cd server 
bash start.sh &
BE_PID="$!"

echo "FE_PID: $FE_PID"
echo "BE_PID: $BE_PID"

function trap_ctrlc ()
{
    echo "Terminate All Services"

    echo "FE_PID: $FE_PID"
    kill -- $FE_PID

    echo "BE_PID: $BE_PID"
    kill -- $BE_PID
    exit 2
}

# initialise trap to call trap_ctrlc function
# when signal 2 (SIGINT) is received
trap "trap_ctrlc" SIGTERM SIGINT SIGHUP

wait $FE_PID
wait $BE_PID
