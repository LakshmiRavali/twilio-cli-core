#!/bin/sh
echo "Copying api-definitions"
# cp -R ~/oai_definitions/json/. src/services/twilio-api/
# echo "Running update changelog script"
read -r -d '' changeLog <<- EOM
    This is line 1.
    This is line 2.
    Line 3.
EOM
echo $changeLog
echo ::set-output name=changeLogStatus::"$changeLog"
# versionType=$(node scripts/get-version-type.js)
# echo "Version type: $versionType"
# rm -rf OAI_CHANGES.md
# echo "Git configurations"
# git config --global user.email "lakshmiravali.rimmalapudi@gmail.com"
# git config --global user.name "lakshmiravali"
# git add .
# commitMessage=''
# if [ $versionType == 0 ] || [ $versionType == 1 ]
# then
#   commitMessage='feat: Updated api definitions'
# elif [ $versionType == 2 ]
# then
#   commitMessage='fix: Updated api definitions'
# else
#   exit
# fi
# echo "Commit message:$commitMessage"
# git commit -m "$commitMessage"
# git push origin test_branch
