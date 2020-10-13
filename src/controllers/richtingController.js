const current_token2 = localStorage.getItem("token");

const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + current_token2);
// const type_user = "docent"
fetch(`http://127.0.0.1:3000/richting`, {
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
        body += "<td>" + i.richting_naam + "</td>";
        body += `<td>
                    <a class='modal-trigger' href='#modal_update_richting' title='Wijzigen' data-toggle='tooltip' style='cursor: pointer;' onclick='return getData(this)'><i class='small material-icons' style='color: #ffd600;'>edit</i></a>
                    <a title='Verwijderen' data-toggle='tooltip' style='cursor: pointer;' onclick='return deleteCheck(this)'><i class='small material-icons' style='color: #c62828;'>delete</i></a>
                </td>`;
        body += "</tr>";
      });

      document.getElementById("richtingTableBody").innerHTML = body;
    }
  })
  .catch((err) => console.log(err));

function createRichting() {
  let form = document.forms["richtingForm"];
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

  fetch("http://127.0.0.1:3000/richting", {
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

  function deleteRichting() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + current_token2);

    fetch("http://127.0.0.1:3000/richting/" + id, {
      method: "DELETE",
      headers: myHeaders,
      mode: "cors",
      cache: "default",
    })
      .then((res) => res.json())
      .then((res) => {
        alert("Richting succesvol verwijderd!");
        location.reload();
      })
      .catch((err) => console.error(err));

    return false;
  }

  if (confirm("Bent u zeker?")) {
    deleteRichting();
  }
}

function getData(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("updateNaam").value = selectedRow.cells[1].innerHTML;
  
  id = selectedRow.cells[0].innerHTML;
  console.log(id);
}

function updateRichting() {
  let form = document.forms["updateRichtingForm"];
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
//   myHeaders.append("Accept", "application/json");

  selectedRow = td.parentElement.parentElement;
  id = selectedRow.cells[0].innerHTML;
  console.log(id);
  fetch(`http://127.0.0.1:3000/richting/${id}`, {
    method: "PUT",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: VALUE,
    redirect: 'follow'
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
