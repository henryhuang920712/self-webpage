var form = document.querySelector('.contact-form');
var inputs = document.querySelectorAll("#contact-me input,textarea");
var button = document.querySelector(".contact-form button");


function check() {
    inputs.forEach(function (input) {
        window.addEventListener("click", function (event) {
            if (event.target === input) {
                if (input.nextElementSibling.classList.contains("form-input")) {
                    input.nextElementSibling.classList.toggle("form-input");
                    input.nextElementSibling.classList.toggle("form-input-new");
                }
            }
            else if (input.value === "" && input.nextElementSibling.classList.contains("form-input-new")) {
                input.nextElementSibling.classList.toggle("form-input");
                input.nextElementSibling.classList.toggle("form-input-new");
            }

        })
    });
}

function submit() {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        var formData = new FormData(form, button);
        var modalBody = document.querySelector('#contact-me .modal-body');
        formData.forEach((val, key) => {
            var row = document.createElement("div");
            var col1 = document.createElement("div");
            var col2 = document.createElement("div");

            row.setAttribute('class', 'row');            
            col1.setAttribute('class', 'col-6 lead text-left');
            col2.setAttribute('class', 'col-6 text-secondary text-center');
            col1.textContent = `${key}:`;
            col2.textContent = val;

            row.appendChild(col1);
            row.appendChild(col2);
            modalBody.appendChild(row);
        });

    });
}

check();
submit();




