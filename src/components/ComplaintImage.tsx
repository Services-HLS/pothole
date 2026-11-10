import React from 'react';
import { ImageIcon } from 'lucide-react';

const ComplaintImage = ({ src, alt = 'Complaint image', className }: { src: string; alt?: string; className?: string }) => {
  if (!src || src === '/placeholder.svg') {
    return (
      <div className={`rounded-lg border bg-muted/30 flex items-center justify-center h-32 w-full ${className || ''}`}>
        <div className="text-center text-muted-foreground">
          <ImageIcon className="h-6 w-6 mx-auto mb-1" />
          <p className="text-xs">No image</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`rounded-lg border object-cover w-full h-48 bg-muted/30 ${className || ''}`}
    />
  );
};

export default ComplaintImage;
