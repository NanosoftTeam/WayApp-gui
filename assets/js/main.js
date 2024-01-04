var global_desktop = false;

//
// Function, which makes us able to choose (using the variable above), which way the `popup_join.html`
// window has to be opened.
//

async function editProject(name, newName, newTagsToAdd) {
    console.log(name, newName, newTagsToAdd);
    try {
        await eel.editProject(name, newName, newTagsToAdd)();
    } catch (error) {
        console.log("Error: ", error);
    }
}

function editEnable(name) {
    $("#input-group").css("opacity", 1);
}

// Example function that previews the example (first) project 
function previewExample(name) {
    var project = $("S_projectName_WayApp");

    $("#projectInfo").css("display", "block");
    document.getElementById("projectInfo_name").innerHTML = name;
    updateProjectTags(name);
}

async function updateProjectTags(name) {
    try {
        const tags = await eel.getProjectTags(name)();
        document.getElementById("projectInfo_tags").innerHTML = tags;
    } catch (error) {
        console.error('Error:', error);
    }
}

// Deprecated, might be deleted
function joinWindow() {
    if (global_desktop) {
        eel.joinWindow();
    } else {
        document.location.href = "./views/popups/popup_join.html";
    }
}

//
// Function, which makes us able to choose (using the variable above), which way the `verify_pin.html`
// window has to be opened.
//

function goToHome() {
    document.location.href = "./views/home.html";
}

//
// Function, which makes us able to choose (using the variable above), which way the `verify_pin.html`
// window has to be opened.
//

function verifyPinWindow() {
    if (global_desktop) {
        eel.verifyPinWindow();
    } else {
        document.location.href = "./views/popups/verify_pin.html";
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