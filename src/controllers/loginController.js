function redirectIfToken() {
    jwToken = localStorage.getItem("token")
    usertype = localStorage.getItem("gebruiker_type")
    if (jwToken != null) {
      if (localStorage.getItem("gebruiker_type") == "admin") {
        window.location.replace("./src/views/Admin/dashboard.html");
      }
      else if (localStorage.getItem("gebruiker_type") == "docent") {
        window.location.replace("./src/views/Docent/dashboard.html");
      }
      else if (localStorage.getItem("gebruiker_type") == "student") {
        window.location.replace("./src/views/Student/dashboard.html");
      }
      else{
        console.log("Kan gebruiker_type niet vinden!")
      }
      alert("Er is al een gebruiker ingelogd!");
    }
  }
  window.onload = function () {
    document.getElementById('loginForm').addEventListener('submit', inloggen);
    redirectIfToken();
  }
  
  
  function inloggen() {
    let form = document.forms["loginForm"];
    let fd = new FormData(form);
    let data = {};
    for (let [key, prop] of fd) {
      data[key] = prop;
    }
    VALUE = JSON.stringify(data, null, 2);
  
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
  
    fetch('http://127.0.0.1:3000/gebruiker/login', {
      method: 'POST',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default',
      body: VALUE
    })
      .then(data => data.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem("nhs_user", JSON.stringify(data))
          localStorage.setItem("token", data.token);
          localStorage.setItem("gebruiker_id", data.gebruiker_id);
          localStorage.setItem("gebruiker_type", data.gebruiker_type);

          if (data.gebruiker_type == "admin") {
            window.location.replace("./src/views/Admin/dashboard.html");
          }
          else if (data.gebruiker_type == "docent") {
            window.location.replace("./src/views/Docent/dashboard.html");
          }
          else if (data.gebruiker_type == "student") {
            window.location.replace("./src/views/Student/dashboard.html");
          }
          else{
            console.log("Kan gebruiker_type niet vinden!")
          }
  
        } else {
  
          alert("Gebruikersnaam of Wachtwoord Onjuist!");
        }
  
      })
      .catch((err) => {
        console.error(err);
      })
    return false;
  }