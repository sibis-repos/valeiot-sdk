#!/usr/bin/env bash

set -euo pipefail

github_repository="${GITHUB_REPOSITORY:?GITHUB_REPOSITORY is required}"
tag_name="${TAG_NAME:?TAG_NAME is required}"
package_name="${PACKAGE_NAME:?PACKAGE_NAME is required}"
github_sha="${GITHUB_SHA:?GITHUB_SHA is required}"

gh api \
  --method POST \
  -H "Accept: application/vnd.github+json" \
  "/repos/${github_repository}/releases/generate-notes" \
  -f tag_name="${tag_name}" \
  -f target_commitish="${github_sha}" \
  --jq '.body' > generated-notes.md

cat <<EOF > release-notes.md
npm: https://www.npmjs.com/package/${package_name}

$(cat generated-notes.md)
EOF
