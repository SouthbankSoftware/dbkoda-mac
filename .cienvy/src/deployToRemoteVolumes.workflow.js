/**
 * @Author: guiguan
 * @Date:   2017-05-16T16:25:18+10:00
 * @Last modified by:   guiguan
 * @Last modified time: 2017-06-21T11:14:39+10:00
 */

export default (app, cwd, { data: { currBuildId }, exec }) => {
  return exec(
    `rsync -azL --partial -e "ssh -p 9022 -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" /volumes/${currBuildId} admin@hoth.southbanksoftware.com:~/uat/volumes/`
  );
};
