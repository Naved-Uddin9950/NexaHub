const sidebar = document.querySelector('.content-container');
const tableHeading = document.getElementById('tableHeading');

const tableList = async () => {
    let res = await fetch('http://localhost:3000/api/collections');
    let text = await res.text();
    let json = await JSON.parse(text);
    let arr = json.collections;

    if(arr) {
        sidebar.innerHTML = '';
        for(let i=0; i<arr.length; i++) {
            sidebar.innerHTML += `
            <div class="p-2 capitalize table_list_item" id="${arr[i]}_table">${arr[i]}</div>
            `;
        }
    }

    for(let i=0; i<arr.length; i++) {
        const item = document.getElementById(`${arr[i]}_table`);
        // item.classList.remove('active');
        item.addEventListener('click', (e) => {
            e.preventDefault();
            // item.classList.add('active');
        });
    }
}

const table = async (name) => {
    tableHeading.innerText = `${name} collection`;
    
}

const collections = () => {
    tableList();
    table(2, 'testing');
}

export default collections;
