import { useRef, ComponentProps, RefCallback } from 'react';
import mediumZoom, { Zoom } from 'medium-zoom';
import styles from './styles.module.css';

export interface ImageZoomProps extends ComponentProps<'img'> {
  caption?: string;
  allowZoom?: boolean;
  figStyle?: object;
}

export default function ImageZoom(props: ImageZoomProps): JSX.Element {
  const { allowZoom, caption, figStyle, ...propsRest } = props;
  const zoomRef = useRef<Zoom | null>(null);

  function getZoom() {
    if (zoomRef.current === null) {
      zoomRef.current = mediumZoom({
        background: 'var(--plugin-image-zoom-background-color)',
      });
    }
    return zoomRef.current;
  }
  
  const imageRef: RefCallback<HTMLImageElement> = (node) => {
    const zoom = getZoom();
    if (node && allowZoom != false) {
      zoom.attach(node);
    } else {
      zoom.detach();
    }

    if (node) {
      if (!node.getAttribute('loading')) node.setAttribute('loading', 'lazy');
      const { naturalWidth, naturalHeight } = node;
      node.setAttribute('width', String(naturalWidth));
      node.setAttribute('height', String(naturalHeight));
    }
  };

  return (
    <figure className={styles.figure} style={figStyle}>
      <img className={styles.image} {...propsRest} ref={imageRef} />
      {caption && (
        <figcaption className={styles.figCaption}>{caption}</figcaption>
      )}
    </figure>
  );
}
