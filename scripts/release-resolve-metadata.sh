#!/usr/bin/env bash

set -euo pipefail

tag_name="${TAG_NAME:?TAG_NAME is required}"
github_output="${GITHUB_OUTPUT:?GITHUB_OUTPUT is required}"

package_name="$(node -p "JSON.parse(require('fs').readFileSync('package.json', 'utf8')).name")"
package_version="$(node -p "JSON.parse(require('fs').readFileSync('package.json', 'utf8')).version")"
normalized_tag="${tag_name#v}"

if [[ "${normalized_tag}" != "${package_version}" ]]; then
  echo "Tag ${tag_name} does not match package.json version ${package_version}."
  exit 1
fi

{
  echo "tag_name=${tag_name}"
  echo "package_name=${package_name}"
  echo "package_version=${package_version}"
} >> "${github_output}"
