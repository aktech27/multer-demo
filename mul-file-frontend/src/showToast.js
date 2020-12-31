const ShowToast = (text, bgcolor, fgcolor) => {
  if (document.getElementsByClassName("toastContainer")[0] !== undefined) {
    return; //to avoid showing toast when already one is currently being shown
  }
  const toastContainer = document.createElement("div");
  toastContainer.className = "toastContainer";
  toastContainer.innerHTML = text;
  toastContainer.style.backgroundColor = bgcolor;
  toastContainer.style.color = fgcolor;
  document.getElementsByTagName("body")[0].appendChild(toastContainer);
  let pos = -1 * toastContainer.offsetHeight;
  let id = setInterval(animate, 4);
  function animate() {
    if (pos === 20) {
      clearInterval(id);
      setTimeout(() => {
        let x = setInterval(() => {
          if (pos === -1 * toastContainer.offsetHeight) {
            clearInterval(x);
            toastContainer.remove();
          } else {
            pos--;
            toastContainer.style.top = pos + "px";
          }
        }, 0.2);
      }, 2000);
    } else {
      pos++;
      toastContainer.style.top = pos + "px";
    }
  }
};
export default ShowToast;
