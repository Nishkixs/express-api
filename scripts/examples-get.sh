#!/bin/sh

curl --include --request GET http://localhost:3000/examples/$ID \
  --header "Authorization: Token token=$TOKEN"
