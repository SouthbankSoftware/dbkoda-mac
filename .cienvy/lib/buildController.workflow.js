'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * @Author: guiguan
 * @Date:   2017-05-12T12:30:55+10:00
 * @Last modified by:   guiguan
 * @Last modified time: 2017-06-21T11:45:08+10:00
 */

exports.default = function (app, cwd, _ref) {
  var remoteExec = _ref.remoteExec;

  l.notice('Building controller...');
  return remoteExec('cd app/build/controller && yarn install --no-progress');
};

module.exports = exports['default'];
//# sourceMappingURL=buildController.workflow.js.map