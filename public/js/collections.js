const sidebar = document.querySelector('.content-container');
const tableHeading = document.getElementById('tableHeading');

const tableList = async () => {
    let res = await fetch('http://localhost:3000/api/collections');
    let text = await res.text();
    let json = await JSON.parse(text);
    let arr = json.collections;

    if (arr) {
        sidebar.innerHTML = '';
        for (let i = 0; i < arr.length; i++) {
            sidebar.innerHTML += `
            <div class="p-2 capitalize table_list_item" id="${arr[i]}_table">${arr[i]}</div>
            `;
        }
    }

    for (let i = 0; i < arr.length; i++) {
        const item = document.getElementById(`${arr[i]}_table`);
        // item.classList.remove('active');
        item.addEventListener('click', (e) => {
            e.preventDefault();
            // item.classList.add('active');
            getCollection(arr[i]);
        });
    }
}

const getCollection = async (name) => {
    tableHeading.innerText = `${name} collection`;
    let res = await fetch(`http://localhost:3000/api/collection/${name}`);
    let text = await res.text();
    let json = await JSON.parse(text);
    let arr = json;

    const collectionHead = document.getElementById('collection_thead');
    const collectionBody = document.getElementById('collection_tbody');

    collectionHead.innerHTML = `
        <tr>
            <th scope="col">Sr. No.</th>
            <th scope="col">Column Name</th>
            <th scope="col">Type</th>
            <th scope="col">Is Null</th>
            <th scope="col">Default</th>
            <th scope="col">Extra</th>
        </tr>
    `;

    collectionBody.innerHTML = ''; // Clear the body before populating

    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        collectionBody.innerHTML += `
            <tr>
                <td>${ i + 1 }</td>
                <td>${item.column_name}</td>
                <td>${item.type}</td>
                <td>${item.is_null}</td>
                <td>${item.default}</td>
                <td>${item.extra}</td>
            </tr>
        `;
    }
};


const collections = () => {
    tableList();
}

export default collections;
