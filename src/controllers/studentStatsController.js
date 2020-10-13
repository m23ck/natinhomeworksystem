const current_token3 = localStorage.getItem("token");

// const myHeaders = new Headers();
myHeaders.set("Authorization", "Bearer " + current_token3);
// const type_user = "docent"
fetch(`http://127.0.0.1:3000/assignment/stats/${JSON.parse(localStorage.getItem("nhs_user")).gebruiker_id}`, {
  method: "GET",
  headers: myHeaders,
  mode: "cors",
  cache: "default",
})
  .then((res) => res.json())
  .then((result) => {
    console.log(result);
    // let { stats } = result.data
    if (result.data.length >= 0) {
      document.getElementById("open_assignments").innerHTML = result.data[0].stats
      document.getElementById("finished_assignments").innerHTML = result.data[1].stats
      document.getElementById("pending_assignments").innerHTML = result.data[2].stats
    }
  })
  .catch((err) => console.log(err));
