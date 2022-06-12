document.addEventListener("DOMContentLoaded", main);
const txtInput = document.querySelector(".txt-input");
function main() {
    addTodo();
    $("#add").click(function () {
        const item = $(".txt-input").val().trim();
        // console.log(item);
        if (item) {
            txtInput.value = "";
            const todos = !localStorage.getItem("todos")
                ? []
                : JSON.parse(localStorage.getItem("todos"));
            const currentTodo = {
                item,
                isCompleted: false,
            };
            addTodo([currentTodo]);
            todos.push(currentTodo);
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    });
    // console.log(localStorage.getItem("todos"));
    // if(localStorage.getItem("todos") == []){
    //     $('#notodo').style.display = "block";
    // }

}
function removeTodo(index) {
    const todos = JSON.parse(localStorage.getItem("todos"));
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function addTodo(todos = JSON.parse(localStorage.getItem("todos"))) {
    if (!todos) {
        return null;
    }
    todos.forEach(function (todo) {
        const card = document.createElement("li");
        const item = document.createElement("p");
        const button = document.createElement("button");
        const del = document.createElement("i");
        card.classList.add("card");
        button.classList.add("clear");
        item.classList.add("item");
        del.classList.add("fa", "fa-times");
        item.textContent = todo.item;
        var count = 0;
        item.addEventListener("click", function () {
            count++;
            // console.log(count / 2);
            if (count % 2 == 0) {
                item.classList.remove("checked");
            } else {
                item.classList.add("checked");
            }
        });
        button.addEventListener("click", function () {
            const selectedCard = this.parentElement;
            selectedCard.classList.add("fall");
            removeTodo(
                [...document.querySelectorAll(".todos .card")].indexOf(
                    selectedCard
                )
            );
            selectedCard.addEventListener("animationend", function () {
                setTimeout(function () {
                    selectedCard.remove();
                }, 100);
            });
        });
        card.appendChild(item);
        card.appendChild(button);
        button.appendChild(del);
        document.querySelector(".todos").appendChild(card);
    });
}