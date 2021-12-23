
const gifBtn = document.querySelector(".gifBtn"); 
const inputGif = document.getElementById('inputGif');
const searchGifBtn = document.getElementById('searchGifBtn');
const spinner = document.querySelector(".spinner");
const noDataMsg = document.getElementById('no-data-msg');
const postBtn = document.querySelector('.postBtn');
let posted='',postNo=1;
let count=1;

gifBtn.addEventListener("click", () => {

    if(count%2==0)
    {
    inputGif.style.opacity=0;
    count++;
    return;
    }
    inputGif.style.opacity=1;
    count++;
});
searchGifBtn.addEventListener('click',()=>{
    
    let textValue = document.getElementById("searchGif").value;
    let textValueArr = textValue.split(" ");
    let textValueArg = textValueArr.join("");
    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `https://api.giphy.com/v1/gifs/search?api_key=nqUouQMN7L7WjRVljTsq30NH2r8ZKonj&q=${textValueArg}&limit=5`,
      true
    );
    xhr.onload = function () {
      let responseData = JSON.parse(this.responseText);
        if(responseData.data.length==0){
            spinner.classList.remove('loader');
            noDataMsg.style.opacity=1;
        }
      
        // console.log(responseData);
        document.querySelector(".row").innerHTML=null;
        let img='';
        spinner.classList.remove('loader');
        document.querySelector(".row").style.display='block';
      responseData.data.forEach((element) => {
        let gifImgURL = element.images.original.url;
         img += ` <div class="column">
        <img src=${gifImgURL} class="gifs" alt=${textValue}>
      </div>`;
        document.querySelector(".row").innerHTML=img;
      });
      document.querySelector(".row").addEventListener('click',(e)=>{
        if(document.querySelector('.gifsPost').src!==null){
          document.querySelector('.gifsPost').src=null;
        }
        document.querySelector('.gifsPost').src=e.target.currentSrc;
        document.querySelector('.gifsPost').style.opacity=1;
        inputGif.style.opacity=0;
        // console.log(e.target.currentSrc);
      })
    };
    spinner.classList.add("loader");
    xhr.send();
    document.getElementById("searchGif").value='';
    // console.log(textValueArg);
  })
  function inputChanged(){
    document.querySelector(".row").innerHTML=null;
    noDataMsg.style.opacity=0;
  }

  postBtn.addEventListener('click',()=>{
    document.querySelector(".row").style.display='none';
    let imgToPost =document.querySelector('.gifsPost');
    let postText = document.getElementById('postText').value;
    // console.log(postText);
     posted +=`<div class="card2">
    <div class="container2">
        <p><b>${postNo}.</b> ${postText}</p> 
       </div>
       <img class="imgToPost" src=${imgToPost.src} >
 </div>`
    document.querySelector('.post').innerHTML=posted;
    postText='hi';
    document.getElementById('postText').innerHTML='';
    imgToPost.style.opacity=0;
    postNo++;
  })
