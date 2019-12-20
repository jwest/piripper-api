#!/bin/bash
HOST='http://localhost:3000'

ALBUM=`curl "$HOST/api/albums" | jq -r ".albums[].name" | fzf  --preview "curl $HOST/api/albums/{} | jq '.files[].name'"`

curl "http://localhost:3000/download/album/$ALBUM" -o $ALBUM.zip
