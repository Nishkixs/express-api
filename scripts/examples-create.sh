#!/bin/sh
curl --include --request POST http://localhost:3000/bookss/ \
  --header "Authorization: Token token=$TOKEN"
