// ==UserScript==
// @name     Disable RPAN
// @version  0.2 Experimental
// @include  https://www.reddit.com/*
// include   http://www.reddit.com/*
// @grant    none
// @require  https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js 
// ==/UserScript==

// WARNING! This only works on the desktop browser version of the NEW reddit site. NOT the old one.

// Easy peasy sleep() hack for the RPAN container removal.
// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
// Removes static RPAN stuff.
$(document).ready(function() {
    // Remove the top banner (the one saying "TUNE IN TO THE RPAN NETWORK!")
    $('a[href="http://www.reddit.com/rpan"').parent().remove();

    // Remove the RPAN button from the navigation bar.
    $('a[href="/rpan/"').remove();

    // Remove the RPAN button from the menu. This one is tricky since it pops up
    // each time the menu is clicked.
    $($('div[role="navigation"').find('button')[0]).click(function() {
        $('button[aria-label="Reddit Public Access Network"]').remove();
    });
});

// Removes each RPAN container by finding a nested <a> element containing the link to /rpan.
// This one is called inside a separate function that loops over 2 seconds,
// since they might load as you scroll down.
$(document).ready(async function() {
    // always do this function on the site, don't worry about lagging out
    // since the await sleep function halts execution for each 2 seconds.
    while(true) {
        let aElement = $('a[href="/rpan"'); // find the link element
        if(aElement.length > 0) { // found it?
            console.log('Found a RPAN link, removing.');
            // (So much nesting, but that's what you get when each class name is a hashed ID...)
            aElement[0].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove(); // remove it
        }
        await sleep(2000); // set a timeout
    }
});
  