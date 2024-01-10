// ==UserScript==
// @name         X To Twitter
// @namespace    https://github.com/ascpixi/twitter-userscripts
// @supportURL   https://github.com/ascpixi/twitter-userscripts/issues
// @version      rev2
// @description  Restores old Twitter branding on twitter.com
// @author       ascpixi
// @match        *://twitter.com/*
// @match        *://x.com/*
// @icon         https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg
// @grant        none
// @updateURL    https://raw.githubusercontent.com/ascpixi/twitter-userscripts/main/x-to-twitter.user.js
// @downloadURL  https://raw.githubusercontent.com/ascpixi/twitter-userscripts/main/x-to-twitter.user.js
// ==/UserScript==

(async () => {
    'use strict';

    const resources = {
        xPath: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
        twitterLogo: '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 248 204"><path fill="#ffffff" d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07a50.338 50.338 0 0 0 22.8-.87C27.8 117.2 10.85 96.5 10.85 72.46v-.64a50.18 50.18 0 0 0 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71a143.333 143.333 0 0 0 104.08 52.76 50.532 50.532 0 0 1 14.61-48.25c20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26a50.69 50.69 0 0 1-22.2 27.93c10.01-1.18 19.79-3.86 29-7.95a102.594 102.594 0 0 1-25.2 26.16z"/></svg>',
        twitterFavicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAA5CAYAAACMGIOFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFV0lEQVRo3u3afYxcZRXH8c9Ot9tiUC61RTReNN1QqphKwLcUFQyRxIBEYiGNAYni/UPUoAQDGlGDMb5rE/zH3CimCRRKUoMagfAaKraaoNISXGIxbK61oNBeaKGUhV3/uGfNdHR3Zqdzl5m4v+Qmk5l5ntzvPc85z3nOuSxoQQta0DxrqF9uJM3LIRyHNXgb3oilOIBx7MDDRZaUc5mzyJKpoT4BXIlLcD5ODLhWHcDD2ISbiyx5cpb5jsWZ2F5kyZ6hlh8THF9kydg8wS3GhfgKVnc4bBK/x1dxd5ElUzFXI6x/Nj6BJ3BxkSXPt0J+HJfjk0WWPFQz4FJciatwdBdTPIkvYztOwQdwBkbxHNYXWfKbw3wyzcsluAUfxu8C9NGaABu4At+YYWl2qgM4iGVYFN9NYQOuKrJkAhpNA96EU+PzWuRpXr6lJkN+EFcfIaBYASuaAOEX+FaRJRNpXi5O83JZM+RoDJjW+7Axzct399iKCb6I1/b4wR3CxlghS9O8XIcf4fRmyNdjpGXgO3BDmpfr0rxc1KObOQvvrWF1/DV88TrcjxvxEu5qhhyZYfAocnw9zcvlPfDF87CkBsi34tMRU96MLbi2yJKDjRYnnpphggRfwuY0L89K83K4yxtZgdNq8vNGU+DZgi8UWbK3NfAUEalm0qII05uxIc3Lk8Myc9HxcdWll/BzXFZkyZ5WetiFv3cw0TJ8BrfhO2lenhKbeic6BkfVBHgI38TlrdlQ87LbEw67qlMXi838Ytyd5uUWbMMTRZZMvgLZ4V7cUGTJ/tYf/gNZZMlkmpebcEE88U71OnwM6/A3bEvzciseChcopzdlPBMu8ar5pG8NIL+NrOdTXcw1Evnn6ki2n8FuPJ7m5Xh8HpoluB2pXo6r/VErzctR3BR75CDpMZxRZMnumcKuNC9PSvPyhCJLHsNl2DlgkM/i+dn2FvgI7kzz8oeR/fwAYwME+a+ZIJt98p8RWVfhs9g3SxbUjxovsuRQO8ixMPlrsDhKEYOksXap0PSfxgymXpgthjSa9sl9cRYbRO3Go51YUhSJdg4g5J8jY2sPWWTJOL4dJ5JB0j1NWVVbS4qM53uR8A6C/oH7OjmDNVtzIiCvjdSs33V/VAXMxZKKLDmI70YOuj3Oaf0aVTfPtlRnhJxOeIssuRXn4lL8Oo4z/aQ/4N65nkKadWqalxdFgtDA/jaVg/nWBH7WSW9kNsin8SGc1KdLdSt+OZfiz//yy8fxU1Xvod+0HxsigekeMnQ97uxDyE24o9M/t23dpXm5RlWZfnufAO7AR4ss2dXpgLYlxSJLdkR03dYHgPvwtbkAdgQZoA9ivaoE/0ptIxP4Pn4114Fz6jRHffWdAXymqhN2lKrw3KgRcAo/wZVFljxXK2QTbEPVlTpB1Ya7wuEdsV4D3oTPFVnydDcTdPX0o3i8X9UMWo/lNQFORiT9fLeAXVkyzcsRvEdVBzpHfYXiF2OfvuZIADuGjNdPVuD0sNzZqk5XXdobB4Qfd+OD/wUZ7wpMR6/pJTyCV+MNqr7fWlXneZV6eovN+hOuwe1FlrzciwmHsTKsszosuySsdFxcxzi8J1+n9TZGujbey4mHVRW661XvvlwS28J86kCkaNfhgSJLen52HWrxu5WqrtaFOFl9xeUpVTH7rrDe1jio16KhGQLNCrw/Dsxrw7pH6ouTsSR3huVuw1/aneprg2yCXaRqf6/BuyJJHw1fPTrAh5vmmQqYF1V9ib2q7vUjeBB/xK5eRMw607rhCETL4zo2ovBIROUJ1WsmZRy6n4qk+oXpd+AWtKAFLej/Qv8Gi9aV6MRAuvoAAAAASUVORK5CYII="
    }

    /**
     * @param {HTMLElement} parent 
     */
    const replaceLogos = (parent) => {
        for (const svg of parent.getElementsByTagName("svg")) {
            if (svg.innerHTML > 512)
                continue; // don't bother with scanning such large nodes.

            if (svg.innerHTML.includes(resources.xPath)) {
                svg.innerHTML = resources.twitterLogo;
            }
        }
    }

    /**
     * @param {HTMLElement} parent 
     */
    const removePremiumAds = (parent) => {
        const ads = parent.querySelectorAll("[aria-label='Subscribe to Premium']");
        ads.forEach(x => x.remove());
    }

    const bodyObserver = new MutationObserver(changes => {
        for (const change of changes) {
            if (change.type != "childList")
                continue;

            replaceLogos(change.target);
            removePremiumAds(change.target);
        }
    });

    bodyObserver.observe(document.body, {
        attributes: false,
        subtree: true,
        characterData: false,
        childList: true
    });

    const headObserver = new MutationObserver(changes => {
        for (const change of changes) {
            if (change.type != "childList")
                continue;
            
            document.head.querySelectorAll("link[rel~='icon']").forEach(x => x.href = resources.twitterFavicon);

            const title = document.head.querySelector("title");
            if (title != null) {
                // defer it, since twitter goes all iffy when you modify the title too fast
                setTimeout(() => {
                    title.text = title.text.replace("/ X", "/ Twitter");
                }, 16);
            }
        }
    });

    headObserver.observe(document.head, {
        attributes: false,
        subtree: true,
        characterData: false,
        childList: true
    });

    console.log("x-to-twitter running, refer to https://github.com/ascpixi/twitter-userscripts for support");
})();