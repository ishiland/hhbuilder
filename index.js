function domReady() {

    // store the household members here
    var dataStore = {};

    // input selectors
    var ageInput = document.getElementsByName('age')[0]
    var relationshipSelect = document.getElementsByName('rel')[0]
    var smokerCheckbox = document.getElementsByName('smoker')[0]
    var debugCodeSelector = document.getElementsByClassName('debug')[0]
    debugCodeSelector.style.whiteSpace = "pre-wrap"
    var addButton = document.getElementsByClassName('add')[0]


    // create container and list to display the household members
    function createHouseholdListContainer() {
        var div = document.createElement("div");
        div.className = "listContainer"
        div.style.padding = "25px";
        div.style.margin = "25px 0";
        div.style.background = "cornflowerblue"; // fancy
        div.style.color = "white";
        div.innerHTML = "Household Members";
        document.getElementsByClassName("builder")[0].append(div);

        var ul = document.createElement("ul");
        ul.className = "householdList"
        document.getElementsByClassName("listContainer")[0].append(ul);
    }

    // create a unique identifier for each member
    function getUniqueIdentifier (){
        return Date.now() + Math.random()
    }

    // remove member from datastore and dom
    function removeMember(id) {
        return function () {
            document.getElementsByClassName("listMember-" + id)[0].remove()
            delete dataStore[id]
        };
    }

    // add member to datastore
    function addMember(age, rel, smoker) {

        var id = getUniqueIdentifier()
        var householdList = document.getElementsByClassName("householdList")[0]
        var li = document.createElement("li");
        className = "listMember-" + id
        li.className = className
        li.innerHTML = age + ", " + rel + ", " + smoker + " "

        var removeButton = document.createElement('button');
        removeButton.innerHTML = 'remove'
        removeButton.onclick = removeMember(id)
        li.append(removeButton)
        householdList.append(li);

        dataStore[id] = {
            "age": age,
            "rel": rel,
            "smoker": smoker
        }
    }

    // remove unique identifier and jsonify data
    function getJSON(){
        var result = []
        for(var key in dataStore){
            if(dataStore.hasOwnProperty(key)){
                var value = dataStore[key];
                result.push(value)
            }
        }
        return JSON.stringify(result)
    }

    // validate form and submit
    function submitForm(e) {
        e.preventDefault();
        if (!Object.keys(dataStore).length) {
            debugCodeSelector.style.display = "none"
            alert("please add members to your household.")
            return
        }
        // display to debug node
        debugCodeSelector.innerHTML = getJSON()
        debugCodeSelector.style.display = "block"
    }

    // fires when add button is clicked
    addButton.addEventListener('click', function (e) {
        e.preventDefault();

        var age = ageInput.value
        var rel = relationshipSelect.value

        // simple validation
        if (isNaN(age) || age < 1) {
            alert("please enter a valid age greater than 0.")
            return
        }
        if (!rel) {
            alert("please select a relationship.")
            return
        }

        var smoker = smokerCheckbox.checked ? "yes" : "no"
        addMember(age, rel, smoker)
    });

    createHouseholdListContainer()
    document.getElementsByTagName("form")[0].onsubmit = function (e) { submitForm(e) };
}

// make sure DOM is ready
if (document.readyState === 'complete') {
    domReady()
} else {
    document.addEventListener("DOMContentLoaded", domReady);
}