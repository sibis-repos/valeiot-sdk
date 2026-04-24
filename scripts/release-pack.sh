#!/usr/bin/env bash

set -euo pipefail

github_output="${GITHUB_OUTPUT:?GITHUB_OUTPUT is required}"

npm pack --json > pack-output.json
tarball_name="$(node -p "JSON.parse(require('fs').readFileSync('pack-output.json', 'utf8'))[0].filename")"

echo "tarball_name=${tarball_name}" >> "${github_output}"
