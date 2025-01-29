import { Modal } from '@/components/shared/Modal';
import { Camera } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';

interface TakePhotoModalProps {
  cameraOpen: boolean;
  handlePhotoConfirmed: (photo: any) => void;
  handlePhotoCancelled: () => void;
}

const videoConstraints = {
  facingMode: 'environment'
};

export const TakePhotoModal: React.FC<TakePhotoModalProps> = ({
  cameraOpen,
  handlePhotoConfirmed,
  handlePhotoCancelled
}) => {
  const webcamRef = useRef(null);
  const capturePhoto = useCallback(() => {
    const webcam = webcamRef?.current as any;
    if (webcam) {
      return webcam.getScreenshot();
    }
  }, [webcamRef]);

  const handleSharePhotoButtonClicked = () => {
    const imgSrc = capturePhoto();
    if (!imgSrc) {
      handlePhotoCancelled();
    } else {
      handlePhotoConfirmed(imgSrc);
    }
  };

  return (
    <Modal
      title="Share Photo"
      colorClass="bg-error-dark"
      buttonActionText="Share Photo"
      iconComponent={<Camera />}
      isOpen={cameraOpen}
      onButtonClicked={handleSharePhotoButtonClicked}
      onCancelClicked={handlePhotoCancelled}
    >
      <Webcam
        audio={false}
        height={180}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={320}
        videoConstraints={videoConstraints}
      />
    </Modal>
  );
};
