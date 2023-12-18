import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSteam,
    faInstagram,
    faTwitter,
    faFacebook,
    faSpotify,
    faYoutube,
} from '@fortawesome/free-brands-svg-icons';

import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

import Image from 'next/image';

// Steam component
const SLSteam = ({ handle, url }: any) => {
    return (
        <div className='h-full w-full bg-gradient-to-b from-[#13181F] to-[#007CB1] rounded-2xl p-1'>
            <div className='w-full h-full p-3 bg-white rounded-xl flex flex-col gap-3'>
                <Image src={'./SteamLinkIcon.svg'} width={40} height={40} alt='Steam Icon' className="mb-2 w-[40px] h-[40px]" />
                <p className="text-lg font-extrabold tracking-tighter text-[#3E3E3E]">{handle}</p>
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold tracking-tighter text-white bg-gradient-to-b from-[#83C727] to-[#446B16] px-1 h-[33px] max-w-[120px] flex flex-row justify-center items-center rounded-md">
                    Add Friend
                </a>
            </div>
        </div>
    );
};

// Instagram component #4F5BD5, #962FBF, #D62976, #E77476, #FEDA75
const SLInstagram = ({ handle, url }: any) => {
    return (
        <div className='h-full w-full bg-gradient-to-b from-[#4F5BD5] via-[#D62976] to-[#FEDA75] rounded-2xl p-1'>
            <div className='w-full h-full p-3 bg-white rounded-xl flex flex-col gap-3'>
                <FontAwesomeIcon icon={faInstagram} size="2x" className="mb-2 w-[40px] h-[40px]" />
                <p className="text-lg font-extrabold tracking-tighter text-black">{handle}</p>
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold tracking-tighter text-white bg-black px-1 h-[33px] max-w-[100px] flex flex-row justify-center items-center rounded-lg">
                    Follow
                </a>
            </div>
        </div>
    );
};

// Twitter component
const SLTwitter = ({ handle, url }: any) => {
    return (
        <div className='h-full w-full bg-black rounded-2xl p-1'>
            <div className='w-full h-full p-4 bg-white rounded-xl flex flex-col gap-3'>
                <Image src={'./TwitterLinkIcon.svg'} width={32} height={29} alt='Steam Icon' className="mb-2 w-[32px] h-[29px]" />
                <p className="text-lg font-extrabold tracking-tighter text-black">{handle}</p>
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold tracking-tighter text-white bg-black px-1 h-[33px] max-w-[100px] flex flex-row justify-center items-center rounded-lg">
                    Follow
                </a>
            </div>
        </div>
    );
};

// Facebook component
const SLFacebook = ({ handle, url }: any) => {
    return (
        <div className='p-4 h-full w-full border border-[rgba(12, 12, 12, 0.19)] rounded-2xl'>
            <FontAwesomeIcon icon={faFacebook} size="2x" className="mb-2 w-[40px] h-[40px]" />
            <p className="text-lg font-semibold">{handle}</p>
            <a href={url} target="_blank" rel="noopener noreferrer" className="underline">
                Follow
            </a>
        </div>
    );
};

// Spotify component
const SLSpotify = ({ handle, url }: any) => {
    return (
        <div className='p-4 h-full w-full border border-[rgba(12, 12, 12, 0.19)] rounded-2xl'>
            <FontAwesomeIcon icon={faSpotify} size="2x" className="mb-2 w-[40px] h-[40px]" />
            <p className="text-lg font-semibold">{handle}</p>
            <a href={url} target="_blank" rel="noopener noreferrer" className="underline">
                Follow
            </a>
        </div>
    );
};

// Youtube component
const SLYoutube = ({ handle, url }: any) => {
    return (
        <div className='p-1 h-full w-full border-2 border-[#FF0000] rounded-2xl'>
            <div className='w-full h-full p-3 bg-white rounded-xl flex flex-col gap-3'>
                <FontAwesomeIcon icon={faYoutube} size="2x" className="mb-2 w-[40px] h-[40px] text-[#FF0000]" />
                <p className="text-lg font-extrabold tracking-tighter text-black">{handle}</p>
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold tracking-tighter text-white bg-black px-1 h-[33px] max-w-[100px] flex flex-row justify-center items-center rounded-full">
                    Follow
                </a>
            </div>
        </div>
    );
};

// Default component
const SLDefault = ({ handle, url }: any) => {
    return (
        <div className='p-4 h-full w-full border border-[rgba(12, 12, 12, 0.19)] rounded-2xl'>
            <FontAwesomeIcon icon={faCircleUser} size="2x" className="mb-2 w-[40px] h-[40px]" />
            <p className="text-lg font-semibold">{handle}</p>
            <a href={url} target="_blank" rel="noopener noreferrer" className="underline">
                Follow
            </a>
        </div>
    );
};

// Export all components
export { SLSteam, SLInstagram, SLTwitter, SLFacebook, SLSpotify, SLYoutube, SLDefault };
