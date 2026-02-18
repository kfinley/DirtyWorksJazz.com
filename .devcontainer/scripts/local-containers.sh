#!/bin/bash

containerCommands=()

position=0;

while [ $1 ]
do
    cmd=$1; shift
    srv=$1; shift

    containerCommands[$position]="$cmd $srv"
    position+=1

done

for cmd in "${containerCommands[@]}"
do
    cmdSrv=($cmd)
    if [ "${cmdSrv[0]}" == "restart" ]; then
        echo restarting...
        docker stop ${cmdSrv[1]}
        docker start ${cmdSrv[1]}
    else
        echo ${cmdSrv[0]}ing...
        docker ${cmdSrv[0]} ${cmdSrv[1]}
    fi
done
