const eventModal = M.Modal.init(document.getElementById('eventModal'))
const inputs = document.querySelectorAll('input')
let roadmaps = []
let assignments = []
let fetchOptions = {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
}

let parseEvents = function () {
    let events = []
    for (let assignment of assignments) {
        let { id, assignment_naam: title, start_datum: start, inlever_datum: end } = assignment
        { events.push({ id, title, start, end, url: id }) }
    }
    return events
}



document.addEventListener('DOMContentLoaded', async function () {
    await fetch(`http://127.0.0.1:3000/roadmap/student/11`, fetchOptions)
        .then((res) => res.json())
        .then(async ({ data }) => {
            roadmaps = data.map(x => x)
            for (let roadmap of roadmaps) {
                // console.log(roadmap)
                await fetch(`http://127.0.0.1:3000/assignment/roadmap/${roadmap.roadmap_id}`, fetchOptions)
                    .then(res => res.json())
                    .then(({ data }) => { for (let x of data) { assignments.push(x) } })
            }
        })
    let calendarEl = document.getElementById('calendar');
    let calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: parseEvents(),
        eventClick: function (info) {
            info.jsEvent.preventDefault()
            assignment = assignments.find(x => x.id == info.event.id)
            for (let input of inputs) {
                if (input.id == 'start_datum' || input.id == 'inlever_datum') {
                    input.value = new Date(assignment[input.id]).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                }
                else
                    input.value = assignment[input.id]
                input.setAttribute('disabled', true)
            }
            eventModal.open()
            // console.log(info, assignment)

        }
    })

    calendar.render();


});