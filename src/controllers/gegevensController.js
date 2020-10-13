
const getUserInfo =
    ({ naam, voornaam, email, telefoon, adres }) => {
        return { naam, voornaam, email, telefoon, adres }
    }

const user_info = getUserInfo(JSON.parse(localStorage.nhs_user))
const form = document.getElementById("gegevensForm")
const inputs = form.querySelectorAll("input")
const current_token2 = localStorage.getItem("token");
const { gebruiker_id } = JSON.parse(localStorage.nhs_user)

const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + current_token2);
myHeaders.append("Content-Type", "application/json ");

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    let gegevens = new FormData(form)
    let gegevensData = {}
    for (var pair of gegevens.entries()) {
        gegevensData[pair[0]] = pair[1];
    }
    const VALUES = JSON.stringify(gegevensData, null, 2)

    await fetch(`http://127.0.0.1:3000/gebruiker/${gebruiker_id}`, {
        method: "PUT",
        headers: myHeaders,
        mode: "cors",
        cache: "default",
        body: VALUES
    })

    // mutate loacalstorage object with new data 
    gegevensData['full_name'] = gegevensData.voornaam + ' ' + gegevensData.naam

    let updatedData = Object.assign(JSON.parse(localStorage.nhs_user), gegevensData)

    localStorage.setItem('nhs_user', JSON.stringify(updatedData))

    location.reload()

    // console.log(gegevensData)
    // console.log(updatedData)
    // console.log(JSON.stringify(gegevensData, null, 2)) jh 
})

for (let input of inputs) {
    input.value = user_info[input.id]
    input.addEventListener("keyup", checkFormChange)
}



function checkFormChange() {
    for (let input of inputs) {
        if (user_info[input.id] != input.value) {
            document.getElementById("submit").removeAttribute("disabled")
            break
        } else {
            document.getElementById("submit").setAttribute("disabled", true)
        }
    }
}

