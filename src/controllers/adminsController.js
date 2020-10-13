const current_token2 = localStorage.getItem("token");

const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + current_token2);
// const type_user = "docent"
fetch(`http://127.0.0.1:3000/gebruiker/type/admin`, {
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

      data.data.forEach((i) => {
        body += "<tr>";
        body += "<td>" + i.id + "</td>";
        body += "<td>" + i.naam + "</td>";
        body += "<td>" + i.voornaam + "</td>";
        body += "<td>" + i.email + "</td>";
        body += "<td>" + i.telefoon + "</td>";
        body += "<td>" + i.adres + "</td>";
        body += "<td>" + i.type + "</td>";
        body += `<td>
                    <a class='modal-trigger' href='#modal_update_docent' title='Wijzigen' data-toggle='tooltip' style='cursor: pointer;' onclick='return getData(this)'><i class='small material-icons' style='color: #ffd600;'>edit</i></a>
                    <a title='Verwijderen' data-toggle='tooltip' style='cursor: pointer;' onclick='return deleteCheck(this)'><i class='small material-icons' style='color: #c62828;'>delete</i></a>
                </td>`;
        body += "</tr>";
      });

      document.getElementById("docentTableBody").innerHTML = body;
    }
  })
  .catch((err) => console.log(err));

function createAdmin() {
  let form = document.forms["docentForm"];
  let fd = new FormData(form);
  let data = {};
  for (let [key, prop] of fd) {
    data[key] = prop;
    data['status'] = "new";
  }
  VALUE = JSON.stringify(data, null, 2);

  console.log(VALUE);

  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + current_token2);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");

  fetch("http://127.0.0.1:3000/gebruiker", {
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

  function deleteDocent() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + current_token2);

    fetch("http://127.0.0.1:3000/gebruiker/" + id, {
      method: "DELETE",
      headers: myHeaders,
      mode: "cors",
      cache: "default",
    })
      .then((res) => res.json())
      .then((res) => {
        alert("Docent succesvol verwijderd!");
        location.reload();
      })
      .catch((err) => console.error(err));

    return false;
  }

  if (confirm("Bent u zeker?")) {
    deleteDocent();
  }
}

function getData(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("updateNaam").value = selectedRow.cells[1].innerHTML;
  document.getElementById("updateVoornaam").value =
    selectedRow.cells[2].innerHTML;
  document.getElementById("updateEmail").value = selectedRow.cells[3].innerHTML;
  document.getElementById("updateTelefoon").value =
    selectedRow.cells[4].innerHTML;
  document.getElementById("updateAdres").value = selectedRow.cells[5].innerHTML;
  document.getElementById("updateType").value = selectedRow.cells[6].innerHTML;
  //   console.log(selectedRow);
  // document.getElementById('updateDistrict').selected = selectedRow.cells[2].innerHTML;
  id = selectedRow.cells[0].innerHTML;
  console.log(id);
}

// function updateDocent() {
//   let form = document.forms["updateDocentForm"];
//   let fd = new FormData(form);
//   let data = {};
//   for (let [key, prop] of fd) {
//     data[key] = prop;
//     //   data["gebruiker_type_id"] = 2
//   }
//   VALUE = JSON.stringify(data, null, 2);

//   console.log(VALUE);

//   const myHeaders = new Headers();
//   myHeaders.append("Authorization", "Bearer " + current_token2);
//   myHeaders.append("Content-Type", "application/json");
// //   myHeaders.append("Accept", "application/json");

//   selectedRow = td.parentElement.parentElement;
//   id = selectedRow.cells[0].innerHTML;
//   console.log(id);
//   fetch(`http://127.0.0.1:3000/gebruiker/${id}`, {
//     method: "PUT",
//     headers: myHeaders,
//     mode: "cors",
//     cache: "default",
//     body: VALUE,
//     redirect: 'follow'
//   })
//     .then((res) => res.json())
//     .then((res) => {
//       console.log("Success", res);
//       location.reload();
//     })
//     .catch((err) => {
//       console.error(err);
//     });

// //   return false;
// }
