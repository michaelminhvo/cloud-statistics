import * as React from "react";
import Dropzone from 'react-dropzone'

const dragDropMessage = "";
const Correlation = () => {
  const [message, setMessage] = React.useState(dragDropMessage);
  const [csv, setCSV] = React.useState(null);
  const [result, setResult] = React.useState(null);

  const handleSubmit = () => {

    var data = new FormData()
    data.append('file', csv[0])
    const response = fetch(
      `http://localhost:8080`,
      {
        method: "POST",
        body: data,
      })
      .then((response) => {
        return response.text();
      })
      .then(correlation => {
        setResult(correlation);
      })
      .catch((error) => {
        debugger;
      })
  }

  return (
    <>
      <form>
        <Dropzone onDrop={acceptedFiles => {
          setMessage("Success, click submit to get your free data analysis")
          setCSV(acceptedFiles)
        }}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p style={{ border: "1px solid", height: "300px", width: "300px" }}>{message}</p>
              </div>
            </section>
          )}
        </Dropzone>
        <button onClick={handleSubmit} type="button">Submit</button>
      </form>
      {result &&
        <a
          className="pull-right btn btn-primary"
          style={{ margin: 10 }}
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            (result))}`}
          download="data.csv"
        >
          Download correlation
      </a>
      }
    </>
  );
}

export default Correlation;
