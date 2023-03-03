curl -i -H "accept: application/json" -H "content-type: application/json" -X $2 $1

curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X $2 $1 >> output.json

if [ $2 == "GET" ]
then
	echo hello
else
	echo bye
fi
