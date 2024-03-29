module.exports = (router) => {
    router.get('/account_id/:site/:account_id/statuses/:only_media?', require('./account-id'));
    router.get('/acct/:acct/statuses/:only_media?', require('./acct'));
    router.get('/remote/:site/:only_media?', require('./timeline-remote'));
    router.get('/timeline/:site/:only_media?', require('./timeline-local'));
};
