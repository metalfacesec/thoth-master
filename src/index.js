const io = require('socket.io')();
const DatabaseUtils = require('./utils/DatabaseUtils');
const TargetManager = require('./TargetManager');

let targetManager = new TargetManager();

io.on('connection', client => {
    client.on('get_target', data => {
        client.emit('target_data', targetManager.getTargets(data));
    });

    client.on('live_target_found', data => {
        handleFoundTarget(data);
    });
});

async function handleFoundTarget(data) {
    let previousRecord = await DatabaseUtils.getDeviceByIp(data.ip);
    if (previousRecord != null) {
        data._id = previousRecord._id;
        DatabaseUtils.updateDevice(data);
    } else {
        DatabaseUtils.insertDevice(data);
    }
    
    if (!data.is_random) {
        return;
    }
    targetManager.addTargets(data.ip);
}

io.listen(3000);