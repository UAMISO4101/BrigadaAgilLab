#!/bin/sh
git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis CI"

git remote add origin-ci https://$GITHUB_PUSH_USER:$GITHUB_API_KEY@github.com/UAMISO4101/BrigadaAgilLab.git
git checkout -b develop > /dev/null

git subtree split --prefix django -b release-django > /dev/null

git push -f origin-ci release-django:release-django > /dev/null
