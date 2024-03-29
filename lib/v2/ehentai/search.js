const EhAPI = require('./ehapi');

module.exports = async (ctx) => {
    const page = ctx.params.page;
    let params = ctx.params.params;
    const routeParams = new URLSearchParams(ctx.params.routeParams);
    const bittorrent = routeParams.get('bittorrent') || false;
    const embed_thumb = routeParams.get('embed_thumb') || false;
    let items;
    if (page) {
        // 如果定义了page，就要覆盖params
        params = params.replace(/&*next=[^&]$/, '').replace(/next=[^&]&/, '');
        items = await EhAPI.getSearchItems(ctx.cache, params, page, bittorrent, embed_thumb);
    } else {
        items = await EhAPI.getSearchItems(ctx.cache, params, undefined, bittorrent, embed_thumb);
    }
    let title = params;
    const match = /f_search=([^&]+)/.exec(title);
    if (match !== null) {
        title = match[1];
    }

    ctx.state.data = EhAPI.from_ex
        ? {
              title: title + ' - ExHentai Search ',
              link: `https://exhentai.org/?${params}`,
              item: items,
          }
        : {
              title: title + ' - E-Hentai Search ',
              link: `https://e-hentai.org/?${params}`,
              item: items,
          };
};
