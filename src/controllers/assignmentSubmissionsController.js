const current_token2 = localStorage.getItem("token");
const student_id = JSON.parse(localStorage.getItem("nhs_user")).gebruiker_id;

const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + current_token2);

function getKlassen() {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + current_token2);

  fetch("http://127.0.0.1:3000/klas", {
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
        data.data.forEach((i) => {
          let dropdown = document.getElementById("jaar_klas_id");

          let option = document.createElement("option");
          option.setAttribute("value", `${i.jaar_klas_id}`);
          option.textContent = i.klas_naam;
          // console.log(option)
          dropdown.appendChild(option);
          // console.log(dropdown)
        });
        refreshSelect(document.getElementById("jaar_klas_id"));
      }
    })
    .catch((err) => console.log(err));

  // return false;
}

function getRoadmaps() {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + current_token2);

  fetch("http://127.0.0.1:3000/roadmap", {
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
        data.data.forEach((i) => {
          let dropdown = document.getElementById("roadmap_id");

          let option = document.createElement("option");
          option.setAttribute("value", `${i.id}`);
          option.textContent = i.roadmap_naam;
          // console.log(option)
          dropdown.appendChild(option);
          // console.log(dropdown)
        });
        refreshSelect(document.getElementById("roadmap_id"));
      }
    })
    .catch((err) => console.log(err));

  // return false;
}

function changeSubmission(assignment_submission_id, status){
  let VALUE = JSON.stringify({status: status, assignment_submission_id: assignment_submission_id})
  console.log(VALUE)
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + current_token2);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");

  fetch(`http://127.0.0.1:3000/assignment_submission/${assignment_submission_id}`, {
    method: "PUT",
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

function approveSubmission(td){
  selectedRow = td.parentElement.parentElement;
  let assignment_submission_id = selectedRow.cells[0].innerHTML;

  let status = "approved"
  if (confirm("Are You Sure?")) {
    changeSubmission(assignment_submission_id, status);
  }
  

}

function rejectSubmission(td){
  selectedRow = td.parentElement.parentElement;
  let assignment_submission_id = selectedRow.cells[0].innerHTML;
  
  let status = "rejected"
  if (confirm("Are You Sure?")) {
    changeSubmission(assignment_submission_id, status);
  }
  
}

function fillSelects() {
  getKlassen();
  getRoadmaps();
}

function requestSubmissions() {
  
  let form = document.forms["requestSubmissionsForm"];
  let fd = new FormData(form);
  let data = {};
  for (let [key, prop] of fd) { 
    data[key] = prop;
  }
  VALUE = JSON.stringify(data, null, 2);

  // console.log(VALUE);

  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + current_token2);

  fetch(`http://127.0.0.1:3000/assignment_submission/specific/?jaar_klas_id=${JSON.parse(VALUE).jaar_klas_id}&roadmap_id=${JSON.parse(VALUE).roadmap_id}&status=${JSON.parse(VALUE).status}`, {
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
          body += "<td>" + i.naam +" "+ i.voornaam + "</td>";
          body += "<td>" + i.assignment_naam + "</td>";
          body += `<td>
                      <a title='Approve' data-toggle='tooltip' style='cursor: pointer;' onclick='return approveSubmission(this)'><i class='small material-icons' style='color: #45E042;' >check</i></a>
                      <a title='Reject' data-toggle='tooltip' style='cursor: pointer;' onclick='return rejectSubmission(this)'><i class='small material-icons' style='color: #c62828;'>clear</i></a>
                  </td>`;
          body += "</tr>";
        });
  
        document.getElementById("assignmentSubmissionsTableBody").innerHTML = body;
      }
    })
    .catch((err) => console.log(err));

  return false;
}