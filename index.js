inputEl;//text id where the user type the url he want to save
savedElements;//ul id where we display the saved elements
saveBtn;//save btn id
resetBtn;//reset btn id
autoBtn;
myLinks=[];

if(JSON.parse(localStorage.getItem("myLinks")))
{
myLinks=JSON.parse(localStorage.getItem("myLinks"));//array where we save the user links
display();
}

autoBtn.addEventListener(
    "click",
    function()
    {
        chrome.tabs.query({active:true,currentWindow:true},function(tabs)
        {
            console.log(tabs[0].url);
            myLinks.push(tabs[0].url);
            localStorage.setItem("myLinks",JSON.stringify(myLinks));
            savedElements.innerHTML +=`<li><a href="${tabs[0].url}" target="_blank">${tabs[0].url}</a></li>`;
        }
        )
        
    }
)
/* ************************************************** */
resetBtn.addEventListener
("click",
    function()
    {
        localStorage.clear();
        myLinks=[];
        savedElements.innerHTML="";
    }
);

/* ************************************************** */
saveBtn.addEventListener//listener for the save btn which is == onclick (html) + ffunction (js)
("click",
    function()
    {
        myLinks.push(inputEl.value);
        localStorage.setItem("myLinks",JSON.stringify(myLinks));
        savedElements.innerHTML +=`<li><a href="${inputEl.value}" target="_blank">${inputEl.value}</a></li>`;
        inputEl.value="";
        
    }
); 

/* ************************************************** */

function display(){
for(i=0;i<myLinks.length;i++)//display the saved links
{
    savedElements.innerHTML +=
    `
    <li>
        <a href="${myLinks[i]}" target="_blank">
            ${myLinks[i]}
        </a>
    </li>
    `;
    /*
        Note : -
        innerHTML not a professoinal way to make elements on html instead we can use this code :
        **************************************
        let li= document.createElement("li")
        li.textContenet=myLinks[i]
        savedElements.append(li)
        **************************************
    */
    console.log(myLinks[i]);
}
}

/* ************************************************** 

//localStorage.setItem("name","mohab")//now we stored in chrome "mohab" with the key "name", it will be stored forever until we clear it 
//localStorage.getItem("name")//we will get "mohab"
//localStorage.clear()//now we cleared the storage and we cant get "mohab" any more 
 ************************************************** */
// everything saved in local storage is string so how to save array ?
/*
    myarray=["sdasdas","dsadas"]
    *we save it in storage by this way
    localstorage("myarray",JSON.stringfy(myarray))
    *and we get it from localstorge by this way
    myarray=JSON.pars(localstorage.getitem("myarray"));
*/
