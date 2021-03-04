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

$(document).on("click", ".del-icon", function () {
    $(this).closest('tr.item').remove();
    $('.rank').each(function (i) {
        $(this).text(i + 1);
    });
});

function addItem() {
    albumTitle = document.getElementById("album-input").value.trim();
    artist = document.getElementById("artist-input").value.trim();

    if (!albumTitle || !artist) return;

    var table = document.getElementById("ranker-table").getElementsByTagName('tbody')[0];
    var pos = table.rows.length;
    var row = table.insertRow(pos);
    row.className = 'item';

    var rankCell = row.insertCell(0);
    rankCell.className = 'rank';

    var albumCell = row.insertCell(1);
    var artistCell = row.insertCell(2);
    var deleteCell = row.insertCell(3);

    rankCell.innerHTML = pos + 1;
    albumCell.innerHTML = albumTitle;
    artistCell.innerHTML = artist;
    deleteCell.innerHTML = '<div class="text-center del-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" /></svg></div>';

    document.getElementById("album-input").value = '';
    document.getElementById("artist-input").value = '';
    document.querySelector("#album-input").focus();
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