unexpand -t 2 "$1" > "$1".temp
rm "$1"
mv "$1".temp "$1"
