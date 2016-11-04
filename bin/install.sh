#!/bin/bash

base="../"
langs=(en ct cn kr)

for lang in ${langs[*]}
do
    path=$base$lang
    printf "mkdir %s\n" $path
    mkdir $path
done
