import "./App.css";
import axios from "axios";
import React, { useState } from "react";
import ShowToast from "./showToast";
function App() {
  const [image, setImage] = useState(null);
  const [doc, setDoc] = useState(null);
  const [progressImage, setProgressImage] = useState(0);
  const [progressDoc, setProgressDoc] = useState(0);
  const [loadingStatus1, setLoadingStatus1] = useState(false);
  const [loadingStatus2, setLoadingStatus2] = useState(false);

  const uploadImage = (e) => {
    e.preventDefault();
    if (!image) {
      return ShowToast("Choose an image first", "red", "white");
    }
    setLoadingStatus1(true);
    console.log(image);
    const data = new FormData();
    for (var i = 0; i < image.length; i++) {
      console.log(image[i]);
      data.append("inputfile", image[i]);
    }
    axios
      .post("/upload", data, {
        onUploadProgress: (ProgressEvent) => {
          setProgressImage(parseInt((ProgressEvent.loaded / ProgressEvent.total) * 100));
        },
      })
      .then((res) => {
        console.log(res);
        ShowToast(res.data.message, "green", "white");
        setLoadingStatus1(false);
        setImage(null);
      })
      .catch((err) => {
        ShowToast(err.response.data.error, "red", "white");
        setLoadingStatus1(false);
        setImage(null);
      });
  };
  const uploadDoc = (e) => {
    e.preventDefault();
    if (!doc) {
      return ShowToast("Choose a file first", "red", "white");
    }
    console.log(doc);
    console.log(Object.keys(doc).map((num) => doc[num].name));
    setLoadingStatus2(true);
    const data = new FormData();
    for (var i = 0; i < doc.length; i++) {
      console.log(doc[i]);
      data.append("inputfile", doc[i]);
    }
    axios
      .post("/upload", data, {
        onUploadProgress: (ProgressEvent) => {
          setProgressDoc(parseInt((ProgressEvent.loaded / ProgressEvent.total) * 100));
        },
      })
      .then((res) => {
        ShowToast(res.data.message, "green", "white");
        setLoadingStatus2(false);
        setDoc(null);
      })
      .catch((err) => {
        ShowToast(err.response.data.error, "red", "white");
        setLoadingStatus2(false);
        setDoc(null);
      });
  };

  return (
    <div className="App">
      <div className="uploadBox">
        <h1>Image Uploading</h1>
        <form onSubmit={(e) => uploadImage(e)} encType="multipart/form-data">
          <div className="form">
            <div>
              <label className="chooseFile">
                Choose image
                <input
                  type="file"
                  accept="image/*"
                  multiple={true}
                  name="inputfile"
                  onChange={(e) => setImage(e.target.files)}
                />
              </label>
            </div>
            <div className="fileName">
              <label>
                {image
                  ? Object.keys(image).map((index) => {
                      return (
                        <span key={index}>
                          {image[index].name}
                          <br />
                        </span>
                      );
                    })
                  : image}
              </label>
            </div>
            <br />
            <div className="progressBar" hidden={!loadingStatus1}>
              <div className="progressNo1" style={{ width: progressImage + "%" }}>
                {progressImage}%
              </div>
            </div>
            <input type="submit" disabled={loadingStatus1} />
          </div>
        </form>
      </div>
      <div className="uploadBox">
        <h1>File Uploading</h1>
        <form onSubmit={(e) => uploadDoc(e)} encType="multipart/form-data">
          <div className="form">
            <div>
              <label className="chooseFile">
                Choose File
                <input
                  type="file"
                  accept=".pdf,.txt,.doc,.docx"
                  multiple={true}
                  name="inputfile"
                  onChange={(e) => setDoc(e.target.files)}
                />
              </label>
            </div>
            <div className="fileName">
              <label>
                {doc
                  ? Object.keys(doc).map((index) => {
                      return (
                        <span key={index}>
                          {doc[index].name}
                          <br />
                        </span>
                      );
                    })
                  : doc}
              </label>
            </div>

            <br />
            <div className="progressBar" hidden={!loadingStatus2}>
              <div className="progressNo2" style={{ width: progressDoc + "%" }}>
                {progressDoc}%
              </div>
            </div>
            <input type="submit" disabled={loadingStatus2} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
