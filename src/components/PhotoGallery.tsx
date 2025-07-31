"use client";

import { v4 as uuidv4 } from "uuid";
import React, { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import PhotoAlbum from "react-photo-album";
import { Button } from "./ui/button";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { IconChevronDown } from "@tabler/icons-react";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Share from "yet-another-react-lightbox/plugins/share";
interface Photo {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

interface PhotoGalleryProps {
  photos: Photo[];
  onLoadMore?: () => void;
  hasMore?: boolean;
  initialVisibleCount?: number;
}

const transformUrlsToSlides = (photos: Photo[]): Promise<Photo>[] => {
  return photos.map(
    (photo) =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () =>
          resolve({
            src: photo.src,
            alt: photo.alt,
            width: img.naturalWidth,
            height: img.naturalHeight,
          });
        img.src = photo.src;
      })
  );
};

export default function PhotoGallery({
  photos,
  onLoadMore,
  hasMore = false,
  initialVisibleCount = 40,
}: PhotoGalleryProps) {
  const [slides, setSlides] = useState<Photo[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [visiblePhotosCount, setVisiblePhotosCount] =
    useState(initialVisibleCount);

  useEffect(() => {
    if (photos && photos.length > 0) {
      Promise.all(transformUrlsToSlides(photos)).then((formattedSlides) => {
        setSlides(formattedSlides);
      });
    }
  }, [photos]);

  const photosToShow = slides.slice(0, visiblePhotosCount);

  const handleImageClick = ({ index }: { index: number }) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  const handleLoadMore = () => {
    setVisiblePhotosCount((prevCount) => prevCount + 50);
    if (onLoadMore) {
      onLoadMore();
    }
  };

  const albumPhotos = photosToShow.map((photo) => ({
    key: uuidv4(),
    src: photo.src,
    width: photo.width || 1280,
    height: photo.height || 480,
    alt: photo.alt || `Image-${uuidv4()}`,
  }));

  return (
    <div>
      <div className="">
        <PhotoAlbum
          layout="masonry"
          columns={(containerWidth) => {
            if (containerWidth < 400) return 1;
            if (containerWidth < 768) return 2;
            return 3;
          }}
          photos={albumPhotos}
          onClick={handleImageClick}
        />
      </div>

      {hasMore && (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <Button
            onClick={handleLoadMore}
            variant="ghost"
            size="default"
            className="rounded-full"
          >
            Show More
            <IconChevronDown aria-hidden="true" />
          </Button>
        </div>
      )}

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        plugins={[Zoom, Share]}
        index={selectedIndex}
        zoom={{
          maxZoomPixelRatio: 3, // Limit maximum zoom level
          zoomInMultiplier: 2, // Zoom increment
          doubleTapDelay: 300, // Delay for double-tap zoom
          doubleClickDelay: 300, // Delay for double-click zoom
          doubleClickMaxStops: 2, // Max zoom stops for double-click
        }}
      />
    </div>
  );
}
