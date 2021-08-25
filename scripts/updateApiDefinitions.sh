#!/bin/sh
echo "Copying api-definitions"
cp -R ~/oai_definitions/json/. src/services/twilio-api/
echo "Running update changelog script"
changeLog=$(node scripts/update-api-definitions.js)
if [ "$changeLog" != '' ]; then
  changeLog="${changeLog//'%'/'%25'}"
  changeLog="${changeLog//$'\n'/'%0A'}"
  changeLog="${changeLog//$'\r'/'%0D'}"
fi
versionType=$(node scripts/get-version-type.js)
echo "Version type: $versionType"
rm -rf OAI_CHANGES.md
echo "Git configurations"
git config --global user.email "lakshmiravali.rimmalapudi@gmail.com"
git config --global user.name "lakshmiravali"
branch=$(git branch --show-current)
echo "Current branch: $branch"
git add -A
if [ -n "$(git status --porcelain)" ]; then
  echo "There are changes to commit.";
  commitMessage=''
  if [ "$versionType" == 0 ] || [ "$versionType" == 1 ]
  then
    commitMessage='feat: Updated api definitions'
  elif [ "$versionType" == 2 ]
  then
    commitMessage='fix: Updated api definitions'
  else
    echo "Invalid versionType: $versionType";
    exit
  fi
  echo "Commit message:$commitMessage"
  git commit -m "$commitMessage"
  git push origin "$branch"
else
  echo "No OpenAPI changes to commit";
fi
