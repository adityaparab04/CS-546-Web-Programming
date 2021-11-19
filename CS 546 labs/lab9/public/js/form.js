let palindromeChecker = document.getElementById("palindromeChecker")
let attemptlist = document.getElementById("attempts")
let inputPhrase = document.getElementById("inputPhrase")

palindromeChecker.addEventListener('submit', (event) => {
    event.preventDefault()
    if(inputPhrase.value.toLowerCase().replace(/[^0-9a-z]/g, "").length === 0){
        alert("Please enter the alphanumeric phrase.");
        palindromeChecker.reset();
        inputPhrase.focus();
    }
    else{
        let listTag = document.createElement("li");
        listTag.innerHTML = inputPhrase.value;
        
        if(checkPalindrome(inputPhrase.value) === true){
            listTag.className = "is-palindrome";
        }
        else{
            listTag.className = "not-palindrome";
        }
        attemptlist.appendChild(listTag);
        palindromeChecker.reset();
        inputPhrase.focus();
    }   
});

function checkPalindrome(phrase) {
    if(!phrase || typeof phrase !== 'string' || !phrase.replace(/\s/g, "").length){
        throw `Enter a valid phrase`
    }
    if(typeof phrase !== 'string' || !phrase.replace(/\s/g, "").length){
        throw `Enter a valid phrase`
    }
    if(!phrase.replace(/\s/g, "").length){
        throw `Enter a valid phrase`
    }
    //convert the string to lowercase
    phrase = phrase.toLowerCase();
    
    //eliminate the special characters and spaces
    phrase = phrase.replace(/[^0-9a-z]/g, "");

    // reverse text and compare
    let newPhrase = phrase.split('').reverse().join('');
    if(newPhrase === phrase){
        return true;
    }else{
        return false;
    }
}
