import * as React from 'react';

interface PaymentConfirmationEmailProps {
  userName: string;
  amount: number;
  transactionId: string;
  paymentDate: string;
  subscriptionPlan: string;
  nextBillingDate: string;
}

export const PaymentConfirmationEmail: React.FC<Readonly<PaymentConfirmationEmailProps>> = ({
  userName,
  amount,
  transactionId,
  paymentDate,
  subscriptionPlan,
  nextBillingDate,
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
        .details-box {
          background-color: white;
          border: 1px solid #ddd;
          padding: 20px;
          margin: 20px 0;
          border-radius: 6px;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #eee;
        }
        .detail-row:last-child {
          border-bottom: none;
        }
        .detail-label {
          font-weight: 600;
          color: #666;
        }
        .detail-value {
          color: #333;
        }
        .amount {
          font-size: 24px;
          font-weight: bold;
          color: #16a34a;
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
        <h1>Payment Successful! ✅</h1>
      </div>
      <div className="content">
        <p>Hello {userName},</p>
        <p>
          Your payment has been successfully processed. Thank you for your subscription!
        </p>
        
        <div className="details-box">
          <div className="detail-row">
            <span className="detail-label">Amount Paid:</span>
            <span className="amount">₹{amount.toLocaleString()}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Transaction ID:</span>
            <span className="detail-value">{transactionId}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Payment Date:</span>
            <span className="detail-value">{new Date(paymentDate).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Subscription Plan:</span>
            <span className="detail-value">{subscriptionPlan}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Next Billing Date:</span>
            <span className="detail-value">{new Date(nextBillingDate).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>
        </div>

        <p>
          <strong>What happens next?</strong>
        </p>
        <ul>
          <li>Your meals will be delivered according to your schedule</li>
          <li>You can manage your subscription anytime from your dashboard</li>
          <li>You'll receive a reminder before your next billing date</li>
        </ul>

        <p>
          If you have any questions or concerns about this payment, please contact our support team at{' '}
          <a href="mailto:support@pajiskitchen.com">support@pajiskitchen.com</a>
        </p>
        
        <p>
          Thank you for choosing Pajis Kitchen!<br />
          The Pajis Kitchen Team
        </p>
      </div>
      <div className="footer">
        <p>
          © {new Date().getFullYear()} Pajis Kitchen. All rights reserved.
        </p>
        <p>
          This is an automated receipt for your payment.
        </p>
      </div>
    </body>
  </html>
);

export default PaymentConfirmationEmail;
