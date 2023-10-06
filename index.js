import users from "./people.json" assert {type: 'json'};;

window.onload = () => {
    let name_popup = document.getElementById('add-person-div');
    let date_popup = document.getElementById('add-date-div');
    let table = document.getElementById("attendance-table");
    let date_inputs = document.getElementById('date-inputs');
    let name_inputs = document.getElementById('name-inputs');

    let name_showing = false;
    let date_showing = false;

    // Button click functions
    let new_dates = [];
    function show_name() {
        if (name_showing || date_showing) return;
        name_popup.style.display = 'block';

        // Clear Date Inputs
        date_inputs.innerHTML = `<div class="row label-row"></div>
        <div class="row input-row"></div>`

        // Create Date Inputs
        let dates_tr = document.getElementById('dates');
        let num_dates = dates_tr.children.length - 3;
        let label_row = date_inputs.children.item(0);
        let input_row = date_inputs.children.item(1);
        for (let i = 1; i < num_dates + 1; i++) {
            // column div
            let label_div = document.createElement('div');
            label_div.className = 'col';
            let margin = `${(i - 1) / num_dates * 100}%`;
            label_div.style.marginLeft = margin;
            let input_div = document.createElement('div');
            input_div.className = 'col';
            input_div.style.marginLeft = margin;

            let label = document.createElement('label');
            label.htmlFor = `name-inp-${i}`;
            let date = dates_tr.children.item(i).textContent;
            label.textContent = date;

            let input = document.createElement('input');
            input.className = 'stackable-input';
            input.style.left = `${15 + (i - 1) / num_dates * 70}%`;
            input.id = `name-inp-${i}`;
            new_dates[i - 1] = input;

            label_div.appendChild(label);
            input_div.appendChild(input);
            label_row.appendChild(label_div);
            input_row.appendChild(input_div);
        }

        name_showing = true;
    }
    let new_date_points = [];
    function show_date() {
        if (name_showing || date_showing) return;

        date_popup.style.display = 'block';

        // Clear Name Inputs
        name_inputs.innerHTML = `<div class="row label-row"></div>
        <div class="row input-row"></div>`

        // Create Name Inputs
        let num_names = Object.keys(users).length;
        let label_row = name_inputs.children.item(0);
        let input_row = name_inputs.children.item(1);
        for (let i = 1; i < num_names + 1; i++) {
            // column div
            let label_div = document.createElement('div');
            label_div.className = 'col';
            let margin = `${(i - 1) / num_names * 100}%`;
            label_div.style.marginLeft = margin;
            let input_div = document.createElement('div');
            input_div.className = 'col';
            input_div.style.marginLeft = margin;

            let label = document.createElement('label');
            label.htmlFor = `date-inp-${i}`;
            let name = table.children.item(i).children.item(0).textContent;
            label.textContent = name.split(' ')[0]; // First Name

            let input = document.createElement('input');
            input.className = 'stackable-input';
            input.style.left = `${15 + (i - 1) / num_names * 70}%`;
            input.id = `date-inp-${i}`;
            new_date_points[i - 1] = input;

            label_div.appendChild(label);
            input_div.appendChild(input);
            label_row.appendChild(label_div);
            input_row.appendChild(input_div);
        }

        date_showing = true;
    }
    function cancel_name() {
        name_popup.style.display = 'none';

        name_showing = false;
    }
    function cancel_date() {
        date_popup.style.display = 'none';

        date_showing = false;
    }
    let name_inp = document.getElementById('name-inp');
    function add_name() {
        name_showing = false;
        name_popup.style.display = 'none';
        
        let tr = document.createElement('tr');
        // Name
        let name_td = document.createElement('td');
        let name = name_inp.value;
        name_td.textContent = name;
        tr.appendChild(name_td);
        // Dates
        let dates = [];
        let label_row = date_inputs.children.item(0)
        for (let i = 0; i < label_row.children.length; i++) {
            dates[i] = label_row.children.item(i).textContent;
        }
        // Points
        let points = 0;
        let point_values = [];
        for (let i = 0; i < new_dates.length; i++) {
            let date_td = document.createElement('td');
            let point_value = new_dates[i].value;
            let point_int = parseInt(point_value);
            point_values[i] = point_int;
            if (isNaN(point_int)) {
                alert('Error: Not a Number');
                return;
            }
            date_td.textContent = point_value;
            points += point_int;
            tr.appendChild(date_td);
        }
        let point_td = document.createElement('td');
        point_td.textContent = points;
        tr.appendChild(point_td);

        // Remove Button
        add_remove_button(tr);

        table.appendChild(tr);

        // Reset new date list
        new_dates = [];

        // Update json file
        let user = {};
        for (let i = 0; i < dates.length; i++) {
            user[dates[i]] = point_values[i];
        }
        users[name] = user;
    }
    function add_date() {

    }
    function export_users() {
        alert(JSON.stringify(users));
        console.log(JSON.stringify(users));
    }
    function remove(row) {
        let name = row.children.item(0).textContent;
        table.removeChild(row);

        delete users[name];
    }

    // Helper functions
    function add_remove_button(tr) {
        let remove_td = document.createElement('td');
        let remove_button = document.createElement('img');
        remove_button.src = './x.png';
        remove_button.className = 'remove-img';
        remove_button.addEventListener('click', () => remove(tr));
        remove_td.appendChild(remove_button);
        tr.appendChild(remove_td);
    }

    // Set button listeners
    let show_name_button = document.getElementById('add-person');
    show_name_button.addEventListener('click', show_name);
    let show_date_button = document.getElementById('add-date');
    show_date_button.addEventListener('click', show_date);
    let cancel_name_button = document.getElementById('cancel-name');
    cancel_name_button.addEventListener('click', cancel_name);
    let cancel_date_button = document.getElementById('cancel-date');
    cancel_date_button.addEventListener('click', cancel_date);
    let add_name_button = document.getElementById('add-name-button');
    add_name_button.addEventListener('click', add_name);
    let export_button = document.getElementById('export');
    export_button.addEventListener('click', export_users);

    // Create table from users
    // Set dates
    let dates_tr = document.getElementById("dates");
    let name_header = document.createElement('td');
    name_header.textContent = "Names";
    dates_tr.appendChild(name_header);

    let shaarav_keys = Object.keys(users["Shaarav Agrawal"]);
    for (let i = 0; i < shaarav_keys.length; i++) {
        let date = document.createElement("td");
        date.innerText = shaarav_keys[i];
        dates_tr.appendChild(date);
    }
    let total_header = document.createElement('td');
    total_header.textContent = 'Total Points';
    dates_tr.appendChild(total_header);
    let remove_header = document.createElement('td');
    remove_header.textContent = 'Remove';
    dates_tr.appendChild(remove_header);
    // Set People
    let keys = Object.keys(users);
    for (let i = 0; i < keys.length; i++) {
        let tr = document.createElement('tr');
        // Name
        let name_td = document.createElement('td');
        let name = keys[i];
        name_td.innerText = name;
        tr.appendChild(name_td);
        // Dates
        let person = users[name]
        let dates = Object.keys(person);
        let points = 0;
        for (let j = 0; j < dates.length; j++) {
            let date_td = document.createElement('td');
            let point = person[dates[j]];
            points += point;
            date_td.textContent = point;
            tr.appendChild(date_td);
        }
        // Total Points
        let point_td = document.createElement('td');
        point_td.textContent = points;
        tr.appendChild(point_td);

        // Remove Button
        add_remove_button(tr);
        
        table.appendChild(tr);
    }

};