const cars = document.querySelectorAll('.cars');

// получение и вывод названий машин из БД в формате HTML
function initTask1() {
    const ajax = new XMLHttpRequest();
    ajax.open('get', 'pdo-laba1/index.php?car=1');
    ajax.send();
    
    ajax.onload = function() {
        for(let car of cars) {
            car.innerHTML = ajax.response;
        }
    };
}
initTask1();

// Полученный доход с проката по состоянию на выбранную дату
function getPrice() {
    const ajax = new XMLHttpRequest();
    ajax.open('get', `pdo-laba1/tasks.php?car=${cars[0].value}`);
    ajax.send();
    ajax.onload = function() {
        const startDate = new Date(document.querySelector('.start-date').value);
        const endDate = new Date(document.querySelector('.end-date').value);
        const price = document.querySelector('.price');
        const priceRange = Math.ceil((endDate - startDate) / 1000 / 60 / 60 / 24 * ajax.response);
        price.innerHTML = `<p>Цена за сутки: ${ajax.response}$</p><p>Цена на выбранную дату: ${priceRange}$</p>`;
    };
}

// получение и вывод названий производителей из БД в формате XML
function initTask2() {
    const ajax = new XMLHttpRequest();
    ajax.open('get', 'pdo-laba1/index.php?vendor=1');
    ajax.send();
    
    ajax.onload = function() {
        const vendors = document.querySelector('.vendors');
        vendors.innerHTML = '';

        for(let item of ajax.responseXML.children[0].children){
            vendors.innerHTML += `<option>${item.textContent}</option>`;
        }
    }
}
initTask2();

// получение JSON и вывод машин по выбранному производителю в таблицу
function getCars() {
    const ajax = new XMLHttpRequest();
    const vendor = document.querySelector('.vendors');
    ajax.open('get', `pdo-laba1/tasks.php?vendor=${vendor.value}`);
    ajax.send();
    ajax.onload = function() {
        const table = document.querySelector('.table-vendors-cars');
        const ajaxResponse = JSON.parse(ajax.response);
        console.log(ajaxResponse);
        let rowHTML = '<tr>';
        for(let key in ajaxResponse[0]) {
            rowHTML += `<th>${key}</th>`;
        }
        table.innerHTML = rowHTML + '</tr>';

        for(let row of ajaxResponse) {
            rowHTML = '<tr>';
            for(let obj in row) {
                rowHTML += `<td>${row[obj]}</td>`;
            }
            table.innerHTML += rowHTML + '</tr>';
        }
    }
}

// получение JSON и вывод машин по выбранной дате в таблицу
function getFreeCars() {
    const ajax = new XMLHttpRequest();
    const freeCarsDate = document.querySelector('.free-cars-date');

    
    ajax.open('get', `pdo-laba1/tasks.php?freeCarsDate=${freeCarsDate.value}`);
    ajax.send();
    ajax.onload = function() {
        const table = document.querySelector('.table-date-car');
        const ajaxResponse = JSON.parse(ajax.response);
        
        let rowHTML = '<tr>';
        for(let key in ajaxResponse[0]) {
            rowHTML += `<th>${key}</th>`;
        }
        table.innerHTML = rowHTML + '</tr>';

        for(let row of ajaxResponse) {
            rowHTML = '<tr>';
            for(let obj in row) {
                rowHTML += `<td>${row[obj]}</td>`;
            }
            table.innerHTML += rowHTML + '</tr>';
        }
    }
}

// добавление в базу новой оренды машины
function postRent() {
    const car = cars[1];
    const startRentDate = document.querySelector('.start-rent-date');
    const startRentTime = document.querySelector('.start-rent-time');
    const endRentDate = document.querySelector('.end-rent-date');
    const endRentTime = document.querySelector('.end-rent-time');
    const cost = document.querySelector('.cost-rent');

    const ajax = new XMLHttpRequest();

    ajax.open('post', 'pdo-laba1/postRent.php');

    const body = JSON.stringify({
        'name': car.value,
        'startRentDate': startRentDate.value,
        'startRentTime': startRentTime.value,
        'endRentDate': endRentDate.value,
        'endRentTime': endRentTime.value,
        'cost': cost.value
    });
    ajax.send(body);
}

// изменение пробега выбранной машины в БД
function changeRace() {
    const car = cars[2];
    const inputChangeRace = document.querySelector('.input-change-race');

    const ajax = new XMLHttpRequest();

    ajax.open('post', 'pdo-laba1/postRace.php');

    const body = JSON.stringify({
        'name': car.value,
        'changeRace': inputChangeRace.value
    });
    ajax.send(body);
    ajax.onload = () => {
        console.log(ajax.response);
    }
}