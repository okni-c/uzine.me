import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSquareSteam,
    faInstagram,
    faTwitter,
    faFacebook,
    faSpotify,
    faStackOverflow,
    faYoutube,
} from '@fortawesome/free-brands-svg-icons';

export default function SocialLinkWDG () {
    let link = 'https://steamcommunity.com/kevin__dallas/'
    let username = '@harborfreight'

    // Extract domain from the link
    const domain = new URL(link).hostname;

    // Define icon and styling based on the domain
    let icon, bgColor, textColor;
    switch (domain) {
        case 'steamcommunity.com':
            icon = faSquareSteam;
            bgColor = 'bg-indigo-500';
            textColor = 'text-white';
            break;
        case 'www.instagram.com':
            icon = faInstagram;
            bgColor = 'bg-pink-500';
            textColor = 'text-white';
            break;
        case 'twitter.com':
            icon = faTwitter;
            bgColor = 'bg-[#1DA1F2]';
            textColor = 'text-white';
            break;
        case 'www.facebook.com':
            icon = faFacebook;
            bgColor = 'bg-[#1778F2]';
            textColor = 'text-white';
            break;
        case 'open.spotify.com':
            icon = faSpotify;
            bgColor = 'bg-green-500';
            textColor = 'text-white';
            break;
        case 'stackoverflow.com':
            icon = faStackOverflow;
            bgColor = 'bg-orange-500';
            textColor = 'text-white';
            break;
        case 'www.youtube.com':
            icon = faYoutube;
            bgColor = 'bg-red-500';
            textColor = 'text-white';
            break;
        default:
            // Default to a generic icon and styling for unknown domains
            icon = faSquareSteam; // You can change this to a default icon
            bgColor = 'bg-gray-500';
            textColor = 'text-black';
            break;
    }

    return (
        <div className={`p-4 ${bgColor} ${textColor} h-full w-full border border-[rgba(12, 12, 12, 0.19)] rounded-2xl`}>
            <FontAwesomeIcon icon={icon} size="2x" className="mb-2 w-[40px] h-[40px]" />
            <p className="text-lg font-semibold">{username}</p>
            <a href={link} target="_blank" rel="noopener noreferrer" className="underline">
                Follow
            </a>
        </div>
    );
};
