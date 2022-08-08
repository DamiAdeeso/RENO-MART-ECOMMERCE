let maxNumber = 0;
no = 3;
let temp = 0

let array = [2,5,7,8,9,0,4,3,4,6,7,8,9]

for (let i= 0;i<array.length-no;i++){
    for(let j = 0;j<no;j++){
        
    temp += array[i+j];

    }
    if (temp >maxNumber){
        maxNumber=temp;
    }
    
    temp = 0;
}


// function maxSum(arr,n){
//     if(n > arr.length){
//         return null
//     }
//     let temp = 0
//     let max = 0

//     for(i=0; i<n; i++){
//         max += arr[i]
//     }
//     temp = max;
//     for(i=n; i<arr.length; i++){
//         temp = temp - arr[i-n] + arr[i]
//         max = Math.max(max,temp)
//     }return max
// }

firstStr = "fghtuydixfebdbcc"
secondStr = "hfu"
let output = []
tempArr = []
firstStr = firstStr.split("")
secondStr = secondStr.split("")

for(let i = 0 ; i<firstArr.length; i++){
    for(let j = 0;j<secondStr.lenght;j++){
        if(firstStr[i] == secondStr[j] ){
            tempArray.append(firstStr[i])
        }
    }
    
    for(let k = 0 ;k<secondStr.length;k++){
        let isPresent = false;
        for(let l = 0;l<tempArr;l++){
            if(secondStr[k]== tempArr[l] ){
                isPresent = true;
            }
            if(!isPresent){
                break; 
            }
        }
    }
}
