import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const BACKEND_API_URL = 'https://fwbplus.id/api/public/microsite' || 'https://preview-fwb-plus.vercel.app/api/public/microsite';

        const response = await fetch(BACKEND_API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        const data = await response.json();

        let micrositeData;

        if (data.microsite) {
            micrositeData = data.microsite;
        } else {
            micrositeData = data;
        }

        if (micrositeData.isPublished === false) {
            return NextResponse.json({
                success: false,
                error: 'Microsite is not published',
                microsite: {
                    links: [],
                    socialMedia: {}
                }
            });
        }

        return NextResponse.json({
            success: true,
            microsite: micrositeData
        });

    } catch (error) {
        console.error('Error fetching microsite data:', error);

        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch microsite data from API',
                details: error.message,
                microsite: {
                    links: [],
                    socialMedia: {}
                }
            },
            { status: 500 }
        );
    }
}