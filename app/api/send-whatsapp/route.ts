import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { serviceName, name, phone, gender, date, address } = body;

    // Validate required fields
    if (!name || !phone || !gender || !date || !address) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
    const recipientPhone = process.env.WHATSAPP_RECIPIENT_PHONE;

    let whatsappSuccess = false;
    let whatsappError = null;

    // Try to send WhatsApp message
    if (phoneNumberId && accessToken && recipientPhone) {
      try {
        // Format phone number (remove any non-digit characters except +)
        const formattedPhone = phone.replace(/[^\d+]/g, '');

        const response = await fetch(
          `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              messaging_product: 'whatsapp',
              to: recipientPhone,
              type: 'template',
              template: {
                name: 'vcare_booking_notification',
                language: { code: 'en' },
                components: [
                  {
                    type: 'body',
                    parameters: [
                      { type: 'text', text: serviceName || 'Service Booking' },
                      { type: 'text', text: name },
                      { type: 'text', text: formattedPhone },
                      { type: 'text', text: gender },
                      { type: 'text', text: date },
                      { type: 'text', text: address },
                    ],
                  },
                ],
              },
            }),
          }
        );

        if (response.ok) {
          whatsappSuccess = true;
          const data = await response.json();
          console.log('WhatsApp message sent successfully:', data);
        } else {
          const errorData = await response.json();
          whatsappError = errorData;
          console.error('WhatsApp API error:', errorData);
        }
      } catch (whatsappFetchError) {
        whatsappError = whatsappFetchError;
        console.error('WhatsApp fetch error:', whatsappFetchError);
      }
    } else {
      console.warn('WhatsApp credentials not configured, skipping WhatsApp notification');
    }

    // Send email via Resend
    let emailSuccess = false;
    let emailError = null;
    
    try {
      const staffEmails = process.env.STAFF_EMAIL;
      if (!staffEmails) {
        console.error('STAFF_EMAIL not configured');
        emailError = 'STAFF_EMAIL not configured';
      } else {
        // Parse comma-separated email addresses
        const emailList = staffEmails.split(',').map(email => email.trim()).filter(email => email);
        
        for (const email of emailList) {
          const { data: emailData, error: singleEmailError } = await resend.emails.send({
            from: 'vcare Bookings <onboarding@resend.dev>',
            to: email,
            subject: `New Booking: ${serviceName || 'Service Booking'} - ${name}`,
            html: `
              <h2>New booking received for vcare Health</h2>
              <p><strong>Service:</strong> ${serviceName || 'Service Booking'}</p>
              <p><strong>Patient Name:</strong> ${name}</p>
              <p><strong>Phone Number:</strong> ${phone}</p>
              <p><strong>Gender:</strong> ${gender}</p>
              <p><strong>Preferred Date:</strong> ${date}</p>
              <p><strong>Address:</strong> ${address}</p>
              <br>
              <p>Thank you</p>
            `,
          });

          if (singleEmailError) {
            console.error(`Resend error for ${email}:`, singleEmailError);
            emailError = singleEmailError;
          } else {
            console.log(`Email sent successfully to ${email}:`, emailData);
            emailSuccess = true;
          }
        }
      }
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      emailError = emailError;
    }

    // Return success if at least one notification succeeded
    if (whatsappSuccess || emailSuccess) {
      return NextResponse.json({ 
        success: true, 
        whatsappSent: whatsappSuccess,
        emailSent: emailSuccess,
        whatsappError: whatsappError ? String(whatsappError) : null
      });
    }

    // Both failed
    return NextResponse.json(
      { 
        error: 'Failed to send notifications',
        whatsappError: whatsappError ? String(whatsappError) : null,
        emailError: emailError ? String(emailError) : null
      },
      { status: 500 }
    );
  } catch (error) {
    console.error('Error processing booking:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
