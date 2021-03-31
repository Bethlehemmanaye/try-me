import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box"
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden"
};

const img = {
  display: "block",
  width: "auto",
  height: "100%"
};

function Fileuploader({
  name,
  label,
  value,
  onDrop,
  preview,
  callback,
  disabled,
  ...rest
}) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    ...rest,
    disabled,
    accept: "image/*",
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
      onDrop(name, acceptedFiles);
      callback(acceptedFiles);
    }
  });
  let thumbs;
  if (files.length > 0) {
    thumbs = files.map(file => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img src={file.preview} style={img} alt="" />
        </div>
      </div>
    ));
  } else {
    thumbs = (
      <div style={thumb}>
        <div style={thumbInner}>
          <img src={value} style={img} alt="" />
        </div>
      </div>
    );
  }

  useEffect(
    () => () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} alt="" />
        {!disabled && (
          <p>
            Drag and drop {label}
            <hr />
            or click to select
          </p>
        )}
      </div>
      {preview && !disabled && <aside style={thumbsContainer}>{thumbs}</aside>}
    </section>
  );
}

export default Fileuploader;
