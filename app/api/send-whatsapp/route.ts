import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';
    
    let serviceName, subCategory, notes, name, phone, gender, date, address, prescriptionFileName, prescriptionFile;
    
    if (contentType.includes('multipart/form-data')) {
      // Handle FormData (for Pharmacy with prescription upload)
      const formData = await request.formData();
      serviceName = formData.get('serviceName') as string;
      subCategory = formData.get('subCategory') as string;
      notes = formData.get('notes') as string;
      name = formData.get('name') as string;
      phone = formData.get('phone') as string;
      gender = formData.get('gender') as string;
      date = formData.get('date') as string;
      address = formData.get('address') as string;
      prescriptionFile = formData.get('prescription') as File;
      prescriptionFileName = prescriptionFile ? prescriptionFile.name : null;
    } else {
      // Handle JSON (for regular bookings)
      const body = await request.json();
      serviceName = body.serviceName;
      subCategory = body.subCategory;
      notes = body.notes;
      name = body.name;
      phone = body.phone;
      gender = body.gender;
      date = body.date;
      address = body.address;
    }

    // Validate required fields
    if (!name || !phone || !gender || !date || !address) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate date is in the future
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      return NextResponse.json(
        { error: 'Preferred date must be a future date' },
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
    
    // Convert prescription file to base64 if present
    let prescriptionAttachment = null;
    if (prescriptionFile) {
      const bytes = await prescriptionFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      prescriptionAttachment = {
        filename: prescriptionFileName || 'prescription.pdf',
        content: buffer.toString('base64'),
      };
    }
    
    try {
      const staffEmails = process.env.STAFF_EMAIL;
      if (!staffEmails) {
        console.error('STAFF_EMAIL not configured');
        emailError = 'STAFF_EMAIL not configured';
      } else {
        // Parse comma-separated email addresses
        const emailList = staffEmails.split(',').map(email => email.trim()).filter(email => email);
        
        for (const email of emailList) {
          const emailData: any = {
            from: 'vcare Bookings <onboarding@resend.dev>',
            to: email,
            subject: `New Booking: ${serviceName || 'Service Booking'} - ${name}`,
            html: `
              <h2>New booking received for Swasthghar</h2>
              <p><strong>Service:</strong> ${serviceName || 'Service Booking'}</p>
              ${subCategory ? `<p><strong>Service Type:</strong> ${subCategory}</p>` : ''}
              ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
              ${prescriptionFileName ? `<p><strong>Prescription File:</strong> ${prescriptionFileName}</p>` : ''}
              <p><strong>Patient Name:</strong> ${name}</p>
              <p><strong>Phone Number:</strong> ${phone}</p>
              <p><strong>Gender:</strong> ${gender}</p>
              <p><strong>Preferred Date:</strong> ${date}</p>
              <p><strong>Address:</strong> ${address}</p>
              <br>
              <p>Thank you</p>
            `,
          };
          
          // Add attachment if prescription file exists
          if (prescriptionAttachment) {
            emailData.attachments = [prescriptionAttachment];
          }
          
          const { data: emailDataResponse, error: singleEmailError } = await resend.emails.send(emailData);

          if (singleEmailError) {
            console.error(`Resend error for ${email}:`, singleEmailError);
            emailError = singleEmailError;
          } else {
            console.log(`Email sent successfully to ${email}:`, emailDataResponse);
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
