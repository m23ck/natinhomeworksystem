myHeaders.set("Authorization", "Bearer " + current_token2);

let student_id = JSON.parse(localStorage.nhs_user).gebruiker_id
const resultData = { punten: [], vak_naam: [] }
async function getData() {
    fetch(`http://127.0.0.1:3000/resultaat/average_vak_all`, {
        method: "GET",
        headers: myHeaders,
        mode: "cors",
        cache: "default",
    }).then(res => res.json()).then(({ data }) => {
        for (let result of data) {
            console.log(result)
            resultData['punten'].push(result.punten)
            resultData['vak_naam'].push(result.vak_naam)
        }
        createChart()
    }

    )
}
getData()

async function createChart() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: resultData.vak_naam,
            datasets: [{
                label: '# Average Score Per Subject',
                data: resultData.punten,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    })
}
