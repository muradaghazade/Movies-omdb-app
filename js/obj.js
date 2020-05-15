let url = 'http://omdbapi.com';
let api_key = 'b1378e2d';


let client = new OMDBClient(url, api_key);


document.querySelector(".button").addEventListener("click", function () {
    let keyword = document.querySelector(".input").value;
    client.search(keyword);
})

document.addEventListener('click', function(e) {
    if(e.target.className == 'plot') {
        alert(e.target.dataset.id);
    }
})

window.load = () => {
    /*document.querySelector(".plot").forEach(element => {
        element.addEventListener("click", (e)=> {
            alert(e.dataset.id);
        })
    })*/
}