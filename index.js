function domReady() {

    // store the household members here
    var dataStore = [];

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
        div.style.background = "cornflowerblue";
        div.style.color = "white";
        div.innerHTML = "Household Members";
        document.getElementsByClassName("builder")[0].append(div);

        var ul = document.createElement("ul");
        ul.className = "householdList"
        document.getElementsByClassName("listContainer")[0].append(ul);
    }

    // remove member from datastore
    function removeMember(i) {
        return function () {
            dataStore.splice(i, 1);
            updateList()
        };
    }

    // sync dom with contents of dataStore
    function updateList() {
        var householdList = document.getElementsByClassName("householdList")[0]
        householdList.innerHTML = ''
        for (var i = 0; i < dataStore.length; i++) {
            var li = document.createElement("li");
            li.className = "listMember-" + i
            li.innerHTML = dataStore[i].age + ", " + dataStore[i].rel + ", " + dataStore[i].smoker + " "

            var removeButton = document.createElement('button');
            removeButton.innerHTML = 'remove'
            removeButton.onclick = removeMember(i)
            li.append(removeButton)
            householdList.append(li);
        }
    }

    // validate form and submit
    function submitForm(e) {
        e.preventDefault();
        if (!dataStore.length) {
            debugCodeSelector.style.display = "none"
            alert("please add memebers to your household.")
            return
        }

        // display to debug node
        var output = JSON.stringify(dataStore)
        debugCodeSelector.innerHTML = output
        debugCodeSelector.style.display = "block"
    }

    // fires when add button is clicked
    addButton.addEventListener('click', function (e) {
        e.preventDefault();

        var age = ageInput.value
        var rel = relationshipSelect.value

        // simple validation
        if (!age || age < 1) {
            alert("please enter a valid age greater than 0.")
            return
        }
        if (!rel) {
            alert("please select a relationship.")
            return
        }

        // add to the datastore
        dataStore.push({
            "age": age,
            "rel": rel,
            "smoker": smokerCheckbox.checked ? "smoker" : "non-smoker"
        })

        updateList()
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