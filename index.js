import users from "./people.json" assert {type: 'json'};;

function debugMsg(msg) {
    let p = document.createElement("p");
    p.innerText = msg;
    document.appendChild(p);
}

window.onload = () => {
    // Create table from users
    let table = document.getElementById("attendance-table");
    // Set dates
    let dates_tr = document.getElementById("dates");
    let shaarav_keys = Object.keys(users["Shaarav Agrawal"]);
    for (let i = 0; i < shaarav_keys.length; i++) {
        let date = document.createElement("td");
        date.innerText = shaarav_keys[i];
        dates_tr.appendChild(date);
    }
    // Set People
    let keys = Object.keys(users);
    for (let i = 0; i < keys.length; i++) {
        let tr = document.createElement('tr');
        // Name
        let name_td = document.createElement('td');
        let name = keys[i];
        name_td.innerText = name;
        // Dates
        let person = users[name]
        let dates = Object.keys(person);
        for (let j = 0; j < dates.length; j++) {
            let date_td = document.createElement()
        }

        tr.appendChild(name_td);
        table.appendChild(tr);
    }

};