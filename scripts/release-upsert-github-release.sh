#!/usr/bin/env bash

set -euo pipefail

tag_name="${TAG_NAME:?TAG_NAME is required}"
package_version="${PACKAGE_VERSION:?PACKAGE_VERSION is required}"
tarball_name="${TARBALL_NAME:?TARBALL_NAME is required}"
github_sha="${GITHUB_SHA:?GITHUB_SHA is required}"

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
