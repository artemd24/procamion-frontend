// Import any necessary libraries if needed
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method === 'POST') {
    try {
      const body = await req.json();
      const email = body.email;

      // Replace this URL with your Google Apps Script web app URL
      const scriptUrl =
        'https://script.google.com/macros/s/AKfycbygwx7EbtUh3cPNQEMZ4c8xmww-Zk04fKoh9-cMGwsWdtHoW2w5d67NjxBYwYhnuC8w/exec';

      // Send the form data to the Google Sheets script
      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), // Include other fields if needed
      });

      if (response.ok) {
        // Handle success
        return NextResponse.json(
          { message: 'Form submitted successfully' },
          { status: 200 }
        )
      } else {
        // Handle error
        return NextResponse.json(
          { message: 'Form submission failed'  + response.text },
          { status: 500 }
        )
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal Error', error }, { status: 500 })
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 })
  }
}
