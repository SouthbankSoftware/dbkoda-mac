/**
 * @Author: guiguan
 * @Date:   2017-05-12T12:30:55+10:00
 * @Last modified by:   guiguan
 * @Last modified time: 2017-06-21T11:45:08+10:00
 */

export default (app, cwd, { remoteExec }) => {
  l.notice('Building controller...');
  return remoteExec('cd app/build/controller && yarn install --no-progress');
};
