let carList = [
    // {
    //     car: "Mazda 2",
    //     model: "2019",
    //     doors: 5,
    //     color: "red",
    //     brand: "mazda"
    // },
    // {
    //     car: "Ford Focus",
    //     model: "2020",
    //     doors: 4,
    //     color: "black",
    //     brand: "Ford"
    // },
    // {
    //     car: "Tucson",
    //     model: "2021",
    //     doors: 5,
    //     color: "white",
    //     brand: "Hyundai"
    // }
]
//para la clase lunes 14

let updateFlag = false;
let updateIndex = null;

const carListUI = document.getElementById("carList")
const carForm = document.getElementById("carLog")
//clase lunes 14 localstorage
//es vulnerabilidad usar claves con local storage

let localCarList= JSON.parse(localStorage.getItem("carStorageArray"))

const carStorage = () => {
    if (typeof Storage !== "undefined") {
        localStorage.setItem("carStorageArray", JSON.stringify(carList))
        renderList()
    } else {
        alert("Not is compatible")
    }

}

const renderList = () => {
    carListUI.innerHTML = ""
    let carArray = JSON.parse(localStorage.getItem("carStorageArray"))
    // carArray = carList
    if (carArray === null) {
        carArray = []

    } else {
        // // //New div to compilance cars add
        carArray.forEach((car, index) => {
            const carAddDiv = document.createElement("div");
            carAddDiv.setAttribute("class", "newItem")
            carListUI.appendChild(carAddDiv)

            const carCont = document.createElement("div");
            carCont.setAttribute("class", "carItem")
            carListUI.appendChild(carCont)

            const newName = document.createElement("h4");
            const newModel = document.createElement("h4");
            const cantDoors = document.createElement("h4");
            const colorCar = document.createElement("h4");
            const newBrand = document.createElement("h4");

            newName.innerText = `${car.car}`
            newModel.innerText = `${car.model}`
            cantDoors.innerText = `${car.doors}`
            colorCar.innerText = `${car.color}`
            newBrand.innerText = `${car.brand}`

            carCont.appendChild(newName)
            carCont.appendChild(newModel)
            carCont.appendChild(cantDoors)
            carCont.appendChild(colorCar)
            carCont.appendChild(newBrand)

            //create div button
            const buttonsAdd = document.createElement("div");
            buttonsAdd.setAttribute("class", "btn-edit")
            carAddDiv.appendChild(buttonsAdd)

            //create update button

            const updateBtn = document.createElement('button');

            updateBtn.setAttribute("class", "update");
            updateBtn.addEventListener("click", () => editCar(index, car));
            updateBtn.setAttribute("id", "update");
            updateBtn.innerText = "Edit"

            //create delete button
            const deleteBtn = document.createElement('button');

            deleteBtn.setAttribute("class", "update");
            deleteBtn.addEventListener("click", () => deleteCar(index))
            deleteBtn.setAttribute("id", "update");
            deleteBtn.innerHTML = "Delete"

            buttonsAdd.appendChild(updateBtn);
            buttonsAdd.appendChild(deleteBtn);
        });
    }
}

const updateCreateCar = (event) => {
    event.preventDefault()

    if (updateFlag) {
        let updateCar = {
            car: document.getElementById("carName").value,
            model: document.getElementById("Model").value,
            doors: document.getElementById("Doors").value,
            color: document.getElementById("Color").value,
            brand: document.getElementById("Brand").value,
        };

        carList[updateIndex] = updateCar

        updateFlag = false;
        updateIndex = null;
        renderList();
    } else {
        let car = {
            car: document.getElementById("carName").value,
            model: document.getElementById("Model").value,
            doors: document.getElementById("Doors").value,
            color: document.getElementById("Color").value,
            brand: document.getElementById("Brand").value
        }

        if(localCarList===null){
            localCarList=[]
        }
        carList.push(...localCarList,car)
        carStorage()
        renderList()
    }
    carForm.reset()
}

const editCar = (index, car) => {
    console.log(index)
    console.log(car)
    document.getElementById("carName").value = car.car
    document.getElementById("Model").value = car.model
    document.getElementById("Doors").value = car.doors
    document.getElementById("Color").value = car.color
    document.getElementById("Brand").value = car.brand
    updateFlag = true;
    updateIndex = index;
}

const deleteCar = index => {
    let deletCarStorage=JSON.parse(localStorage.getItem("carStorageArray"))
    carList= deletCarStorage;
    carList.splice(index,1)
    carStorage()
    renderList()
    console.log(carList)
}

carForm.addEventListener("submit", updateCreateCar)
document.addEventListener("DOMContentLoaded", renderList)