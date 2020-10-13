function redirectIfNotPermitted() {
  const gebruiker_id = localStorage.getItem("gebruiker_id");
  const current_token = localStorage.getItem("token");

  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + current_token);

  fetch(`http://127.0.0.1:3000/gebruiker/${gebruiker_id}`, {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    redirect: "follow",
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.data.type);

      baseURL = window.location.pathname.split('/').filter(item => item)
      type = baseURL[baseURL.length - 2].toLowerCase()

      if (type != data.data.type) {
        // console.log(data.data.type)
        localStorage.removeItem("gebruiker_type")
        localStorage.setItem("gebruiker_type", data.data.type)
        window.location.replace("../../../index.html")
        alert("U Mag deze pagina niet bezoeken!")
      }
    })
    .catch((err) => {
      console.error(err);
    });
  return false;
} 