var app = angular.module('myApp',[]);
app.controller('myCtrl',function($scope){
    //document.getElementById("radio4").checked = true;  
    $scope.setterFun = function(){
        // Example usage
    $scope.simple = false;
    let n = 3;
    //$scope.level = n;
    if($scope.level)
    {
        n = $scope.level;
    }
    $scope.level = n+"";    
    $scope.n = n;
    $scope.elen = 100;
    let eleLen = 100;    
    if (n > 2){
        eleLen = Math.floor(350/n);
        console.log("Original List:", eleLen);
        //boxLen = eleLen*n;
    }
    $scope.elen = eleLen;
    var parent = document.getElementById("parent");
    parent.style.width = n*eleLen + 'px';
    parent.style.height = n*eleLen + 'px';
    const grid = n*n - 1;
    $scope.grid = grid;
    const myList = [];
    for (let i = 0 ; i < grid ; i++){
        myList.push(i);
    }
    //const myList = [0, 1, 2, 3, 4, 5, 6, 7];
    console.log("Original List:", myList);
    
    const shuffledList = shuffleArray1(myList);
    console.log("Shuffled List:", shuffledList);

    $scope.myobj = [{x:0,y:0,v:1},{x:100,y:100,v:2}];
    const a = [];
    for(var i = 0; i < n; i++){
    for(var j= 0; j <n; j++){
        if(!(i == (n-1) && j == (n-1)))
        a.push({x:eleLen*j,y:eleLen*i,v:n*i+j});
    }    
    
    }
    const b = [];
    for(var p = 0; p < grid;p++ ){
    let temVar = a[shuffledList[p]];
    b.push({x:temVar.x,y:temVar.y,v:p});
    }
    $scope.myobj = b;
    $scope.flag = false;
    $scope.empty = {x:eleLen*(n-1),y:eleLen*(n-1)};

    }   
    
    $scope.fun = function (i,$event){
    const ele = $event.target;
    let currentTop = parseInt(window.getComputedStyle(ele).top);
    let currentLeft = parseInt(window.getComputedStyle(ele).left);
    let emptyTop = $scope.empty.y;
    let emptyLeft = $scope.empty.x;
    let d = (currentTop-emptyTop)*(currentTop-emptyTop) + (currentLeft - emptyLeft)*(currentLeft - emptyLeft);
    if (d <= $scope.elen*$scope.elen || $scope.simple){
        ele.style.top = $scope.empty.y + 'px';
        ele.style.left = $scope.empty.x + 'px';        
        $scope.empty.y = currentTop;
        $scope.empty.x = currentLeft;
        $scope.myobj[i].y = emptyTop;
        $scope.myobj[i].x = emptyLeft;
    }
    let flag = 1;
    for(var k = 0; k< $scope.grid; k++){
        let curVal = 1*$scope.myobj[k].x + $scope.n*$scope.myobj[k].y;
        if (curVal == $scope.elen*k){
        flag = flag*1;
        }else{
        flag = flag*0;
        }
    }
    if (flag == 1){
        $scope.flag = true;
        $scope.flag2 = true;
        animateWin();
    }
    console.log($scope.empty.x,$scope.empty.y);        
    };

    $scope.simplifyClicked = function(){
        if ($scope.simple == true){
            $scope.simple = false;
        }
        else{
            $scope.simple = true;
        }
    }

    $scope.setterFun();   
    
    
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // Generate a random index between 0 and i
        const randomIndex = Math.floor(Math.random() * (i + 1));
        
        // Swap elements at index i and randomIndex
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
}

function isSolvable(arr){
    let len = arr.length;
    let count = 0;
    for (let i = 0; i < len ; i++){
        for (let j = i+1; j < len ; j++){
            if (arr[i] > arr[j]){
                count = count + 1;
            }
        }
    }
    return count % 2 == 0;
}    

function shuffleArray1(array){
    arr = shuffleArray(array);
    while (!isSolvable(arr)){
        console.log("loop array : ", arr);
        arr = shuffleArray(arr);
    }
    return arr;
}

function animateWin() {
    gsap.from("#win-text", {
        opacity: 0,
        y: -100,
        duration: 1,
        ease: "bounce"
    });
}  

function helpClicked(){
    var a = document.getElementById("parHelp");    
    if (a.style.display=="block"){
        a.style.display="none";
    }
    else{
        a.style.display="block";
    }
}

