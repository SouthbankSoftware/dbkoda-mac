/**
 * @Author: guiguan
 * @Date:   2017-05-12T12:30:55+10:00
 * @Last modified by:   guiguan
 * @Last modified time: 2017-06-24T00:41:10+10:00
 */

import buildController from './buildController.workflow';
import cleanup from './cleanup.workflow';

export default (app, cwd, helpers) => {
  const { remoteExec } = helpers;
  return buildController(app, cwd, helpers)
    .then(() => {
      l.notice('Running UAT...');
      return remoteExec(
        'cd app && (cd build/controller && (yarn unlink > /dev/null 2>&1; exit 0) && yarn link) && yarn link "@southbanksoftware/dbkoda-controller" && yarn install --no-progress && yarn run eslint && yarn mac:gainKeychainAccess && yarn run pack && NODE_ENV=production CI=true yarn jest'
      );
    })
    .then(() => cleanup(app, cwd, helpers))
    .catch(() => cleanup(app, cwd, helpers).then(() => Promise.reject(1)));
};
