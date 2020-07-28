import * as React from "react";
import Dropzone from 'react-dropzone'

const dragDropMessage = "1. Upload a CSV in this box"
const Correlation = () => {
  const [message, setMessage] = React.useState(dragDropMessage);
  const [csv, setCSV] = React.useState(null);
  const [result, setResult] = React.useState("");
  const [enableDownload, setEnableDownload] = React.useState(false);
  const [enableDownloadImage, setEnableDownloadImage] = React.useState(false);
  const [image, setImage] = React.useState("");

  const captureEvent = () => {
    if (typeof window !== 'undefined' && typeof (window).gtag !== 'undefined') {
      (window).gtag('event', 'CSV uploaded', {
        'event_category': 'engagement',
      });
    }
  }

  const handleSubmit = (acceptedFiles) => {

    var data = new FormData()
    data.append('file', acceptedFiles[0])
    const response = fetch(
      `https://us-central1-shaped-terrain-284522.cloudfunctions.net/correlation2`,
      {
        method: "POST",
        body: data,
      })
      .then((response) => {
        return response.text();
      })
      .then(correlation => {
        setResult(correlation);
        setEnableDownload(true);
      })
      .catch((error) => {
        setEnableDownload(false)
        setMessage(`Error while processing: ${error}`);
      })

    const image = fetch(
      `https://us-central1-shaped-terrain-284522.cloudfunctions.net/correlation-heat-map`,
      {
        method: "POST",
        body: data,
      })
      .then((resp) => {
        return resp.blob()
      })
      .then(blob => {
        const img = URL.createObjectURL(blob);
        setImage(img);
        setEnableDownloadImage(true);
      })
      .catch((error) => {
        setEnableDownloadImage(false)
        setMessage(`Error while processing: ${error}`);
      })
  }

  return (
    <>
      <form style={{ height: "350px", width: "300px", cursor: "pointer", marginLeft: "9px" }} >
        <Dropzone onDrop={acceptedFiles => {
          setCSV(acceptedFiles)
          setMessage("CSV uploaded!")
          captureEvent()
          handleSubmit(acceptedFiles)
        }}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p style={{ border: "1px solid", height: "300px", width: "300px", justifyContent: "center", verticalAlign: "middle", alignItems: "center", display: "flex" }}>{message}
                </p>
              </div>
            </section>
          )}
        </Dropzone>
        <a
          className="pull-right btn btn-primary"
          style={{ width: "300px" }}
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            (result))}`}
          download="data.csv"
        >
          <button disabled={!enableDownload} style={{ lineHeight: "32px", width: "300px", borderRadius: "0 0 5px 5px" }} type="button">2. Download Correlation CSV</button>
        </a>
      </form>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {image &&
          <div style={{ borderTop: "1px solid" }}>
            <a href={image} download="correlation-heat-map.png" >
              <div style={{ margin: "12px" }}>
                3. Download Correlation Matrix Heat Map
                </div>
            </a>
            <img src={image} alt="Correlation matrix" />
          </div>
        }
      </div>
    </>
  );
}

export default Correlation;
