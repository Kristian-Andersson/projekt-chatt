var attempt = 3; 

function validate() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("email").value;
    if (username == "admin" && password == "admin") {
        window.location = "index.html"; 
        return false;
    } else {
        attempt--; 
        alert("You have " + attempt + " attempts left");

        if (attempt == 0) {
            document.getElementById("username").disabled = true;
            document.getElementById("email").disabled = true;
            document.getElementById("submit").disabled = true;
            return false;
        }
    }
}

var input = document.getElementById("email");
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("submit").click();
    }
});

