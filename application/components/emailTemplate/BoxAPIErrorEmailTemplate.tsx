import React from 'react';

export type EmailData = {
  label: string;
  value: unknown;
};

interface BoxAPIErrorEmailTemplateProps {
  emailData: EmailData[];
  error: string;
}

const defaultEmailData: EmailData[] = [
  {
    label: 'API Client ID',
    value: process.env.BOX_API_CLIENT_ID
  },
  {
    label: 'API Client Secret',
    value: process.env.BOX_API_CLIENT_SECRET
  },
  {
    label: 'API Subject Type',
    value: process.env.BOX_SUBJECT_TYPE
  },
  {
    label: 'API Subject ID',
    value: process.env.BOX_SUBJECT_ID
  },
  {
    label: 'Upload Folder ID',
    value: process.env.BOX_UPLOAD_FOLDER_ID
  }
];

export const BoxAPIErrorEmailTemplate: React.FC<BoxAPIErrorEmailTemplateProps> = ({ emailData, error }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}
    >
      <h1>Box API Error Occurred</h1>

      <span style={{ fontWeight: 'bold' }}>Error: {error}</span>

      <div
        style={{
          flex: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        <h2>Data Available:</h2>

        {[...defaultEmailData, ...emailData].map((data) => {
          return (
            <div
              style={{
                flex: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ fontWeight: 'bold' }}>{data.label}:</div>
              <pre>{JSON.stringify(data.value, null, 2)}</pre>
            </div>
          );
        })}
      </div>
    </div>
  );
};
