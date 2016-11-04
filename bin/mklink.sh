#!/bin/bash

base="/Users/uvii/proj/seasir/seasir/"
langs=(en ct cn kr)
subs=(css js img bf cgi download)
res="resource/"

for lang in ${langs[*]}
do
  for sub in ${subs[*]}
  do
    t=$base$lang"/"$sub
    s=$base$res$sub"/"
    printf "ln -nsf %s %s\n" $s $t
    if ln -nsf "$s" "$t"; then
      printf "ln -nsf %s %s\n" $s $t
    else
      printf "unable to [ln -nsf %s %s]\n" $s $t
    fi
  done
done
