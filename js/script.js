$(document).ready(loadTableInfo);

$(function () {
    $('tbody').sortable({
        update: function (e, ui) {
            $('tr td:nth-child(1)').text(function () {
                return $(this).parent().index('tr');
            });
            saveTableInfo();
        }
    });
    $('tbody').disableSelection();
});

$('#ranker-title').change(function () {
    var title = document.getElementById('ranker-title').value.trim();
    localStorage.setItem('title', JSON.stringify(title));
})

$(document).on('click', '.del-icon', function () {
    $(this).closest('tr.item').remove();
    $('.rank').each(function (i) {
        $(this).text(i + 1);
    });
    saveTableInfo();
});

$('#addItem-Btn').on('click', function () {
    addItem();
});

$('#exportList-Btn').on('click', function () {
    exportList();
});

$('#clearList-Btn').on('click', function () {
    if (confirm('Please confirm that you would like to delete all items in the list. Once deleted, your list cannot be restored.')) {
        clearList();
    }
});

$('#importList-Btn').on('click', function () {
    var fileInput = document.getElementById('file-input');
    fileInput.click();
});

$('#file-input').change(function (e) {
    onFileInputChange(e);
});

$('#exportJPEG-Btn').on('click', function () {
    window.scrollTo(0, 0);
    domtoimage.toJpeg(document.getElementById('ranker-container'))
        .then(function (dataUrl) {
            var elem = document.createElement('a');
            elem.download = getFileName() + '.jpeg';
            elem.href = dataUrl;

            document.body.appendChild(elem);
            elem.click();
            document.body.removeChild(elem);
        });
});

function addItem() {
    var albumTitle = document.getElementById('album-input').value.trim();
    var artist = document.getElementById('artist-input').value.trim();

    if (!albumTitle || !artist) return;

    var table = document.getElementById('ranker-table').getElementsByTagName('tbody')[0];
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

    document.getElementById('album-input').value = '';
    document.getElementById('artist-input').value = '';
    document.querySelector('#album-input').focus();

    saveTableInfo();
}

function clearList() {
    var table = document.getElementById('ranker-table');
    for (let i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }
    localStorage.clear();

    document.getElementById('ranker-title').value = '';
    document.getElementById('album-input').value = '';
    document.getElementById('artist-input').value = '';
    document.querySelector('#ranker-title').focus();
}

function exportList() {
    var contents = JSON.stringify(localStorage);
    var elem = document.createElement('a');
    elem.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(contents));
    elem.setAttribute('download', getFileName() + '.json');

    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
}

function getFileName() {
    var title = document.getElementById('ranker-title').value.replace(/ /g, '');
    if (title) {
        return title;
    }
    else {
        return 'UntitledChart';
    }
}

function importList(obj) {
    clearList();

    document.getElementById('ranker-title').value = JSON.parse(obj.title);
    var arr = [];
    arr = JSON.parse(obj.table);

    var table = document.getElementById('ranker-table').getElementsByTagName('tbody')[0];
    for (var i = 0; i < arr.length; i++) {
        var row = table.insertRow();
        row.className = 'item';

        var rankCell = row.insertCell(0);
        rankCell.className = 'rank';

        var albumTitleCell = row.insertCell(1);
        var artistCell = row.insertCell(2);
        var deleteCell = row.insertCell(3);

        rankCell.innerHTML = arr[i].Rank;
        albumTitleCell.innerHTML = arr[i].AlbumTitle;
        artistCell.innerHTML = arr[i].Artist;
        deleteCell.innerHTML = '<div class="text-center del-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" /></svg></div>';
    }

    saveTableInfo();
}

function loadTableInfo() {
    var tableStorage = localStorage.getItem('table');
    if (tableStorage) {
        var arr = [];
        arr = JSON.parse(tableStorage);

        var title = document.getElementById('ranker-title');
        title.value = JSON.parse(localStorage.getItem('title'));

        var table = document.getElementById('ranker-table').getElementsByTagName('tbody')[0];
        for (var i = 0; i < arr.length; i++) {
            var row = table.insertRow();
            row.className = 'item';

            var rankCell = row.insertCell(0);
            rankCell.className = 'rank';

            var albumTitleCell = row.insertCell(1);
            var artistCell = row.insertCell(2);
            var deleteCell = row.insertCell(3);

            rankCell.innerHTML = arr[i].Rank;
            albumTitleCell.innerHTML = arr[i].AlbumTitle;
            artistCell.innerHTML = arr[i].Artist;
            deleteCell.innerHTML = '<div class="text-center del-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" /></svg></div>';
        }
    }
}

function onFileInputChange(event) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
}

function onReaderLoad(event) {
    var obj = JSON.parse(event.target.result);
    importList(obj);
}

function EntryInfo(rank, albumTitle, artist) {
    this.Rank = rank;
    this.AlbumTitle = albumTitle;
    this.Artist = artist;
}

function saveTableInfo() {
    var arr = [];
    $('#ranker-table').find('tbody tr').each(function (index, item) {

        var rank = $(item).find('td').eq(0).text();
        var albumTitle = $(item).find('td').eq(1).text();
        var artist = $(item).find('td').eq(2).text();
        arr.push(new EntryInfo(rank, albumTitle, artist));
    });

    localStorage.setItem('table', JSON.stringify(arr));
}