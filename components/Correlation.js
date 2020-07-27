import * as React from "react";
import Dropzone from 'react-dropzone'

const dragDropMessage = <div>1. Upload a CSV in this box</div>
const Correlation = () => {
  const [message, setMessage] = React.useState(dragDropMessage);
  const [csv, setCSV] = React.useState(null);
  const [result, setResult] = React.useState("");
  const [enableDownload, setEnableDownload] = React.useState(false);

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
  }

  return (
    <>
      <form style={{ height: "350px", width: "300px", cursor: "pointer", marginLeft: "9px" }} >
        <Dropzone onDrop={acceptedFiles => {
          setCSV(acceptedFiles)
          setMessage("CSV uploaded!")
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
      </form>
      {
        <a
          className="pull-right btn btn-primary"
          style={{ margin: 10 }}
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            (result))}`}
          download="data.csv"
        >
          <button disabled={!enableDownload} style={{ lineHeight: "32px" }} type="button">2. Download Correlation CSV</button>
        </a>
      }
    </>
  );
}

export default Correlation;
