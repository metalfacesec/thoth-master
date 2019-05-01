const Target = require('./models/Target');
const IpUtils = require('./utils/IpUtils');

class TargetManager {
    constructor() {
        this.ip_queue = [];
        this.using_random_ip = true;
    }

    getTargets(num_targets) {
        let targets = [];
        
        if (this.ip_queue.length == 0) {
            for (var i = 0; i < num_targets; i++) {
                targets.push(new Target(IpUtils.getRandomIp(), true));
            }
            return targets;
        }

        if (this.ip_queue.length >= num_targets) {
            let dirty_targets = this.ip_queue.splice(0, num_targets);
            dirty_targets.forEach(target => {
                targets.push(new Target(target, false));
            });
            return targets;
        }

        let get_randoms = num_targets - this.ip_queue.length;
        for(var i = 0; i < this.ip_queue.length; i++) {
            targets.push(new Target(this.ip_queue.pop(), false));
        }
        for (var i = 0; i <= get_randoms; i++) {
            targets.push(new Target(IpUtils.getRandomIp(), true));
        }
        return targets;
    }

    addTargets(ip) {
        let ip_end = ip.split('.')[3];
        let ip_start = ip.slice(0, ip_end.length * -1);
        for (var i = 1; i <= 50; i++) {
            if (parseInt(ip_end) + i < 255) {
                let ip = ip_start + (parseInt(ip_end) + i);
                this.ip_queue.push(ip);
            }
            if (parseInt(ip_end) - i > 30) {
                let ip = ip_start + (parseInt(ip_end) - i);
                this.ip_queue.push(ip);
            }
        }
    }
}

module.exports = TargetManager;