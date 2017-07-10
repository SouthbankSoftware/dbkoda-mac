"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * @Author: guiguan
 * @Date:   2017-05-16T16:25:18+10:00
 * @Last modified by:   guiguan
 * @Last modified time: 2017-06-21T11:14:39+10:00
 */

exports.default = function (app, cwd, _ref) {
  var currBuildId = _ref.data.currBuildId,
      exec = _ref.exec;

  return exec("rsync -azL --partial -e \"ssh -p 9022 -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null\" /volumes/" + currBuildId + " admin@hoth.southbanksoftware.com:~/uat/volumes/");
};

module.exports = exports["default"];
//# sourceMappingURL=deployToRemoteVolumes.workflow.js.map