#!/usr/bin/env bash

set -euo pipefail

tag_name="${TAG_NAME:?TAG_NAME is required}"
package_version="${PACKAGE_VERSION:?PACKAGE_VERSION is required}"
github_sha="${GITHUB_SHA:?GITHUB_SHA is required}"
tarball_name="${TARBALL_NAME:-}"

if [[ -z "${tarball_name}" ]]; then
  tarball_name="$(find . -maxdepth 1 -name '*.tgz' -print -quit)"
fi

if [[ -z "${tarball_name}" ]]; then
  echo "Could not find a package tarball to attach to the GitHub Release."
  exit 1
fi

if gh release view "${tag_name}" > /dev/null 2>&1; then
  gh release edit "${tag_name}" \
    --title "${package_version}" \
    --notes-file release-notes.md
else
  gh release create "${tag_name}" \
    "${tarball_name}" \
    --title "${package_version}" \
    --notes-file release-notes.md \
    --target "${github_sha}"
fi
