const current_token2 = localStorage.getItem("token");
const student_id = JSON.parse(localStorage.getItem("nhs_user")).gebruiker_id
const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + current_token2);
fetch(`http://127.0.0.1:3000/resultaat/student/${student_id}`, {
  method: "GET",
  headers: myHeaders,
  mode: "cors",
  cache: "default",
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    if (data.data.length > 0) {
      var body = "";
      
      data.data.forEach((i) => {
        body += "<tr>";
        body += "<td>" + i.id + "</td>";
        body += "<td>" + i.assignment_naam + "</td>";
        body += "<td>" + i.omschrijving + "</td>";
        body += "<td>" + i.roadmap_naam + "</td>";
        body += "<td>" + i.vak_naam + "</td>";
        body += "<td>" + i.klas_naam + "</td>";
        body += "<td>" + i.punten + "</td>";
        
        body += "</tr>";
      });

      document.getElementById("resultaatTableBody").innerHTML = body;
    }
  })
  .catch((err) => console.log(err));

function deleteCheck(td) {
  selectedRow = td.parentElement.parentElement;
  id = selectedRow.cells[0].innerHTML;

  function deleteVak() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + current_token2);

    fetch("http://127.0.0.1:3000/vak/" + id, {
      method: "DELETE",
      headers: myHeaders,
      mode: "cors",
      cache: "default",
    })
      .then((res) => res.json())
      .then((res) => {
        alert("Vak succesvol verwijderd!");
        location.reload();
      })
      .catch((err) => console.error(err));

    return false;
  }

  if (confirm("Bent u zeker?")) {
    deleteVak();
  }
}
