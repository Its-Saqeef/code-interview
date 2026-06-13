import React from 'react';
import ReactDOMServer from 'react-dom/server';

export interface FollowUpEmailProps {
  recipientName: string;
  messageTitle: string;
  messageBody: string;
  ctaLabel: string;
  ctaUrl: string;
  supportUrl?: string;
  productName?: string;
  companyName?: string;
  footerNote?: string;
}

const defaultProps = {
  productName: 'Technical Precision',
  companyName: 'Technical Precision',
  footerNote: 'If you did not request this email, please ignore it.',
};

const containerStyle = {
  margin: '0 auto',
  padding: '32px 16px',
  backgroundColor: '#0F1117',
  color: '#e4e1ed',
  fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
  width: '100%',
};

const cardStyle = {
  backgroundColor: '#1A1D27',
  border: '1px solid #2D3149',
  borderRadius: '16px',
  padding: '24px',
  marginTop: '24px',
};

const buttonStyle = {
  display: 'inline-block',
  backgroundColor: '#6366F1',
  color: '#ffffff',
  textDecoration: 'none',
  padding: '14px 22px',
  borderRadius: '10px',
  fontWeight: 600,
};

const subtleTextStyle = {
  color: '#908fa0',
  lineHeight: '1.7',
};

export const FollowUpEmail = ({
  recipientName,
  messageTitle,
  messageBody,
  ctaLabel,
  ctaUrl,
  supportUrl,
  productName = defaultProps.productName,
  companyName = defaultProps.companyName,
  footerNote = defaultProps.footerNote,
}: FollowUpEmailProps) => (
  <html>
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>{`\n        body { margin: 0; padding: 0; }\n        a { color: #6366f1; }\n        .divider { border-top: 1px solid #2d3149; margin: 24px 0; }\n      `}</style>
    </head>
    <body style={containerStyle}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', paddingBottom: '24px' }}>
          <p style={{ margin: 0, color: '#6366F1', fontSize: '14px', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            Developer-first follow-up
          </p>
          <h1 style={{ margin: '12px 0 0', fontSize: '28px', lineHeight: '36px', fontWeight: 700, color: '#ffffff' }}>
            {messageTitle}
          </h1>
        </div>

        <div style={cardStyle}>
          <p style={{ margin: '0 0 20px', color: '#908fa0', fontSize: '15px' }}>
            Hi {recipientName},
          </p>

          <p style={{ margin: '0 0 16px', fontSize: '16px', lineHeight: '26px', color: '#e4e1ed' }}>
            {messageBody}
          </p>

          <div style={{ textAlign: 'center', marginTop: '28px' }}>
            <a href={ctaUrl} style={buttonStyle} target="_blank" rel="noreferrer noopener">
              {ctaLabel}
            </a>
          </div>
        </div>

        <div style={{ backgroundColor: '#10131a', border: '1px solid #2D3149', borderRadius: '16px', padding: '24px', marginTop: '24px' }}>
          <h2 style={{ margin: '0 0 14px', fontSize: '20px', color: '#ffffff' }}>
            Built with the styling system from /styling
          </h2>
          <p style={{ margin: '0 0 12px', ...subtleTextStyle }}>
            This template reflects the app’s dark theme, high-contrast typography, and indigo accent styling from your design reference.
          </p>
          <p style={{ margin: 0, ...subtleTextStyle }}>
            Use it for follow-ups, actionable notifications, or onboarding messages that should feel polished and developer-focused.
          </p>
        </div>

        <div className="divider" />

        <div style={{ color: '#908fa0', fontSize: '13px', lineHeight: '20px' }}>
          <p style={{ margin: '0 0 8px' }}>{companyName}</p>
          <p style={{ margin: 0 }}>{footerNote}</p>
          {supportUrl ? (
            <p style={{ margin: '12px 0 0' }}>
              <a href={supportUrl} style={{ color: '#6366f1', textDecoration: 'none' }}>
                Support Center
              </a>
            </p>
          ) : null}
        </div>
      </div>
    </body>
  </html>
);

export function renderFollowUpEmail(props: FollowUpEmailProps) {
  return `<!DOCTYPE html>${ReactDOMServer.renderToStaticMarkup(<FollowUpEmail {...props} />)}`;
}
