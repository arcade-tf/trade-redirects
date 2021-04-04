// ==UserScript==
// @name         Arcade.tf Trade Redirects
// @author       aethez
// @grant        GM_xmlhttpRequest
// @version      1.0.0
// @connect      arcade.tf
// @license      MIT

// @homepageURL     https://github.com/arcade-tf/trade-redirects
// @supportURL      https://github.com/arcade-tf/trade-redirects/issues
// @downloadURL     https://github.com/arcade-tf/trade-redirects/raw/main/redirect.user.js

// @run-at       document-end
// @include      /^https?:\/\/backpack\.tf\/.*
// ==/UserScript==


(function() {
    let bots = localStorage.getItem('arcade bots');

    if(!bots) {
        bots = [];
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'https://arcade.tf/api/bots',
            responseType: 'json',
            onerror: () => {
                alert('Whoops, failed to get the arcade.tf bots :(');
            },
            onload: (res) => {
                const bots = [];

                res.response.bots.forEach((bot) => bots.push(bot.steamID64));

                localStorage.setItem('arcade bots', JSON.stringify(bots));
            }
        });
    }


    $('.listing').each(function () {
            const listing = $(this);
            const steamID64 = listing.find('.user-link').data("id");
            if (!bots.includes(steamID64)) {
                return;
            }

            const item = listing.find('.listing-item .item');
            const id = listing.attr('id').split('_')[1];
            const intent = item.data('listing_intent');

            const selling = intent === 'sell';
            const buttons = listing.find('.listing-buttons');

            if(selling)
                buttons.append('<a href="https://arcade.tf/t/' + id + '" class="btn btn-bottom btn-xs btn-info" data-tip="top" data-title="Buy this item instantly from the arcade.tf website!" style="border: transparent; border-radius: 0px; width: 24px; height: 24px; background: url(\'https://arcade.tf/favicon.ico\'); background-size: cover;"></a>');
     })
})();
