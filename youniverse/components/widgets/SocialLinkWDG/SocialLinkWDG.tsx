import React from 'react';

import { SLSteam, SLInstagram, SLFacebook, SLSpotify, SLTwitter, SLYoutube, SLDefault } from './Brands';

export default function SocialLinkWDG( ) {

    const url = 'https://www.instagram.com/kevin__dallas/';
    const handle = '@harborfreight';
    const brand_name = 'Twitter';

    // When a new social link is added, we need to parse the url provided and choose a brand_name, then save to the widget array

    // if (!brand_name) {
    //     const domain = new URL(url).hostname;
    //     let newBrandName;
    //     switch (domain) {
    //         case 'steamcommunity.com':
    //             newBrandName = 'Steam';
    //             break;
    //         case 'www.instagram.com':
    //             newBrandName = 'Instagram';
    //             break;
    //         case 'twitter.com':
    //             newBrandName = 'Twitter';
    //             break;
    //         case 'www.facebook.com':
    //             newBrandName = 'Facebook';
    //             break;
    //         case 'open.spotify.com':
    //             newBrandName = 'Spotify';
    //             break;
    //         case 'www.youtube.com':
    //             newBrandName = 'Youtube';
    //             break;
    //         default:
    //             newBrandName = 'Default';
    //             break;
    //     }
    // }

    // Load component based on brand_name

    const componentMappings: any = {
        Steam: SLSteam,
        Spotify: SLSpotify,
        Youtube: SLYoutube,
        Twitter: SLTwitter,
        Facebook: SLFacebook,
        Instagram: SLInstagram,
        Default: SLDefault
    };

    const ComponentType = componentMappings[brand_name];

    const componentProps = { handle, url, brand_name };

    return <ComponentType {...componentProps} />;
};
