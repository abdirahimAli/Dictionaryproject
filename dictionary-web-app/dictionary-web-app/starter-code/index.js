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
const sections = document.getElementById('show')
const sections1 = document.getElementById('show1')
const sourcelink_p = document.getElementById('sourcelink_p')
const playsound = document.getElementById('fa-play')
const synonym_text = document.getElementById('synonym-text');



// VARRIBLES //
let response = 0;







function main(){
    if(searched_word.value!=dis_searched_item.textContent){
         reset();
    }

dis_searched_item.textContent = searched_word.value;
let word = searched_word.value;

gettranslation(word);

}



async function gettranslation(word){
let apiURL = 'https://api.dictionaryapi.dev/api/v2/entries/en/'+word;


try{
 response = await fetch(apiURL);
console.log('response',response);
apitranslation = await response.json();
console.log('apitranslation',apitranslation);
Error_Check(response);
NOerror_Check(response);
}

catch(error){

}

if(apitranslation.title!='No Definitions Found'){

    checkforverb();
}



function checkforverb(){

if(apitranslation[0].meanings.length===1){
    sections1.style.display="none"; // hide verb sectio //
    add_noun();
    sourcelink();
}else{
    add_noun();
    add_verb();
    sourcelink();
}

}

}
////// error check block /////////
function Error_Check(response){
    if (response.ok===false){
    dis_searched_item.textContent= 'SORRY unregonized input';
    sections.style.display="none";
    sections1.style.display="none";
    sourcelink_p.style.display="none";
    playsound.style.display="none";
    phonetics.textContent = '';
    synonyms.innerHTML ='';
   // dis_searched_item.textContent = '';
    }
}

function NOerror_Check(response){
    if (response.ok===true){
    sections.style.display="block";
    sections1.style.display="block";
    sourcelink_p.style.display="block";
    playsound.style.display="block";

    }
    if(apitranslation[0].phonetics.length===0){
        playsound.style.display="none";
    }
    
}
////////////////////////////////////


function add_noun(){

    for(let i=0; i<apitranslation[0].meanings[0].definitions.length; i++ ){
        let newlist_item =  document.createElement("li");
        noun_section.appendChild(newlist_item); 
        newlist_item.textContent = apitranslation[0].meanings[0].definitions[i].definition;
    }
    phonetics.textContent = apitranslation[0].phonetic;

    if(apitranslation[0].meanings[0].synonyms.length==0){
        synonyms.innerHTML='';
        // synonym_text.textContent='';
    }
    synonyms.textContent =':           '+  apitranslation[0].meanings[0].synonyms;
    
   
  
}
function add_verb(){

    for(let i=0; i<apitranslation[0].meanings[1].definitions.length; i++ ){
        let newlist_item =  document.createElement("li");
        verb_section.appendChild(newlist_item); 
        newlist_item.textContent = apitranslation[0].meanings[1].definitions[i].definition;
    } 
}
//audio//
function audio(){
    
    for(let i=0; i<apitranslation[0].phonetics.length; i++){
        if(apitranslation[0].phonetics[i].audio==''){
          //  playsound.style.display="none";
           }else{var audio =  new Audio(apitranslation[0].phonetics[i].audio);
            audio.loop = false;
            audio.play(); 
            break}
    }
    
   
    
}
// source link //
function sourcelink(){
    source_link.textContent= apitranslation[0].sourceUrls[0]
}
// fontstyle //
function fontstyle(){
    if(select[0].value==='serif'){
       // synonyms.textContent = 'cool';
        document.documentElement.setAttribute('switch-fonts', 'serif');
    }
    if(select[0].value==='Mono'){
       
        document.documentElement.setAttribute('switch-fonts', 'Mono');
    }

    if(select[0].value==='Sans serif'){
        
        document.documentElement.setAttribute('switch-fonts', 'sans-serif');
    }
    console.log(select[0].value);
}


//switchTheme//

function switchTheme(event) {
    
    if (event.target.checked) {
      document.documentElement.setAttribute('mode-dark', 'dark');
      document.documentElement.setAttribute('switch-searchbarcolor', 'dark');
     
    } else {
      document.documentElement.setAttribute('mode-dark', 'light');
      document.documentElement.setAttribute('switch-searchbarcolor', 'light');
     }
     }
function reset(){
    noun_section.innerHTML=''; 
    verb_section.innerHTML='';
    source_link.innerHTML='';
    synonyms.innerHTML='';
   // synonym_text.innerHTML='';
}     

/// Event listener  ///
searched_word.addEventListener('change',()=>{
    main();  })
toggleSwitch.addEventListener('change', switchTheme);
playsound.addEventListener('click',audio);
fonts.addEventListener('change',fontstyle);