const core = require('@actions/core')
const github = require('@actions/github')

try {
    const username = core.getInput('username')
    const password = core.getInput('password')

    const projectid = core.getInput('projectid')
    const packetid = core.getInput('packetid')
    const image = core.getInput('image')

    const swifdog = require('swifdog')(username, password)

    swifdog.projects.packets.updateImage(projectid, packetid, image, (err, response) => {
        if (err) {
            core.setFailed(err)
        } else {
            core.setOutput("result", response)
        }
    });

} catch (error) {
    core.setFailed(error.message);
}
