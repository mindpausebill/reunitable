import { Infobox } from '@/components/shared/Infobox';
import { InfoType } from '@/types/Infobox';
import React from 'react';

function notFound() {
  return (
    <Infobox type={InfoType.Error} visible={true}>
      <p>Tag not found</p>
    </Infobox>
  );
}

export default notFound;
