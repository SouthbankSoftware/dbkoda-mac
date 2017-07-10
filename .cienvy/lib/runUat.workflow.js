'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _buildController = require('./buildController.workflow');

var _buildController2 = _interopRequireDefault(_buildController);

var _cleanup = require('./cleanup.workflow');

var _cleanup2 = _interopRequireDefault(_cleanup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @Author: guiguan
 * @Date:   2017-05-12T12:30:55+10:00
 * @Last modified by:   guiguan
 * @Last modified time: 2017-06-24T00:41:10+10:00
 */

exports.default = function (app, cwd, helpers) {
  var remoteExec = helpers.remoteExec;

  return (0, _buildController2.default)(app, cwd, helpers).then(function () {
    l.notice('Running UAT...');
    return remoteExec('cd app && (cd build/controller && (yarn unlink > /dev/null 2>&1; exit 0) && yarn link) && yarn link "@southbanksoftware/dbkoda-controller" && yarn install --no-progress && yarn run eslint && yarn mac:gainKeychainAccess && yarn run pack && NODE_ENV=production CI=true yarn jest');
  }).then(function () {
    return (0, _cleanup2.default)(app, cwd, helpers);
  }).catch(function () {
    return (0, _cleanup2.default)(app, cwd, helpers).then(function () {
      return Promise.reject(1);
    });
  });
};

module.exports = exports['default'];
//# sourceMappingURL=runUat.workflow.js.map