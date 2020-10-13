const current_token2 = localStorage.getItem("token");
const gebruiker_id = localStorage.getItem("gebruiker_id");

const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + current_token2);

// Roadmaps

fetch(`http://127.0.0.1:3000/roadmap/docent/${gebruiker_id}`, {
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
        body += "<td>" + i.roadmap_id + "</td>";
        body += "<td>" + i.roadmap_naam + "</td>";
        body += "<td>" + new Date(i.start_datum).toDateString() + "</td>";
        body += "<td>" + new Date(i.eind_datum).toDateString() + "</td>";
        body += `<td>
                    <a class='modal-trigger' href='#modal_update_roadmap' title='Wijzigen' data-toggle='tooltip' style='cursor: pointer;' onclick='return getRoadmapData(this)'><i class='small material-icons' style='color: #ffd600;'>edit</i></a>
                    <a title='Delete' data-toggle='tooltip' style='cursor: pointer;'  onclick='return deleteCheck(this)'><i class='small material-icons' style='color: #c62828;'>delete</i></a>
                    <a class='modal-trigger' href='#modal_roadmap' title='Go' data-toggle='tooltip' style='cursor: pointer;'  onclick='return viewAssignments(this)'><i class='small material-icons' style='color: #4285F4;'>preview</i></a>
                    <a class='modal-trigger' href='#modal_assign_roadmap' title='Assign' data-toggle='tooltip' style='cursor: pointer;' onclick="return fillAssociationSelects();"><i class='small material-icons' style='color: #228B22;'>assignment</i></a>
                </td>`;
        body += "</tr>";
      });

      document.getElementById("roadmapTableBody").innerHTML = body;
    }
  })
  .catch((err) => console.log(err));

function createRoadmap() {
  let form = document.forms["roadmapForm"];
  let fd = new FormData(form);
  let data = {};
  for (let [key, prop] of fd) {
    data[key] = prop;
    data['docent_id'] = gebruiker_id
  }
  VALUE = JSON.stringify(data, null, 2);

  console.log(VALUE);

  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + current_token2);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");

  fetch("http://127.0.0.1:3000/roadmap", {
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

  function deleteRoadmap() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + current_token2);

    fetch("http://127.0.0.1:3000/roadmap/" + id, {
      method: "DELETE",
      headers: myHeaders,
      mode: "cors",
      cache: "default",
    })
      .then((res) => res.json())
      .then((res) => {
        alert("Roadmap succesvol verwijderd!");
        location.reload();
      })
      .catch((err) => console.error(err));

    return false;
  }

  if (confirm("Bent u zeker?")) {
    deleteRoadmap();
  }
}

function getRoadmapData(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("updateNaam").value = selectedRow.cells[1].innerHTML;
  document.getElementById("updateStartDatum").value =
    selectedRow.cells[2].innerHTML;
  document.getElementById("updateEindDatum").value =
    selectedRow.cells[3].innerHTML;
  id = selectedRow.cells[0].innerHTML;
  console.log(id);
}

// Assignments

function viewAssignments(td) {
  selectedRow = td.parentElement.parentElement;
  let roadmap_id = selectedRow.cells[0].innerHTML;
  fetch(`http://127.0.0.1:3000/assignment/roadmap/${roadmap_id}`, {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      console.log("results: ",data.data.length);
      
      // console.log(roadmap_id)
      
      if (data.data.length > 0) {
        var body = "";
        assignments = data.data;
        
        data.data.forEach((i) => {
          body += "<tr>";
          body += "<td>" + i.id + "</td>";
          body += "<td>" + i.assignment_naam + "</td>";
          body += "<td>" + i.omschrijving + "</td>";
          body += "<td>" + new Date(i.start_datum).toDateString() + "</td>";
          body += "<td>" + new Date(i.inlever_datum).toDateString() + "</td>";
          body += "<td>" + i.punten + "</td>";
          body += "<td>" + i.herkansingspunten + "</td>";
          body += `<td>
                    <a class='modal-trigger' href='#modal_update_assignment' title='Wijzigen' data-toggle='tooltip' style='cursor: pointer;' onclick='return getAssignmentData(this)'><i class='small material-icons' style='color: #ffd600;'>edit</i></a>
                    <a title='Delete' data-toggle='tooltip' style='cursor: pointer;'  onclick='return deleteAssignmentCheck(this)'><i class='small material-icons' style='color: #c62828;'>delete</i></a>
                </td>`;
          body += "</tr>";
          
        });
        document.getElementById("assignmentsTableBody").innerHTML = body;
        document.getElementById("AssignmentsHeader").innerHTML = data.data[0].roadmap_naam;
        document.getElementById("AssignmentsHeader").setAttribute('key',data.data[0].roadmap_id);
      
      }
    })
    .catch((err) => console.log(err));
}



function createAssignment() {
  let roadmap_id = document.getElementById("AssignmentsHeader").getAttribute("key")
  let form = document.forms["assignmentForm"];
  let fd = new FormData(form);
  let data = {};
  for (let [key, prop] of fd) {
    data[key] = prop;
    
  }
  data['roadmap_id'] = roadmap_id
  VALUE = JSON.stringify(data, null, 2);

  console.log(VALUE);

  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + current_token2);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");

  fetch("http://127.0.0.1:3000/assignment", {
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




function getVakken() {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + current_token2);

  fetch('http://127.0.0.1:3000/vak', {
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
                  let dropdown = document.getElementById('vak_id');

                  let option = document.createElement('option');
                  option.setAttribute('value', `${i.id}`);
                  option.textContent = i.naam;
                  // console.log(option)
                  dropdown.appendChild(option);
                  // console.log(dropdown)
                  
              })
              refreshSelect(document.getElementById('vak_id'))

          }
      })
      .catch((err) => console.log(err))

  // return false;
}



function fillSelects(){
  getVakken();
}




function deleteAssignmentCheck(td) {
  selectedRow = td.parentElement.parentElement;
  assignment_id = selectedRow.cells[0].innerHTML;

  function deleteAssignment() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + current_token2);

    fetch("http://127.0.0.1:3000/assignment/" + assignment_id, {
      method: "DELETE",
      headers: myHeaders,
      mode: "cors",
      cache: "default",
    })
      .then((res) => res.json())
      .then((res) => {
        alert("Assignment succesvol verwijderd!");
        location.reload();
      })
      .catch((err) => console.error(err));

    return false;
  }

  if (confirm("Bent u zeker?")) {
    deleteAssignment();
  }
}

function getAssignmentData(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("update_assignment_naam").value = selectedRow.cells[1].innerHTML;
  document.getElementById("update_omschrijving").value = selectedRow.cells[2].innerHTML;
  document.getElementById("update_start_datum").value = selectedRow.cells[3].innerHTML;
  document.getElementById("update_inlever_datum").value = selectedRow.cells[4].innerHTML;
  document.getElementById("update_punten").value = selectedRow.cells[5].innerHTML;
  document.getElementById("update_herkansingspunten").value = selectedRow.cells[6].innerHTML;
  id = selectedRow.cells[0].innerHTML;
  // console.log(id);
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


function getRoadmaps() {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + current_token2);

  fetch('http://127.0.0.1:3000/roadmap', {
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
                  let dropdown = document.getElementById('roadmap_id');

                  let option = document.createElement('option');
                  option.setAttribute('value', `${i.id}`);
                  option.textContent = i.roadmap_naam;
                  // console.log(option)
                  dropdown.appendChild(option);
                  // console.log(dropdown)
                  
              })
              refreshSelect(document.getElementById('roadmap_id'))

          }
      })
      .catch((err) => console.log(err))

  // return false;
}

function fillAssociationSelects(){
  getKlassen()
  getRoadmaps()
}






function assignRoadmap() {
  let form = document.forms["assignRoadmapForm"];
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

  fetch("http://127.0.0.1:3000/klas_roadmap_association", {
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