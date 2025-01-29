export type Environments = {
  [key: string]: { endpoint: string; active: boolean };
};

export type WebHooks = {
  [key: string]: {
    [key: string]: {
      event: string;
      timeout?: number;
    }[];
  };
};

export const webhooksObject: { environment: Environments; webhooks: WebHooks } = {
  environment: {
    prod: {
      endpoint: 'https://reunitable.netlify.app/api/supabase',
      active: true
    },
    dev: {
      endpoint: 'https://4907-194-168-90-69.ngrok-free.app/api/supabase',
      active: false
    }
  },
  webhooks: {
    public: {
      Conversation: [
        {
          event: 'INSERT'
        }
      ]
    }
  }
};
