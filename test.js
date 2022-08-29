const users = {
    Alan: {
      online: false
    },
    Jeff: {
      online: false
    },
    Sarah: {
      online: false
    }
  }
  
  function countOnline(usersObj) {
    // Only change code below this line
    let count = 0;
    for (let user in usersObj)
    {
      if(usersObj[user].online == true)
      {
        count++;
      }
    }
    return count;
    // Only change code above this line
  }
  
  console.log(countOnline(users));

  function reverseString(str) {
    let newStr = "";
    for(let i = str.length - 1; i >= 0; i--)
      newStr += str[i];
    return newStr;
  }
  
  console.log(reverseString("hello"));




  function truncateString(str, num) {
      let newStr;
    if(str.length > num)
    {
      newStr = str.substring(0, num) + "...";
    }
    return newStr;
  }
  
  truncateString("A-tisket a-tasket A green and yellow basket", 8);





  function titleCase(str) {
    let words = str.split(" ");
    let newWords = [];
    for(let i = 0; i < words.length; i++) {
      let word = words[i];
      let newWord = "";
      for(let j = 0; j < word.length; j++) {
        if(j == 0)
          newWord += word[0].toUpperCase();
        else
          newWord += word[j].toLowerCase();
      }
      newWords.push(newWord);
    }
    return newWords.join(" ");
  }
  
  console.log(titleCase("I'm a liTtle tea pot"));



  function frankenSplice(arr1, arr2, n) {
    let newArr = arr2.slice();
    newArr.splice(n, 0, ...arr1);
    return newArr;
  }
  
  
  console.log(frankenSplice([1, 2, 3], [4, 5, 6], 1));