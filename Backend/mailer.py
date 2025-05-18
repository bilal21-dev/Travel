# import os
# import smtplib
# from email.message import EmailMessage
# from dotenv import load_dotenv

# # Load environment variables from .env file
# load_dotenv()

# EMAIL_ADDRESS = os.getenv("EMAIL_USER")
# EMAIL_PASSWORD = os.getenv("EMAIL_PASS")

# def send_otp(recipient_email, otp):
#     try:
#         msg = EmailMessage()
#         msg['Subject'] = 'Your OTP Code'
#         msg['From'] = EMAIL_ADDRESS
#         msg['To'] = recipient_email
#         msg.set_content(f'Your OTP code is: {otp}. It is valid for 5 minutes.')

#         with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
#             smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
#             smtp.send_message(msg)

#         print("OTP sent successfully!")


#     except Exception as e:
#         print(f"Error sending OTP: {e}")


import os
import smtplib
from email.message import EmailMessage
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

EMAIL_ADDRESS = os.getenv("EMAIL_USER")
EMAIL_PASSWORD = os.getenv("EMAIL_PASS")

def send_otp(recipient_email, otp):
    try:
        msg = EmailMessage()
        msg['Subject'] = '🔐 Your One-Time Password (OTP)'
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = recipient_email

        # HTML content
        html_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 30px;">
            <div style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 10px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <h2 style="color: #333;">🔐 Your OTP Code</h2>
                <p style="font-size: 16px; color: #555;">Use the following OTP code to complete your verification:</p>
                <div style="text-align: center; margin: 20px 0;">
                    <span style="font-size: 28px; font-weight: bold; letter-spacing: 4px; color: #2b2b2b;">{otp}</span>
                </div>
                <p style="font-size: 14px; color: #777;">This code is valid for <strong>5 minutes</strong>. Do not share it with anyone.</p>
                <hr style="margin: 20px 0;">
                <p style="font-size: 12px; color: #aaa;">If you didn’t request this, you can ignore this email.</p>
                <p style="font-size: 12px; color: #aaa;">Thank you, <br><strong>Your Travel App Team</strong></p>
            </div>
        </body>
        </html>
        """

        # Set both plain and HTML content
        msg.set_content(f'Your OTP code is: {otp}. It is valid for 5 minutes.')
        msg.add_alternative(html_content, subtype='html')

        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            smtp.send_message(msg)

        print("✅ OTP sent successfully!")

    except Exception as e:
        print(f"❌ Error sending OTP: {e}")
