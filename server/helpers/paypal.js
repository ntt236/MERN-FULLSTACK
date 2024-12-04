

const paypal = require('paypal-rest-sdk');

paypal.configure({
    mode: 'sandbox', // or 'live'
    client_id: 'AQ70TYvIv4BB2Jcwf29r5NgwNe1FVXo-3ZjMNRY4zcnZt4RjiOvFVcNGY7EaQwwEmLAVXwdLWG0inH6i',
    client_secret: 'EFMcsVkl0LjFxW2auGe6_wb5uI89kee2nzE9iF_nZs9wWM1kVpgtLHMmgmUQrmlv6rb82Zs1JHUA1dqq'
});

module.exports = paypal;