const _ = require('underscore');

class IpUtis {
    static getRandomIp() {
        let min_ip_digit = 1;
        let max_ip_digit = 254;

        let ip = _.random(min_ip_digit, max_ip_digit) + "." + _.random(min_ip_digit, max_ip_digit) + "." + _.random(min_ip_digit, max_ip_digit) + "." + _.random(min_ip_digit, max_ip_digit);
        while (ip.startsWith('127.')) {
            ip = _.random(min_ip_digit, max_ip_digit) + "." + _.random(min_ip_digit, max_ip_digit) + "." + _.random(min_ip_digit, max_ip_digit) + "." + _.random(min_ip_digit, max_ip_digit);  
        }
        return ip;
    }
}

module.exports = IpUtis;