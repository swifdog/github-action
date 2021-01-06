const core = require('@actions/core')
const github = require('@actions/github')

try {
    const username = core.getInput('username')
    const password = core.getInput('password')

    console.log(username, password)
    const swifdog = require('swifdog')(username, password)
    const SimpleDateFormat = require('@riversun/simple-date-format');

    swifdog.projects.create("example-project", (err, response) => {
        if (err) {
            core.setFailed(err)
        } else {
            const projectid = response.id;
            console.log('created project with id: ' + projectid)

            swifdog.projects.packets.create(projectid, 'webapp', 'nginx:latest', (err, response) => {
                if (err) {
                    core.setFailed(err)
                } else {
                    const packetid = response.id
                    console.log('create packet with id = ' + packetid)

                    // create cool domain!
                    const date = new Date('2018/07/17 12:08:56');
                    const sdf = new SimpleDateFormat("HH-mm-ss-dd-MM-yyyy");
                    const prefix = sdf.format(date);

                    const hostname = prefix + '.demo.kubexsrv.de';

                    swifdog.projects.packets.ingress.create(projectid, packetid, '80', hostname, (err, response) => {
                        if (err) {
                            core.setFailed(err)
                        } else {
                            const ingressid = response.id
                            console.log('ingress id: ' + ingressid)
                            core.setOutput("hostname", hostname)
                        }
                    });
                }
            });
        }
    });
} catch (error) {
    core.setFailed(error.message);
}
