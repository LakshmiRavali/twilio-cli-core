import sys

from changeLogHelper import ChangeLogHelper


def get_and_update_change_log_type():
    version_regex = r'(\d+)\.(\d+)\.(\d+)'
    date_regex = r'\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])'
    ch = ChangeLogHelper(version_regex, date_regex, '../CHANGES.md', '~/oai_definitions/CHANGES.md')
    ch.append_changes_to_changelog()
    versions = ch.get_first_two_versions()
    if len(versions) == 2:
        version1 = versions[0].split('.')
        version2 = versions[1].split('.')
        for i in range(3):
            if version1[i] != version2[i]:
                return i
        return -1


if __name__ == '__main__':
    versionType = get_and_update_change_log_type()
    sys.exit(versionType)
