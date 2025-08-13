import { NextResponse } from 'next/server';

export async function GET() {
    const PRIMARY_API_URL = 'https://fwbplus.id/api/public/microsite';
    const FALLBACK_API_URL = 'https://preview-fwb-plus.vercel.app/api/public/microsite';
    
    const fetchOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'FWB-Plus-Microsite/1.0',
        },
        cache: 'no-store'
    };

    let lastError;

    try {
        console.log('Trying primary API:', PRIMARY_API_URL);
        
        const response = await fetch(PRIMARY_API_URL, fetchOptions);

        if (!response.ok) {
            throw new Error(`Primary API failed with status: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Primary API success');

        let micrositeData;
        if (data.microsite) {
            micrositeData = data.microsite;
        } else {
            micrositeData = data;
        }

        if (micrositeData.hasOwnProperty('isPublished') && micrositeData.isPublished === false) {
            return NextResponse.json({
                success: false,
                error: 'Microsite is not published',
                source: 'primary',
                microsite: {
                    links: [],
                    socialMedia: {}
                }
            });
        }

        return NextResponse.json({
            success: true,
            source: 'primary',
            microsite: micrositeData
        });

    } catch (primaryError) {
        console.error('Primary API failed:', primaryError.message);
        lastError = primaryError;
    }

    try {
        console.log('Trying fallback API:', FALLBACK_API_URL);
        
        const response = await fetch(FALLBACK_API_URL, fetchOptions);

        if (!response.ok) {
            throw new Error(`Fallback API failed with status: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Fallback API success');

        let micrositeData;
        if (data.microsite) {
            micrositeData = data.microsite;
        } else {
            micrositeData = data;
        }

        if (micrositeData.hasOwnProperty('isPublished') && micrositeData.isPublished === false) {
            return NextResponse.json({
                success: false,
                error: 'Microsite is not published',
                source: 'fallback',
                microsite: {
                    links: [],
                    socialMedia: {}
                }
            });
        }

        return NextResponse.json({
            success: true,
            source: 'fallback',
            microsite: micrositeData
        });

    } catch (fallbackError) {
        console.error('Fallback API also failed:', fallbackError.message);

        return NextResponse.json(
            {
                success: false,
                error: 'Both primary and fallback APIs failed',
                details: {
                    primary: lastError.message,
                    fallback: fallbackError.message
                },
                microsite: {
                    links: [],
                    socialMedia: {}
                }
            },
            { status: 500 }
        );
    }
}