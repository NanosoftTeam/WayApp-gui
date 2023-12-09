var global_desktop = false;
let jsonData = [ // Sample JSON Project Data to test
    {  
        "name": "project1",   
        "tag": ["tag1", "tag2"]
    },
    {  
        "name": "project2",   
        "tag": ["tag3", "tag4"]
    },
    {  
        "name": "project3",   
        "tag": ["tag5", "tag6"]
    }
]

//
// Function, which makes us able to choose (using the variable above), which way the `popup_join.html`
// window has to be opened.
//

function joinWindow() {
    if (global_desktop) {
        eel.joinWindow();
    } else {
        document.location.href = "./popup_join.html";
    }
}

//
// Function, which makes us able to choose (using the variable above), which way the `verify_pin.html`
// window has to be opened.
//

function verifyPinWindow() {
    if (global_desktop) {
        eel.verifyPinWindow();
    } else {
        document.location.href = "./verify_pin.html";
    }
}


//
// Function, which referes to the EEL exposed function, contained in the `gui.py` file.
//

function parseCreateProjectData_JS(name, tags) {
    eel.parseCreateProjectData(name, tags);
}

//
// Function, which referes to the EEL exposed function, contained in the `gui.py` file.
//

function parseJoinData_JS(username, pin) {
    eel.parseJoinData(username, pin);
}

//
// Function, which referes to the EEL exposed function, contained in the `gui.py` file.
//

function verifyPin(pin) {
    eel.verifyPin(pin);
}

function convert(id) {
    let container = $(id);
    let table = $("<table>");
    let cols = Object.keys(jsonData[0]);
    let thead = $("<thead>");
    let tr = $("<tr>");
    
    $.each(cols, function(i, item){
        let th = $("<th>");
        th.text(item);
        tr.append(th);
    });
    thead.append(tr);
    table.append(tr);
    
    $.each(jsonData, function(i, item){
    let tr = $("<tr>");
        let vals = Object.values(item);
        
        $.each(vals, (i, elem) => {
            let td = $("<td>");
            td.text(elem);
            tr.append(td);
        });
        table.append(tr);
    });
    container.append(table)
}