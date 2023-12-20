import React, { useState } from 'react';

import { SLSteam, SLInstagram, SLFacebook, SLSpotify, SLTwitter, SLYoutube, SLLinkedin, SLDefault, SLGithub, SLDiscord } from './Brands';

export default function SocialLinkWDG({ id, url, handle, brand_name, widgetArray, setWidgetArray, saveFullGrid, isAdmin }: any) {

    const [URLState, setURLState] = useState<any>(url || '')
    const [generatedBrand, setGeneratedBrand] = useState<any>(brand_name || '')

    const saveNewSL = (newBrand: string, newURL: string) => {
        // Find the widget with the given id
        let thisWidgetIndex = widgetArray.findIndex((widget: any) => widget.id === id);

        if (thisWidgetIndex !== -1) {
            // Create a new object to avoid modifying the existing one
            let updatedWidget = { ...widgetArray[thisWidgetIndex] };

            // Check if the 'props' property exists
            if (!updatedWidget.component_data.props) {
                // If it doesn't exist, create it
                updatedWidget.component_data.props = {};
            }

            // Update the 'text' property
            updatedWidget.component_data.props.brand_name = newBrand;
            updatedWidget.component_data.props.url = newURL;

            // Create a new array with the updated widget
            let updatedWidgetArray = [...widgetArray];
            updatedWidgetArray[thisWidgetIndex] = updatedWidget;

            console.log(updatedWidgetArray);

            // Update state with the new array
            setWidgetArray(updatedWidgetArray);
            setTimeout(() => saveFullGrid(), 500);

        } else {
            console.error("Widget with ID not found");
        }
    }

    const handleKeyDown = async (event: any) => {
        // Check if the pressed key is Enter (key code 13)
        if (event.key === 'Enter') {
            if (URLState.length > 0) {
                try {
                    const urlObject = new URL(URLState);
                    const domain = await urlObject.hostname;

                    switch (domain) {
                        case 'steamcommunity.com':
                            setGeneratedBrand('Steam');
                            saveNewSL('Steam', URLState)
                            break;
                        case 'www.instagram.com':
                            setGeneratedBrand('Instagram');
                            saveNewSL('Instagram', URLState)
                            break;
                        case 'twitter.com':
                            setGeneratedBrand('Twitter');
                            saveNewSL('Twitter', URLState)
                            break;
                        case 'www.facebook.com':
                            setGeneratedBrand('Facebook');
                            saveNewSL('Facebook', URLState)
                            break;
                        case 'open.spotify.com':
                            setGeneratedBrand('Spotify');
                            saveNewSL('Spotify', URLState)
                            break;
                        case 'www.youtube.com':
                            setGeneratedBrand('Youtube');
                            saveNewSL('Youtube', URLState)
                            break;
                        default:
                            setGeneratedBrand('Default');
                            saveNewSL('Default', URLState)
                            break;
                    }
                } catch (error) {
                    console.error('Invalid URL:', error);
                    setGeneratedBrand('Invalid URL')
                }
            }
        }
    };


    const handleURLChange = (e: any) => {
        e.preventDefault();
        setURLState(e.currentTarget.value)
    }

    const BrandLoader = () => {

        const componentMappings: any = {
            Steam: SLSteam,
            Spotify: SLSpotify,
            Youtube: SLYoutube,
            Twitter: SLTwitter,
            Facebook: SLFacebook,
            Instagram: SLInstagram,
            Linkedin: SLLinkedin,
            Github: SLGithub,
            Discord: SLDiscord,
            Default: SLDefault
        };

        const ComponentType = componentMappings[generatedBrand];

        const componentProps = { handle, url: URLState };
        return <ComponentType {...componentProps} />;
    }


    if (isAdmin) {
        if (generatedBrand && URLState) {
            return <BrandLoader />;
        }

        if (!generatedBrand) {
            return (
                <div className='w-full h-full p-4 flex flex-col justify-center gap-3'>
                    <p className='font-bold'>MagiLink<sup>™️</sup></p>
                    <input
                        type='text'
                        onChange={handleURLChange}
                        onKeyDown={handleKeyDown}
                        value={URLState}
                        className='bg-white w-full border border-neutral-200 rounded-md px-1 py-1 text-sm'
                        placeholder='Paste your link...'
                    />
                    <pre>{generatedBrand}</pre>
                </div>
            )
        }
    }
    if (!isAdmin) {
        return <BrandLoader />;
    }

};
