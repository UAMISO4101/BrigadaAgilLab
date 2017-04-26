#!/bin/sh
git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis CI"

git remote add origin-ci https://$GITHUB_PUSH_USER:$GITHUB_API_KEY@github.com/UAMISO4101/BrigadaAgilLab.git
git checkout -b develop
git subtree push --prefix ng origin-ci release-ng > /dev/null
git subtree push --prefix django origin-ci release-django > /dev/null
