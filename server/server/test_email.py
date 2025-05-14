import smtplib

def test_connection():
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.ehlo()
        server.starttls()
        server.login('prajwalbm90@gmail.com', 'ekuu xpbf sgeu xpyr')
        print("SMTP connection successful!")
        server.quit()
    except Exception as e:
        print(f"SMTP connection failed: {e}")

test_connection()