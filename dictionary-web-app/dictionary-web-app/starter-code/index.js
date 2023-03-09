const font = document.getElementById('fonts');
const toggleSwitch = document.querySelector('input[type="checkbox"]');
const searched_word = document.getElementById('searchbar');
const dis_searched_item = document.getElementById('displaysearcheditems');
const noun_section= document.getElementById('noun-list');
const verb_section = document.getElementById('verb-list');
const synonyms = document.getElementById('synonyms');
const source_link = document.getElementById('sourcelink');
const select = document.getElementsByTagName('select')
const fonts = document.getElementById('fonts')
let apitranslation = [];
const phonetics = document.getElementById('phonetics');


//toggleSwitch.addEventListener('change', switchTheme);
//font.addEventListener('change', switchfont);

searched_word.addEventListener('change',main);
fonts.addEventListener('change',fontstyle);
//synonyms



function main(){

dis_searched_item.textContent = searched_word.value;
let word = searched_word.value;

gettranslation(word);
//fontstyle();

}

async function gettranslation(word){
let apiURL = 'https://api.dictionaryapi.dev/api/v2/entries/en/'+word;
console.log('apiURL:',apiURL);

const response = await fetch(apiURL)
try{
apitranslation = await response.json();
console.log(apitranslation);
}catch(error){
    console.log(error);
}
//console.log(response);
check();
add_noun();
add_verb();
sourcelink();
}

function check(){


    console.log(apitranslation[0]);
    console.log(apitranslation[0].meanings[0].definitions[0].definition);
    console.log(apitranslation[0].meanings[0].definitions.length)

}



function add_noun(){
   // let newlist_item =  document.createElement("li");
    // newlist_item.classList.add("element");   // element is a css class for styling the list item  
  
    for(let i=0; i<apitranslation[0].meanings[0].definitions.length; i++ ){
        let newlist_item =  document.createElement("li");
        noun_section.appendChild(newlist_item); 
        newlist_item.textContent = apitranslation[0].meanings[0].definitions[i].definition;
    }
    phonetics.textContent = apitranslation[0].phonetic;
    synonyms.textContent =':           '+  apitranslation[0].meanings[0].synonyms;
    
   
  
}

function add_verb(){
    for(let i=0; i<apitranslation[0].meanings[1].definitions.length; i++ ){
        let newlist_item =  document.createElement("li");
        verb_section.appendChild(newlist_item); 
        newlist_item.textContent = apitranslation[0].meanings[1].definitions[i].definition;
    } 
}


function sourcelink(){
    source_link.textContent= apitranslation[0].sourceUrls[0]
}
// console.log(apitranslation[0]);

//   keyboard

//apitranslation[0].sourceUrls[0]

function fontstyle(){
    if(select[0].value==='serif'){
        synonyms.textContent = 'cool';
        document.documentElement.setAttribute('data-themeone', 'serif');
    }
    if(select[0].value==='Mono'){
        synonyms.textContent = 'Mono';
        document.documentElement.setAttribute('data-themetwo', 'Mono');
    }

    if(select[0].value==='Sans serif'){
        synonyms.textContent = 'yes';
        document.documentElement.setAttribute('data-themethree', 'sans-serif');
    }
    console.log(select[0].value);
   // main();
}