import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faInstagram,
    faFacebook,
    faSpotify,
    faYoutube,
    faLinkedin,
    faDiscord
} from '@fortawesome/free-brands-svg-icons';

import { faLink } from '@fortawesome/free-solid-svg-icons'

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Loader from '@/components/Loader';

// Steam component
const SLSteam = ({ handle, url }: any) => {
    return (
        <div className='w-full h-full p-4 bg-white rounded-2xl flex flex-col border border-[rgba(2,117,167,0.4)] justify-between gap-3 shadow-inset-widget'>
            <Image src={'./SteamLinkIcon.svg'} width={40} height={40} alt='Steam Icon' className="mb-2 w-[40px] h-[40px]" />
            <p className="text-lg font-extrabold tracking-tighter text-[#3E3E3E] flex-grow">{handle}</p>
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold tracking-tighter text-white bg-gradient-to-b from-[#83C727] to-[#446B16] px-1 h-[33px] max-w-[120px] flex flex-row justify-center items-center rounded-md">
                Add Friend
            </a>
        </div>
    );
};

// Instagram component #4F5BD5, #962FBF, #D62976, #E77476, #FEDA75
const SLInstagram = ({ handle, url }: any) => {
    return (
        <div className='w-full h-full p-4 bg-white border border-[rgba(214,41,118,0.5)] rounded-2xl flex flex-col justify-between gap-3 shadow-inset-widget'>
            <FontAwesomeIcon icon={faInstagram} size="2x" className="mb-2 w-[40px] h-[40px]" />
            <p className="text-lg font-extrabold tracking-tighter text-black flex-grow">{handle}</p>
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold tracking-tighter text-white bg-black px-1 h-[33px] max-w-[100px] flex flex-row justify-center items-center rounded-lg">
                Follow
            </a>
        </div>
    );
};

// Twitter component
const SLTwitter = ({ handle, url }: any) => {
    return (
        <div className='w-full h-full p-4 bg-white rounded-2xl flex flex-col gap-3 justify-between border border-[rgba(0,0,0,0.2)] shadow-inset-widget'>
            <Image src={'./TwitterLinkIcon.svg'} width={32} height={29} alt='Twitter Icon' className="mb-2 w-[32px] h-[29px]" />
            <p className="text-lg font-extrabold tracking-tighter text-black flex-grow">{handle}</p>
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold tracking-tighter text-white bg-black px-1 h-[33px] max-w-[100px] flex flex-row justify-center items-center rounded-lg">
                Follow
            </a>
        </div>
    );
};

// Facebook component
const SLFacebook = ({ handle, url, isAdmin }: any) => {
    return (
        <div className='w-full h-full p-4 bg-white rounded-2xl flex flex-col gap-3 justify-between border border-[rgba(8,102,255,0.4)] shadow-inset-widget'>
            <FontAwesomeIcon icon={faFacebook} size="2x" className="mb-2 w-[40px] h-[40px] text-[#0866FF]" />
            
            <p className="text-lg font-extrabold tracking-tighter flex-grow text-[#0866FF]">{handle}</p>
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold tracking-tighter text-white bg-[#0866FF] px-1 h-[33px] max-w-[100px] flex flex-row justify-center items-center rounded-lg">
                Add Friend
            </a>
        </div>
    );
};

// Spotify component
const SLSpotify = ({ handle, url }: any) => {
    return (
        <div className='w-full h-full p-4 bg-white rounded-2xl flex flex-col gap-3 justify-between border border-[rgba(29,185,69,0.4)] shadow-inset-widget'>
            <FontAwesomeIcon icon={faSpotify} size="2x" className="mb-2 w-[40px] h-[40px] text-[#1DB945]" />
            <p className="text-lg font-extrabold tracking-tighter flex-grow text-black">{handle}</p>
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold tracking-tighter text-white bg-[#1DB945] px-1 h-[33px] max-w-[100px] flex flex-row justify-center items-center rounded-full">
                Follow
            </a>
        </div>
    );
};

// Youtube component
const SLYoutube = ({ handle, url }: any) => {
    return (
        <div className='w-full h-full p-4 bg-white rounded-2xl flex flex-col gap-3 justify-between border border-[rgba(255,0,0,0.4)] shadow-inset-widget'>
            <FontAwesomeIcon icon={faYoutube} size="2x" className="mb-2 w-[40px] h-[40px] text-[#FF0000]" />
            <p className="text-lg font-extrabold tracking-tighter flex-grow text-black">{handle}</p>
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold tracking-tighter text-white bg-black px-1 h-[33px] max-w-[100px] flex flex-row justify-center items-center rounded-full">
                Subscribe
            </a>
        </div>
    );
};

// Linkedin component
const SLLinkedin = ({ handle, url }: any) => {
    return (
        <div className='w-full h-full p-4 bg-white rounded-2xl flex flex-col gap-3 justify-between border border-[rgba(0,119,181,0.4)] shadow-inset-widget'>
            <FontAwesomeIcon icon={faLinkedin} size="2x" className="mb-2 w-[40px] h-[40px] text-[#0077B5]" />
            <p className="text-lg font-extrabold tracking-tighter flex-grow text-[#3E3E3E]">{handle}</p>
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold tracking-tighter text-white bg-[#0077B5] px-1 h-[33px] max-w-[100px] flex flex-row justify-center items-center rounded-full">
                Connect
            </a>
        </div>
    );
};

// Github component
const SLGithub = ({ handle, url }: any) => {
    return (
        <div className='w-full h-full flex flex-col justify-between gap-4 relative rounded-2xl p-4 bg-white border border-[rgba(12, 12, 12, 0.19)] shadow-inset-widget'>
            <img src={'/github-button.svg'} className='h-[40px] w-[40px] pointer-events-none select-none rounded-[8px] border-2 border-black' />
            <p className="text-[#454545] tracking-tighter font-extrabold text-lg flex-grow">{handle}</p>
            <a href={url} target='_black' rel='noopener noreferrer' className="flex justify-center items-center border border-[#C9C9C9] bg-[#EAEAEA] font-bold text-lg rounded-md px-1 h-[33px] max-w-[100px] tracking-tighter">Follow</a>
        </div>
    );
};

// Discord component
const SLDiscord = ({ handle, url }: any) => {
    return (
        <div className='w-full h-full flex flex-col justify-between gap-4 relative rounded-2xl p-4 bg-white border border-[rgba(88,101,242,0.4)] shadow-inset-widget'>
            <img src={'/DiscordLinkIcon.svg'} className='h-[40px] w-[40px] pointer-events-none select-none' />
            <p className="text-[#454545] tracking-tighter font-extrabold text-lg flex-grow">{handle}</p>
            <a href={url} target='_black' rel='noopener noreferrer' className="flex justify-center items-center bg-[#454545] font-bold text-lg text-white rounded-md px-1 h-[33px] max-w-[102px] tracking-tighter">Add Friend</a>
        </div>
    );
};

// Default component
const SLDefault = ({ handle, url }: any) => {

    return (
        <div className='w-full h-full p-4 bg-white rounded-2xl flex flex-col gap-3 justify-between border border-[rgba(12,12,12,0.1)] shadow-inset-widget'>
            <FontAwesomeIcon icon={faLink} size="2x" className="w-[40px] h-[40px] text-neutral-500" />
            <p className="text-lg font-extrabold tracking-tighter flex-grow text-black">{handle}</p>
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold tracking-tighter text-white bg-neutral-700 px-1 h-[33px] max-w-[100px] flex flex-row justify-center items-center rounded-full">
                Visit
            </a>
        </div>
    );
};

// Favicon based component
const SLHasFavicon = ({ handle, url, favicon }: any) => {
    const [hasFavicon, setHasFavicon] = useState<boolean | null>(null);

    useEffect(() => {
        const checkFavicon = async () => {
          try {
            // Set up headers to enable CORS
            const headers = new Headers();
            headers.append('Origin', 'http://localhost'); // Adjust the origin as needed
      
            const response = await fetch(`${url}/favicon.ico`, {
              method: 'GET',
              mode: 'cors',
              headers: headers,
            });
      
            setHasFavicon(response.ok);
          } catch (error) {
            console.error('Error checking favicon:', error);
            setHasFavicon(false);
          }
        };
      
        checkFavicon();
      }, [url]);

    if (!hasFavicon) {
        return <SLDefault />
    }

    return (
        <div className='w-full h-full p-4 bg-white rounded-2xl flex flex-col gap-3 justify-between border border-[rgba(12,12,12,0.1)] shadow-inset-widget'>
            <div className='rounded-lg p-[5px] h-[40px] w-[40px] border border-[rgba(12,12,12,0.1)] flex justify-center items-center'>
                <img src={`${url}/favicon.ico`} alt="Favicon" className='h-full w-full pointer-events-none select-none' />
            </div>
            <p className="text-lg font-extrabold tracking-tighter flex-grow text-black">{handle}</p>
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold tracking-tighter text-white bg-black px-1 h-[33px] max-w-[100px] flex flex-row justify-center items-center rounded-lg">
                Visit
            </a>
        </div>
    );
};

// Export all components
export { SLSteam, SLInstagram, SLTwitter, SLFacebook, SLSpotify, SLYoutube, SLLinkedin, SLGithub, SLDiscord, SLDefault, SLHasFavicon };
