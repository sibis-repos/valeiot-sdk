#!/usr/bin/env bash

set -euo pipefail

tag_name="${TAG_NAME:?TAG_NAME is required}"
repository_owner="${REPOSITORY_OWNER:?REPOSITORY_OWNER is required}"
github_output="${GITHUB_OUTPUT:?GITHUB_OUTPUT is required}"

package_name="$(node -p "JSON.parse(require('fs').readFileSync('package.json', 'utf8')).name")"
package_version="$(node -p "JSON.parse(require('fs').readFileSync('package.json', 'utf8')).version")"
normalized_tag="${tag_name#v}"
package_scope="${package_name%%/*}"
package_scope="${package_scope#@}"
owner_lc="$(printf '%s' "${repository_owner}" | tr '[:upper:]' '[:lower:]')"
scope_lc="$(printf '%s' "${package_scope}" | tr '[:upper:]' '[:lower:]')"

if [[ "${normalized_tag}" != "${package_version}" ]]; then
  echo "Tag ${tag_name} does not match package.json version ${package_version}."
  exit 1
fi

if [[ "${scope_lc}" == "${owner_lc}" ]]; then
  publish_github_packages="true"
else
  publish_github_packages="false"
fi

{
  echo "tag_name=${tag_name}"
  echo "package_name=${package_name}"
  echo "package_version=${package_version}"
  echo "publish_github_packages=${publish_github_packages}"
} >> "${github_output}"
