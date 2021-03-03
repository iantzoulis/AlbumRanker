$(function () {
    $("tbody").sortable({
        update: function (e, ui) {
            $("tr td:nth-child(1)").text(function () {
                return $(this).parent().index("tr");
            });
        }
    });
    $("tbody").disableSelection();
});

function addItem() {
    albumTitle = document.getElementById("album-input").value.trim();
    artist = document.getElementById("artist-input").value.trim();

    if (!albumTitle || !artist) return;

    var table = document.getElementById("ranker-table").getElementsByTagName('tbody')[0];
    var pos = table.rows.length;
    var row = table.insertRow(pos);

    var rankCell = row.insertCell(0);
    var albumCell = row.insertCell(1);
    var artistCell = row.insertCell(2);

    rankCell.innerHTML = pos + 1;
    albumCell.innerHTML = albumTitle;
    artistCell.innerHTML = artist;

    document.getElementById("album-input").value = '';
    document.getElementById("artist-input").value = '';

    document.querySelector("#album-input").focus();
}

function sortItems() {

}

function deleteItem() {

}

function confirmListDeletion() {
    if (confirm("Please confirm that you would like to delete all items in the list. Once deleted, your list cannot be restored.")) {
        clearList();
    }
    else {
        return;
    }
}

function clearList() {
    var table = document.getElementById("ranker-table");
    for (let i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }
}