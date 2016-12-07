for d in ./*/
do
	cd "$d"
	for f in *.js; do node "$f"; done
done
