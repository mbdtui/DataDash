errorLog="./test/logs/error_$(date +%m_%d_%H_%M_%S).log"
echo "Running tests..."
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
    for testFile in "$dir2"/test*.js;
    do
      if ! [ -e "$testFile" ]
      then
        continue
      fi
      node "$testFile" 1> /dev/null 2>> $errorLog
      if [ $? -eq 0 ]
      then
        echo "${testFile:6}...Passed"
      else
        echo "--------------------------------" >> $errorLog
        echo "${testFile:6}...Fail"
      fi
    done
  done
done
