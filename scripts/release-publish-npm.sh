#!/usr/bin/env bash

set -euo pipefail

max_attempts=4
attempt=1

while (( attempt <= max_attempts )); do
  echo "npm publish attempt ${attempt}/${max_attempts}"

  set +e
  output="$(npm publish --provenance 2>&1)"
  status=$?
  set -e

  printf '%s\n' "${output}"

  if [[ ${status} -eq 0 ]]; then
    exit 0
  fi

  if [[ "${output}" != *"npm error code E409"* ]]; then
    exit "${status}"
  fi

  if (( attempt == max_attempts )); then
    exit "${status}"
  fi

  sleep_seconds=$(( attempt * 15 ))
  echo "npm registry still processing the package. Retrying in ${sleep_seconds}s."
  sleep "${sleep_seconds}"
  attempt=$(( attempt + 1 ))
done

