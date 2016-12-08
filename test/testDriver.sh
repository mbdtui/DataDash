#!/bin/sh 
for dir in ./test/* ; 
do
  #  echo $dir
  if [ -f "$dir" ]
  then
    continue
  fi
  for dir2 in "$dir"/*;
  do
  if [ -f "$dir2" ]
  then 
    continue
  fi
    #    echo $di2
    for testFile in "$dir2"/*.js;
    do
      if ! [ -e "$testFile" ] 
      then 
        continue
      fi
      node "$testFile"
    done
  done
done
