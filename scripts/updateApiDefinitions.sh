#!/bin/sh
echo "Copying api-definitions"
cp -R ~/oai_definitions/json/. src/services/twilio-api/
echo "Running update changelog script"
echo "Install python"
sudo apt-get install python
python --version
sudo python ./main.py
versionType=$?
echo "Version type: $versionType"
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
else
  commitMessage='fix: Updated api definitions'
fi
echo "Commit message:$commitMessage"
git commit -m "$commitMessage"
git push origin main
