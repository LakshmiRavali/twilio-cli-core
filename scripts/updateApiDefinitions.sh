#!/bin/sh
echo "Copying api-definitions"
# cp -R ~/oai_definitions/json/. src/services/twilio-api/
# echo "Running update changelog script"
read -r -d '' changeLog << EOM
**Api**
- Corrected the `price`, `call_sid_to_coach`, and `uri` data types for Conference, Participant, and Recording **(breaking change)**
- Made documentation for property `time_limit` in the call api public. **(breaking change)**
- Added `domain_sid` in sip_credential_list_mapping and sip_ip_access_control_list_mapping APIs **(breaking change)**

**Insights**
- Added new endpoint to fetch Call Summaries

**Messaging**
- Add brand_type field to a2p brand_registration api
- Revert brand registration api update to add brand_type field
- Add brand_type field to a2p brand_registration api

**Taskrouter**
- Add `X-Rate-Limit-Limit`, `X-Rate-Limit-Remaining`, and `X-Rate-Limit-Config` as Response Headers to all TaskRouter endpoints

**Verify**
- Add `TemplateSid` optional parameter on Verification creation.
- Include `whatsapp` as a channel type in the verifications API.
EOM
echo $changeLog
echo "::set-output name=changeLogStatus::$changeLog"
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
