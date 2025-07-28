"use client";
import { v4 as uuidv4 } from "uuid";
import React, { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import PhotoAlbum from "react-photo-album";
import "yet-another-react-lightbox/styles.css";
import { Button } from "./ui/button";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { IconChevronDown } from "@tabler/icons-react";
//@ts-expect-error - no error
const transformUrlsToSlides = (urls) => {
  return urls.map(
    //@ts-expect-error - no error
    (url) =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () =>
          resolve({
            src: url,
            width: img.naturalWidth,
            height: img.naturalHeight,
          });
        img.src = url;
      })
  );
};
//@ts-expect-error - no error
export default function PhotoGallery({ PORTFOLIO, title, ar }) {
  const [slides, setSlides] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [visiblePhotosCount, setVisiblePhotosCount] = useState(40);

  // Use ar.uiimg if provided, otherwise use PORTFOLIO
  const source = ar && ar.uiimg ? ar.uiimg : PORTFOLIO || [];

  useEffect(() => {
    if (source && source.length > 0) {
      Promise.all(transformUrlsToSlides(source)).then((formattedSlides) => {
        //@ts-expect-error - no error
        setSlides(formattedSlides);
      });
    }
  }, [source]);

  // Convert slides to photos array for PhotoAlbum
  const photos = slides.map((photo) => ({
    key: uuidv4(),
    //@ts-expect-error - no error
    src: photo.src,
    //@ts-expect-error - no error
    width: photo.width || 1280,
    //@ts-expect-error - no error
    height: photo.height || 480,
    alt: `${title || "Image"}-${uuidv4()}`,
  }));

  const photosToShow = photos.slice(0, visiblePhotosCount);
  const hasMorePhotos = visiblePhotosCount < photos.length;

  //@ts-expect-error - no error
  const handleImageClick = ({ index }) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  const handleLoadMore = () => {
    setVisiblePhotosCount((prevCount) => prevCount + 50);
  };

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
          photos={photosToShow}
          onClick={handleImageClick}
        />
      </div>

      {hasMorePhotos && (
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
        slides={photos}
        index={selectedIndex}
        render={{
          slide: ({ slide }) => (
            <img
              src={slide.src}
              alt={slide.alt}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          ),
        }}
      />
    </div>
  );
}
