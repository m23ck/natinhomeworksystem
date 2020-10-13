const current_token2 = localStorage.getItem("token");
const current_docent = localStorage.getItem("gebruiker_id");

const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + current_token2);
// GET ALL THE STUDENTS
fetch(`http://127.0.0.1:3000/klas`, {
  method: "GET",
  headers: myHeaders,
  mode: "cors",
  cache: "default",
})
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);
    // console.log(data.data.length);

    if (data.data.length > 0) {
      var body = "";
      console.log(data.data)
      data.data.forEach((i) => {
        body += "<tr>";
        body += "<td>" + i.jaar_klas_id + "</td>";
        body += "<td>" + i.klas_naam + "</td>";
        body += "<td>" + i.jaar + "</td>";
        body += "<td>" + i.richting + "</td>";
        body += "<td>" + i.klassendocent_voornaam + " " + i.klassendocent_naam + "</td>";
        body += `<td>
                    <a class='modal-trigger' href='#modal_update_klas' title='Wijzigen' data-toggle='tooltip' style='cursor: pointer;' onclick='return getData(this)'><i class='small material-icons' style='color: #ffd600;'>edit</i></a>
                    <a title='Verwijderen' data-toggle='tooltip' style='cursor: pointer;' onclick='return deleteCheck(this)'><i class='small material-icons' style='color: #c62828;'>delete</i></a>
                </td>`;
        body += "</tr>";
      });

      document.getElementById("klasTableBody").innerHTML = body;
    }
  })
  .catch((err) => console.log(err));

function createKlas() {
  let form = document.forms["klasForm"];
  let fd = new FormData(form);
  let data = {};
  for (let [key, prop] of fd) {
    data[key] = prop;
    // data["klassendocent_id"] = current_docent
    // data["gebruiker_type_id"] = 3
    // data["status"] = "new"
  }
  VALUE = JSON.stringify(data, null, 2);

  console.log(VALUE);

  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + current_token2);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");

  fetch("http://127.0.0.1:3000/klas", {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: VALUE,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log("Success", res);
      location.reload();
    })
    .catch((err) => {
      console.error(err);
    });

  return false;
}

function deleteCheck(td) {
  selectedRow = td.parentElement.parentElement;
  id = selectedRow.cells[0].innerHTML;

  function deleteKlas() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + current_token2);

    fetch("http://127.0.0.1:3000/klas/" + id, {
      method: "DELETE",
      headers: myHeaders,
      mode: "cors",
      cache: "default",
    })
      .then((res) => res.json())
      .then((res) => {
        alert("Klas succesvol verwijderd!");
        location.reload();
      })
      .catch((err) => console.error(err));

    return false;
  }

  if (confirm("Bent u zeker?")) {
    deleteKlas();
  }
}

function getData(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("updateNaam").value = selectedRow.cells[1].innerHTML;
  document.getElementById("updateJaar").value = selectedRow.cells[2].innerHTML;
  document.getElementById("updateRichting").value =
    selectedRow.cells[3].innerHTML;
  document.getElementById("updateKlassendocent").value =
    selectedRow.cells[4].innerHTML;
  //   console.log(selectedRow);
  // document.getElementById('updateDistrict').selected = selectedRow.cells[2].innerHTML;
  id = selectedRow.cells[0].innerHTML;
  console.log(id);
}










function getRichtingen() {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + current_token2);

  fetch('http://127.0.0.1:3000/richting', {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default'
  })
      .then(res => res.json())
      .then(data => {
          // console.log(data);
          // console.log(data.data.length);
          if (data.data.length > 0) {
              data.data.forEach(i => {
                  let dropdown = document.getElementById('richting_id');

                  let option = document.createElement('option');
                  option.setAttribute('value', `${i.id}`);
                  option.textContent = i.naam;
                  // console.log(option)
                  dropdown.appendChild(option);
                  // console.log(dropdown)
                  
              })
              refreshSelect(document.getElementById('richting_id'))

          }
      })
      .catch((err) => console.log(err))

  // return false;
}



function getDocenten() {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + current_token2);

  fetch('http://127.0.0.1:3000/gebruiker/type/docent', {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default'
  })
      .then(res => res.json())
      .then(data => {
          // console.log(data);
          // console.log(data.data.length);
          if (data.data.length > 0) {
              data.data.forEach(i => {
                  let dropdown = document.getElementById('klassendocent_id');

                  let option = document.createElement('option');
                  option.setAttribute('value', `${i.id}`);
                  option.textContent = `${i.naam + " " + i.voornaam}`;
                  // console.log(option)
                  dropdown.appendChild(option);
                  // console.log(dropdown)
                  
              })
              refreshSelect(document.getElementById('klassendocent_id'))

          }
      })
      .catch((err) => console.log(err))

  // return false;
}


function fillSelects(){
  getRichtingen();
  getDocenten();
}





// associations


function getKlassen() {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + current_token2);

  fetch('http://127.0.0.1:3000/klas', {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default'
  })
      .then(res => res.json())
      .then(data => {
          console.log(data);
          // console.log(data.data.length);
          if (data.data.length > 0) {
              data.data.forEach(i => {
                  let dropdown = document.getElementById('jaar_klas_id');

                  let option = document.createElement('option');
                  option.setAttribute('value', `${i.id}`);
                  option.textContent = i.klas_naam;
                  // console.log(option)
                  dropdown.appendChild(option);
                  // console.log(dropdown)
                  
              })
              refreshSelect(document.getElementById('jaar_klas_id'))

          }
      })
      .catch((err) => console.log(err))

  // return false;
}


function getStudents() {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + current_token2);

  fetch('http://127.0.0.1:3000/gebruiker/type/student', {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default'
  })
      .then(res => res.json())
      .then(data => {
          // console.log(data);
          // console.log(data.data.length);
          if (data.data.length > 0) {
              data.data.forEach(i => {
                  let dropdown = document.getElementById('student_id');

                  let option = document.createElement('option');
                  option.setAttribute('value', `${i.id}`);
                  option.textContent = i.full_name;
                  // console.log(option)
                  dropdown.appendChild(option);
                  // console.log(dropdown)
                  
              })
              refreshSelect(document.getElementById('student_id'))

          }
      })
      .catch((err) => console.log(err))

  // return false;
}

function fillStudentClassSelects(){
  getKlassen()
  getStudents()
}






function add_student_to_class() {
  let form = document.forms["add_student_to_classForm"];
  let fd = new FormData(form);
  let data = {};
  for (let [key, prop] of fd) {
    data[key] = prop;
  }
  VALUE = JSON.stringify(data, null, 2);

  console.log(VALUE);

  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + current_token2);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");

  fetch("http://127.0.0.1:3000/student_klas_association", {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: VALUE,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log("Success", res);
      location.reload();
    })
    .catch((err) => {
      console.error(err);
    });

  return false;
}