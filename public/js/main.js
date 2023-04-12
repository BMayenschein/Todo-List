let items = document.querySelectorAll('.item');
let trashCans = document.querySelectorAll('.fa-trash');

items.forEach(item => item.addEventListener('click', updateCompleted));

async function updateCompleted(e) {
    console.log(e.target.textContent);
    let item = e.target.textContent;
    try{
        const res = await fetch('setComplete', {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify( {'item': item} )
        })
        const data = await res.json();
        console.log(data);
        location.reload();
    }
    catch(err) {
        console.log(err);
    }
}

trashCans.forEach(trashCan => trashCan.addEventListener('click', removeItem));

async function removeItem(e) {
    console.log(e.target);
}