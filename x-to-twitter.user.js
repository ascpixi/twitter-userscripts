// ==UserScript==
// @name         X To Twitter
// @namespace    https://github.com/ascpixi/twitter-userscripts
// @supportURL   https://github.com/ascpixi/twitter-userscripts/issues
// @version      rev1
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
        twitterLogo: '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 248 204"><path fill="#ffffff" d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07a50.338 50.338 0 0 0 22.8-.87C27.8 117.2 10.85 96.5 10.85 72.46v-.64a50.18 50.18 0 0 0 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71a143.333 143.333 0 0 0 104.08 52.76 50.532 50.532 0 0 1 14.61-48.25c20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26a50.69 50.69 0 0 1-22.2 27.93c10.01-1.18 19.79-3.86 29-7.95a102.594 102.594 0 0 1-25.2 26.16z"/></svg>'
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

    const observer = new MutationObserver(changes => {
        for (const change of changes) {
            if (change.type != "childList")
                continue;

            replaceLogos(change.target);
            removePremiumAds(change.target);
        }
    });

    observer.observe(document.body, {
        attributes: false,
        subtree: true,
        characterData: false,
        childList: true
    });

    console.log("x-to-twitter running, refer to https://github.com/ascpixi/twitter-userscripts for support");
})();