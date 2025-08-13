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

    const fallbackFetchOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'FWB-Plus-Microsite/1.0',
            'x-vercel-protection-bypass': process.env.VERCEL_BYPASS_TOKEN || 'your-bypass-token-here',
            // 'Authorization': `Basic ${Buffer.from('username:password').toString('base64')}`
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

        let micrositeData = data.microsite || data;

        if (micrositeData.hasOwnProperty('isPublished') && micrositeData.isPublished === false) {
            return NextResponse.json({
                success: false,
                error: 'Microsite is not published',
                source: 'primary',
                microsite: { links: [], socialMedia: {} }
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
        console.log('Trying fallback API with bypass:', FALLBACK_API_URL);
        
        const response = await fetch(FALLBACK_API_URL, fallbackFetchOptions);

        if (!response.ok) {
            throw new Error(`Fallback API failed with status: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Fallback API success');

        let micrositeData = data.microsite || data;

        if (micrositeData.hasOwnProperty('isPublished') && micrositeData.isPublished === false) {
            return NextResponse.json({
                success: false,
                error: 'Microsite is not published',
                source: 'fallback',
                microsite: { links: [], socialMedia: {} }
            });
        }

        return NextResponse.json({
            success: true,
            source: 'fallback',
            microsite: micrositeData
        });

    } catch (fallbackError) {
        console.error('Fallback API also failed:', fallbackError.message);

        console.log('Both APIs failed, using static data');
        
        const staticData = {
            "links": [
                {
                    "id": "static_website",
                    "title": "Website",
                    "url": "https://fwbplus.id",
                    "order": 0
                },
                {
                    "id": "static_whatsapp",
                    "title": "WhatsApp",
                    "url": "https://wa.me/6281944074542",
                    "order": 1
                },
                {
                    "id": "static_email",
                    "title": "Email",
                    "url": "mailto:fwbplus.eo@gmail.com",
                    "order": 2
                },
                {
                    "id": "static_instagram",
                    "title": "Instagram",
                    "url": "https://www.instagram.com/fwbplus.organizer/",
                    "order": 3
                }
            ],
            "socialMedia": {
                "website": "https://fwbplus.id",
                "whatsapp": "6281944074542",
                "instagram": "https://www.instagram.com/fwbplus.organizer/",
                "facebook": "",
                "twitter": ""
            }
        };

        return NextResponse.json({
            success: true,
            source: 'static',
            microsite: staticData,
            warning: 'Using static data - APIs unavailable'
        });
    }
}