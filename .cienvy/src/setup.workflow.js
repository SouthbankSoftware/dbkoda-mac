/**
 * @Author: guiguan
 * @Date:   2017-05-16T16:43:00+10:00
 * @Last modified by:   guiguan
 * @Last modified time: 2017-06-21T11:35:16+10:00
 */

import _ from 'lodash';
import path from 'path';

export default (app, cwd, helpers) => {
  const { data: { currBuildId }, SshClient, exec } = helpers;

  // setup helpers
  const remoteRoot = '/Users/admin/uat';
  const remoteVolumes = path.resolve(remoteRoot, 'volumes');
  const remoteExec = (cmd, options) => {
    const sshClient = new SshClient(
      _.assign(
        {
          username: 'admin',
          privateKey: process.env.SSH_PRIVATE_KEY,
          host: '10.0.0.24',
          cwd: path.resolve(remoteVolumes, currBuildId)
        },
        options
      )
    );

    return sshClient
      .connect()
      .then(() => sshClient.shell(cmd))
      .then(sshClient.close)
      .catch(error => {
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
  return exec(
    'mkdir -p ~/.ssh && echo "$SSH_PRIVATE_KEY" > ~/.ssh/id_rsa && chmod 400 ~/.ssh/id_rsa'
  );
};
