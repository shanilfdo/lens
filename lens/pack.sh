#!/bin/bash

# Build the lens server
npm run build

cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static

mkdir .next/standalone/database
cp database/db.js .next/standalone/database/db.js
cp database/migration.js .next/standalone/database/migration.js
cp bin.js .next/standalone/bin.js
cp ../README.md .next/standalone/README.md
cp ../LICENSE .next/standalone/LICENSE

cat <<EOF >.next/standalone/.gitignore
/node_modules
EOF