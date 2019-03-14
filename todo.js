
const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector(".js-toDoInput"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "todos"

//원래는 toDos array가 const로 되어 있는데 나중에 toDos의 값을 바꿔줄려면 const로하면 안되고 let으로 해줘야함

let toDos =[];  


function deleteToDo(event){
    // console.dir(event.target)
    
    // console.log(event.target.parentNode)
    // console.log(event.target.parentNode.removeChild())
    const bnt = event.target;
    const li = bnt.parentNode;

    toDoList.removeChild(li)

    //[{text: "go eat", id: 1}, {text: "take a coffee", id: 2}, {text: "get some snow", id: 3}]
    //filter(function(@@){@@.id ==> 여기서 @@.id는 각각의 object의 id들을 말함 })
    // console.log("toDos",toDos.filter(function(potato){
    //     return potato.id !== 1
    // }))

    //id값이 1이 아닌애들은 다 나와 이것  

    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
        //여기서 내가 지우는 애가 id가 뭔지 어케 아냐
        //console.dir(li)
        //이걸 해보면 li의 id값을 알 수 있다.

        //또한 여기서 toDo.id는 숫자고 li.id는 string이다 
        //그래서 li.id를 int로 바꿔줘야한다. parseInt()
        
    })
    //console.log("cleanToDos",cleanToDos)

    //cleanToDos를 한 후에 이 값들을 localStorage에 넣어야 한다 아니 바꿔줘야 한다.
    toDos = cleanToDos;
    //console.log(toDos)
    saveToDos();    
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos))

}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("Button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "☄️";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.id = newId;
    li.appendChild(span);
    li.appendChild(delBtn);
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    // 여기서 toDos 어레이인데 toDoObj은 object임 것보다 localStorage에 들어가는것은 
    //string으로 들어가야 해서 JSON으로 바꿔줘@@  
    //===================== JSON.stringify(바꿀것)====> text로 나옴
    // console.log(toDos)
    saveToDos();

    // console.log(JSON.stringify(toDos))
}

function toDoHandle(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
}

function loadList(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        //loaedeToDos가져오면 이렇게 나오는데 이게 각각의 object인데
        //[{text: "go eat", id: 1}, {text: "take a coffee", id: 2}, {text: "get some snow", id: 3}]
        //이것을 각각 하나씩 보고 그에 맞는 걸 불러오겠다는 함수가 forEach()
        parsedToDos.forEach(function(todo){
            //console.log(todo.text)
            //이렇게 부르면
            // go eat
            // take a coffee
            // get some snow
            // 이렇게 나옴

            paintToDo(todo.text)

        })
    }

}


function init(){
    loadList();
    toDoForm.addEventListener("submit", toDoHandle);
}

init();