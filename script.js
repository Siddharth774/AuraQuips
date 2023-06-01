const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new-quote');
const loader=document.getElementById('loader');

// Show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden=true;
}

// Hide loading
function complete(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// get quote from api
async function getQuote(){
    loading();
    const proxyUrl="https://cors-anywhere.herokuapp.com/"
    const url="http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try{
        const response=await fetch(proxyUrl+url);
        const data=await response.json();
        // console.log(data);
        // If author is blank put Unknown
        if(data.quoteAuthor===' '){
            authorText.innerText='Unknown';
        }
        else{
            authorText.innerText=data.quoteAuthor;
        }
        // Reduce font sizr for quotes
        if(data.quoteText.length>50){
            quoteText.classList.add('long-quote');
        }
        else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText=data.quoteText;
        // Stop loader, Show Quote
        complete();
    }
    catch(error){
        getQuote();
        // console.log('Whoops, no quote',error);
    }
}


// tweet quote
function tweetQuote(){
    const quote=quoteText.innerText;
    const author=authorText.innerText;
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,'_blank');
}

// // Event listeners
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);

// on load
getQuote();


