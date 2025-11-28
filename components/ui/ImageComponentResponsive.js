import Image from "next/image";
import { Fragment } from "react";

const ImageComponentResponsive = ({ image, alt, width, height, className, style, elementRef, loading }, props) => {
  if (!image) return null;

  return (
    <Fragment>
      {image && (
        <Image
          loading={loading ? "eager" : "lazy"}
          src={image ? image : ""}
          alt={alt ? alt : ""}
          width={width ? width : 100}
          height={height ? height : 100}
          style={{ display: "block", ...style }}
          className={className ?? ""}
          ref={elementRef ?? null}
          priority={loading ? true : false}
        />
      )}
    </Fragment>
  );
};

export default ImageComponentResponsive;
