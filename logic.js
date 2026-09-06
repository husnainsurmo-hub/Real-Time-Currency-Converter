const base_url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdown=document.querySelectorAll(".dropdown select");
const button=document.getElementById("button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select of dropdown){
    for(let currcode in countryList){
    let newoption=document.createElement("option");
    newoption.innerText=currcode;
    newoption.value=currcode;
    if(select.name==="from" && currcode==="USD"){
        newoption.selected="selected";
    }else if(select.name==="to" && currcode==="PKR"){
        newoption.selected="selected";
    }
    select.append(newoption);
}
select.addEventListener("change",(evt)=>{
    updateflag(evt.target);
})
}

const updateflag=(element)=>{
    let currCode=element.value;
    let countrycode=countryList[currCode];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
}

button.addEventListener("click",async (evt)=>{
evt.preventDefault();
let amount=document.getElementById("inputsec");
let amountval=amount.value;
if(amountval==="" || amountval<1){
    amountval=1;
    amount.value="1";
}
 const from = fromCurr.value.toLowerCase();
 const to = toCurr.value.toLowerCase();
 const url=`${base_url}/${from}.json`;

 let response=await fetch(url);
 let data=await response.json();

 let rate = data[from][to];
 let finalAmount = (amountval * rate).toFixed(2);
 msg.innerText = `${amountval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
 
})





