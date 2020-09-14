const search=document.querySelector(".search");
const input=document.querySelector("input");
search.addEventListener("click",function(e){
    e.preventDefault();
    populateUI(input.value);
    console.log("rrquest send");
})

async function populateUI(id){
    let {data}=await axios.get('api/users/${id}');
    console.log(data);
}