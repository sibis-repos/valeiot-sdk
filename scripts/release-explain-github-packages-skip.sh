#!/usr/bin/env bash

set -euo pipefail

package_name="${PACKAGE_NAME:?PACKAGE_NAME is required}"
repository_owner="${REPOSITORY_OWNER:?REPOSITORY_OWNER is required}"

echo "Skipping GitHub Packages publish because package scope does not match the repository owner namespace."
echo "Package: ${package_name}"
echo "Repository owner: ${repository_owner}"
