#!/bin/sh
echo "Copying api-definitions"
# cp -R ~/oai_definitions/json/. src/services/twilio-api/
# echo "Running update changelog script"
# read -r -d '' changeLog <<- EOM
#     This is line 1.
#     This is line 2.
#     Line 3.
# EOM
# echo "changeLog<<EOF" >> $GITHUB_ENV
#           echo "$changeLog" >> $GITHUB_ENV
#           echo "EOF" >> $GITHUB_ENV
# changeLog="${changeLog//'%'/'%25'}"
# changeLog="${changeLog//$'\n'/'%0A'}"
# changeLog="${changeLog//$'\r'/'%0D'}"
# echo "::set-output name=changeLog::$changeLog"
# echo "::set-output name=changeLog eof=EOF::"
# echo "$changeLog"
# echo "EOF"
changeLog=$(cat << EOF
first line
second line
third line
EOF
)
changeLog="${changeLog//'%'/'%25'}"
changeLog="${changeLog//$'\n'/'%0A'}"
changeLog="${changeLog//$'\r'/'%0D'}"
echo "FOO_STEP=$changeLog" >> $GITHUB_ENV
echo "changeLog<<EOF" >> $GITHUB_ENV
echo "$changeLog" >> $GITHUB_ENV
echo "EOF" >> $GITHUB_ENV
# echo "::set-output name=changeLog::$changeLog"
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
