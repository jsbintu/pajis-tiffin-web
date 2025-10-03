import * as React from 'react';

interface WelcomeEmailProps {
  userName: string;
  loginUrl: string;
}

export const WelcomeEmail: React.FC<Readonly<WelcomeEmailProps>> = ({
  userName,
  loginUrl,
}) => (
  <html>
    <head>
      <style>{`
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #16a34a;
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .content {
          background-color: #f9f9f9;
          padding: 30px;
          border-radius: 0 0 8px 8px;
        }
        .button {
          display: inline-block;
          padding: 12px 30px;
          background-color: #16a34a;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          color: #666;
          font-size: 14px;
        }
      `}</style>
    </head>
    <body>
      <div className="header">
        <h1>Welcome to Pajis Kitchen! 🍛</h1>
      </div>
      <div className="content">
        <p>Hello {userName},</p>
        <p>
          Thank you for joining Pajis Kitchen! We're thrilled to have you as part of our family.
        </p>
        <p>
          Get ready to experience authentic home-style Indian meals delivered fresh to your doorstep every day.
        </p>
        <p>
          <strong>What's next?</strong>
        </p>
        <ul>
          <li>Browse our subscription plans</li>
          <li>Customize your meal preferences</li>
          <li>Set your delivery schedule</li>
          <li>Enjoy delicious, home-cooked meals!</li>
        </ul>
        <div style={{ textAlign: 'center' }}>
          <a href={loginUrl} className="button">
            Get Started
          </a>
        </div>
        <p>
          If you have any questions, feel free to reach out to our support team at{' '}
          <a href="mailto:support@pajiskitchen.com">support@pajiskitchen.com</a>
        </p>
        <p>
          Happy eating!<br />
          The Pajis Kitchen Team
        </p>
      </div>
      <div className="footer">
        <p>
          © {new Date().getFullYear()} Pajis Kitchen. All rights reserved.
        </p>
        <p>
          You're receiving this email because you signed up for Pajis Kitchen.
        </p>
      </div>
    </body>
  </html>
);

export default WelcomeEmail;
