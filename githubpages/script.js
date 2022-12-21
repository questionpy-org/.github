
function makeUL(branches, config) {
    let list = document.createElement('ul');

    for (let i = 0; i < branches.length; i++) {
        let item = document.createElement('li');
        let link = document.createElement('a');
        link.text = branches[i];
        link.href = config.root.concat(config.prefix.concat(branches[i]));
        item.appendChild(link);
        list.appendChild(item);
    }

    return list;
}


function createBranchList(config) {
    return fetch(config.branches)
        .then(response => response.text())
        .then(text => text.split("\n"))
        .then(array => array.filter(n => n));
}


function readJSON(fileName) {
    return fetch(fileName)
        .then(response => response.json());
}

document.addEventListener("DOMContentLoaded", async function (event) {
    const config = await readJSON("./config.json");
    createBranchList(config)
        .then(branches => makeUL(branches, config))
        .then(list => document.getElementById('branch-list').appendChild(list));
})
