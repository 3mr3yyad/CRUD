var siteName = document.getElementById("title")
var siteURL = document.getElementById("siteLink")
var submitBtn = document.getElementById("submiting")
var updateBtn = document.getElementById("updating")
var searchInput = document.getElementById("searchInput")

var bookMarksList = []

if (localStorage.getItem("res") != null) {
    bookMarksList = JSON.parse(localStorage.getItem("res"))
    displaydata()
}

function addBookmark() {
    var bookmark = {
        websiteName: siteName.value,
        websiteLink: siteURL.value,
    }
    bookMarksList.push(bookmark)
    localStorage.setItem("res", JSON.stringify(bookMarksList))
    
    displaydata()
}

function deleteBookmark(indx) {
    bookMarksList.splice(indx, 1)
    localStorage.setItem("res", JSON.stringify(bookMarksList))
    displaydata()
}

function displaydata() {
    var temp = ""
    for (var i = 0; i < bookMarksList.length; i++) {
        temp += `<tr>
                    <td>`+ Number(i + 1) + `</td>
                    <td class="fw-bold">`+ bookMarksList[i].websiteName + `</td>
                    <td>
                        <a href="https://`+bookMarksList[i].websiteLink+`" target="_blank"><button class="btn btn-primary" data-index=`+i+`>
                            <i class="fa-solid fa-eye pe-2"></i>Visit
                        </button></a>
                    </td>
                    <td>
                            <button class="btn btn-warning pe-2 text-white" data-index="`+i+`" onclick="updateBookmark(`+i+`)">
                                <i class="fa-solid fa-pen-to-square"></i>
                                Update
                            </button>
                        </td>
                    <td>
                        <button class="btn btn-danger pe-2" data-index="`+i+`" onclick="deleteBookmark(`+i+`)">
                            <i class="fa-solid fa-trash-can"></i>
                            Delete
                        </button>
                    </td>
                </tr>`
    }
    document.getElementById("savedBookmarks").innerHTML = temp
}

function clr() {
    siteName.value = ""
    siteURL.value =""
}

var indexToEdit;

function updateBookmark(i) {
    indexToEdit = i
    submitBtn.classList.add("d-none")
    updateBtn.classList.remove("d-none")
    siteName.value = bookMarksList[i].websiteName
    siteURL.value = bookMarksList[i].websiteLink
}

function editBookmark() {
    bookMarksList[indexToEdit].websiteName = siteName.value
    bookMarksList[indexToEdit].websiteLink = siteURL.value

    submitBtn.classList.remove("d-none")
    updateBtn.classList.add("d-none")

    clr()

    localStorage.setItem("res", JSON.stringify(bookMarksList))
    displaydata()
}


function search() {
    var searchValue = searchInput.value.toLowerCase()
    var temp = ""
    for (var i = 0; i < bookMarksList.length; i++) {
        if (bookMarksList[i].websiteName.toLowerCase().includes(searchValue) == true || bookMarksList[i].websiteLink.toLowerCase().includes(searchValue) == true) {
            temp += `<tr>
                    <td>`+ Number(i + 1) + `</td>
                    <td class="fw-bold">`+ bookMarksList[i].websiteName + `</td>
                    <td>
                        <a href="https://`+bookMarksList[i].websiteLink+`" target="_blank"><button class="btn btn-primary" data-index=`+i+`>
                            <i class="fa-solid fa-eye pe-2"></i>Visit
                        </button></a>
                    </td>
                    <td>
                            <button class="btn btn-warning pe-2 text-white" data-index="`+i+`" onclick="updateBookmark(`+i+`)">
                                <i class="fa-solid fa-pen-to-square"></i>
                                Update
                            </button>
                        </td>
                    <td>
                        <button class="btn btn-danger pe-2" data-index="`+i+`" onclick="deleteBookmark(`+i+`)">
                            <i class="fa-solid fa-trash-can"></i>
                            Delete
                        </button>
                    </td>
                </tr>`
        }
    }
    document.getElementById("savedBookmarks").innerHTML = temp
}

function deleteAll() {
    window.alert("you are deleting all bookmarks!")
    bookMarksList = []
    localStorage.setItem("res", JSON.stringify(bookMarksList))
    displaydata()
}

function validateName() {
    var nameRegex = /^\w{3,}(\s+\w+)*$/;

    var nameText = siteName.value

    if (nameRegex.test(nameText)) {
        siteName.classList.remove("forminputs")
        siteName.classList.remove("forminputsWrong")
        siteName.classList.add("forminputsCorrect")
    } else {
        siteName.classList.remove("forminputs")
        siteName.classList.remove("forminputsCorrect")
        siteName.classList.add("forminputsWrong")
    }
}

function validateLink() {
    var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

    var linkText = siteURL.value
    
    if (urlRegex.test(linkText)) {
        siteURL.classList.remove("forminputs")
        siteURL.classList.remove("forminputsWrong")
        siteURL.classList.add("forminputsCorrect")
    } else {
        siteURL.classList.remove("forminputs")
        siteURL.classList.remove("forminputsCorrect")
        siteURL.classList.add("forminputsWrong")
    }
}