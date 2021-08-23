#!/bin/sh
echo "Copying api-definitions"
cp -R ~/oai_definitions/json/. src/services/twilio-api/
echo "Running update changelog script"
versionType=$(node scripts/update-api-definitions.js)
echo "Version type: $versionType"
rm -rf OAI_CHANGES.md
echo "Git configurations"
git config --global user.email "lakshmiravali.rimmalapudi@gmail.com"
git config --global user.name "lakshmiravali"
git add .
commitMessage=''
if [ $versionType == 0 ]
then
  commitMessage='BREAKING CHANGE: Updated api definitions'
elif [ $versionType == 1 ]
then
  commitMessage='feat: Updated api definitions'
elif [ $versionType == 2 ]
then
  commitMessage='fix: Updated api definitions'
else
  exit
fi
echo "Commit message:$commitMessage"
git commit -m "$commitMessage"
git push origin test_branch 
