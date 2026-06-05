function openBookingForm() {
    document.getElementById('formFieldsState').style.display = 'block';
    document.getElementById('thanksMessageState').style.display = 'none';
    document.getElementById('bookingOverlay').style.display = 'flex';
}

function closeBookingForm() {
    document.getElementById('bookingOverlay').style.display = 'none';
}

function checkCourseSelection() {
    var selectedCourse = document.getElementById('stdCourse').value;
    var classWrapper = document.getElementById('classSelectWrapper');
    var boardWrapper = document.getElementById('boardSelectWrapper');
    var boardSelect = document.getElementById('stdBoard');
    var naOption = document.getElementById('naOption');

    if(selectedCourse === "School Tuition") {
        classWrapper.style.display = 'flex';
        boardWrapper.style.display = 'flex';
        naOption.style.display = 'none';
        if(boardSelect.value === "Not Applicable") {
            boardSelect.value = "CBSE Board";
        }
    } else {
        classWrapper.style.display = 'none';
        boardWrapper.style.display = 'none';
        naOption.style.display = 'block';
        boardSelect.value = "Not Applicable";
    }
}

function processRegistration() {
    var name = document.getElementById('stdName').value.trim();
    var father = document.getElementById('stdFather').value.trim();
    var mobile = document.getElementById('stdMobile').value.trim();
    var address = document.getElementById('stdAddress').value.trim();
    var course = document.getElementById('stdCourse').value;
    var board = document.getElementById('stdBoard').value;
    var targetClass = document.getElementById('stdClass').value;

    if(name === "" || father === "" || mobile === "" || address === "") {
        alert("Please fill out all the registration fields accurately!");
        return;
    }

    if(!/^[0-9]{10}$/.test(mobile)) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
    }

    var destinationNumber = "919896470813";
    var absoluteMessage = "🚨 *NEW DEMO ENTRY RECEIVED* 🚨\n\n" +
                          "• *Student Name:* " + name + "\n" +
                          "• *Father's Name:* " + father + "\n" +
                          "• *Mobile Number:* " + mobile + "\n" +
                          "• *Home Address:* " + address + "\n";

    if(course === "School Tuition") {
        absoluteMessage += "• *Course Stream:* Tuition (" + targetClass + " - " + board + ")\n";
    } else {
        absoluteMessage += "• *Course Stream:* " + course + "\n";
    }

    absoluteMessage += "\n_Please send me the paid demo fee registration details._";

    var dispatchLink = "https://wa.me/" + destinationNumber + "?text=" + encodeURIComponent(absoluteMessage);
    window.open(dispatchLink, '_blank');

    document.getElementById('formFieldsState').style.display = 'none';
    document.getElementById('thanksMessageState').style.display = 'block';
    document.getElementById('demoRegisterForm').reset();
}

function previewFlyer(input) {
    var file = input.files && input.files[0];
    var previewBox = document.getElementById('flyerPreviewBox');
    if(!file || !previewBox) {
        return;
    }

    var reader = new FileReader();
    reader.onload = function(event) {
        previewBox.innerHTML = '<img src="' + event.target.result + '" alt="Uploaded flyer preview">';
    };
    reader.readAsDataURL(file);
}

document.addEventListener('DOMContentLoaded', function() {
    if(document.getElementById('stdCourse')) {
        checkCourseSelection();
    }
});
