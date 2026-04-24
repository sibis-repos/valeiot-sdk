#!/usr/bin/env bash

set -euo pipefail

github_repository="${GITHUB_REPOSITORY:?GITHUB_REPOSITORY is required}"
tag_name="${TAG_NAME:?TAG_NAME is required}"
package_name="${PACKAGE_NAME:?PACKAGE_NAME is required}"
github_sha="${GITHUB_SHA:?GITHUB_SHA is required}"

package_version="$(node -p "JSON.parse(require('fs').readFileSync('package.json', 'utf8')).version")"
package_description="$(node -p "JSON.parse(require('fs').readFileSync('package.json', 'utf8')).description || ''")"

gh api \
  --method POST \
  -H "Accept: application/vnd.github+json" \
  "/repos/${github_repository}/releases/generate-notes" \
  -f tag_name="${tag_name}" \
  -f target_commitish="${github_sha}" \
  --jq '.body' > generated-notes.md

cat <<EOF > release-notes.md
## ${package_name} ${package_version}

${package_description}

### Install

\`\`\`bash
npm install ${package_name}@${package_version}
\`\`\`

### Package

- npm: https://www.npmjs.com/package/${package_name}/v/${package_version}

### Changes

$(cat generated-notes.md)
EOF
