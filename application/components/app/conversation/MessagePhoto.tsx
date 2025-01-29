import { Message } from '@/types/supabaseTypes';

interface MessagePhotoProps {
  message: Message;
}

export const MessagePhoto: React.FC<MessagePhotoProps> = ({ message }) => {
  const photos = message.photo as any[];
  const imageURL = photos?.[0]?.src;
  if (!imageURL) return null;
  return (
    <div>
      <img src={imageURL} />
    </div>
  );
};
