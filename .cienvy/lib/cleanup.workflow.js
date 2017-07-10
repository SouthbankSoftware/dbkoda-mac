'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * @Author: guiguan
 * @Date:   2017-05-16T17:40:46+10:00
 * @Last modified by:   guiguan
 * @Last modified time: 2017-06-21T10:10:41+10:00
 */

exports.default = function (app, cwd, _ref) {
  var remoteExec = _ref.remoteExec;

  l.notice('Cleaning up...');
  return remoteExec('(set +e; rm -rf app/data; killall dbKoda > /dev/null 2>&1; exit 0)');
};

module.exports = exports['default'];
//# sourceMappingURL=cleanup.workflow.js.map