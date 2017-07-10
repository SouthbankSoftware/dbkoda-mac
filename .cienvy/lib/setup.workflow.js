'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @Author: guiguan
 * @Date:   2017-05-16T16:43:00+10:00
 * @Last modified by:   guiguan
 * @Last modified time: 2017-06-21T11:35:16+10:00
 */

exports.default = function (app, cwd, helpers) {
  var currBuildId = helpers.data.currBuildId,
      SshClient = helpers.SshClient,
      exec = helpers.exec;

  // setup helpers

  var remoteRoot = '/Users/admin/uat';
  var remoteVolumes = _path2.default.resolve(remoteRoot, 'volumes');
  var remoteExec = function remoteExec(cmd, options) {
    var sshClient = new SshClient(_lodash2.default.assign({
      username: 'admin',
      privateKey: process.env.SSH_PRIVATE_KEY,
      host: '10.0.0.24',
      cwd: _path2.default.resolve(remoteVolumes, currBuildId)
    }, options));

    return sshClient.connect().then(function () {
      return sshClient.shell(cmd);
    }).then(sshClient.close).catch(function (error) {
      sshClient.close();
      return Promise.reject(error);
    });
  };
  helpers.remoteExec = remoteExec;
  helpers.remotePaths = {
    root: remoteRoot,
    volumes: remoteVolumes
  };

  // setup ssh private key
  return exec('mkdir -p ~/.ssh && echo "$SSH_PRIVATE_KEY" > ~/.ssh/id_rsa && chmod 400 ~/.ssh/id_rsa');
};

module.exports = exports['default'];
//# sourceMappingURL=setup.workflow.js.map