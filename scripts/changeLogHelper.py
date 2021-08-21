import re
from typing import List


class ChangeLogHelper:
    def __init__(self,
                 version_regex: str,
                 date_regex: str,
                 cli_core_changelog_filename: str = 'CHANGES.md',
                 oai_changelog_filename: str = 'OAI-CHANGES.md'):
        self.version_regex = re.compile(version_regex)
        self.date_regex = re.compile(date_regex)
        self.cli_core_changelog_filename = cli_core_changelog_filename
        self.oai_changelog_filename = oai_changelog_filename

    def get_first_two_versions(self) -> List[str]:  # oai_changes.md
        versions = []
        for line in self.get_changelog_lines(self.oai_changelog_filename):
            found = self.version_regex.search(line)
            if found:
                versions.append(found.group())
                if len(versions) == 2:
                    break
        if len(versions) == 0:
            print('There are no versions detected in the given changelog file:' + self.oai_changelog_filename)
        else:
            print("Versions:")
            print(*versions)
        return versions

    def get_latest_changelog_generated_date(self) -> str:
        latest_date = None

        for line in self.get_changelog_lines(self.cli_core_changelog_filename):
            found = self.date_regex.search(line)
            if found:
                latest_date = found.group()
                break

        if latest_date:
            print(f'Detected latest date: {latest_date}')
        else:
            print('Did not detect any dates')

        return latest_date

    def get_changes_after_given_date(self, date: str) -> str:
        read_lines = False
        file_data = ''
        for line in self.get_changelog_lines(self.oai_changelog_filename):
            found = self.date_regex.search(line)
            if found:
                current_date = found.group()
                if current_date > date:
                    read_lines = True
                else:
                    break
            elif read_lines:
                file_data += line
        return file_data

    def append_changes_to_changelog(self):
        latest_date = self.get_latest_changelog_generated_date()  # changes.md
        if latest_date:
            changeLog = self.get_changes_after_given_date(latest_date)  # oai_changes.md
            if changeLog:
                with open(self.cli_core_changelog_filename, 'r+') as f:  # changes.md
                    f.readline()
                    f.readline()
                    pos = f.tell()
                    content = f.read()
                    f.seek(pos, 0)
                    f.write(changeLog.rstrip('\r\n') + '\n' + content)
            else:
                print("No changes to write")
        else:
            print("No latest date found")

    def get_changelog_lines(self, changelog_filename: str) -> List[str]:
        with open(changelog_filename) as changelog:
            return changelog.readlines()
