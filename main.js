var NebPay = require("nebpay");
var md5 = require('md5');
var nebPay = new NebPay();    
var serialNumber; //交易序列号
var intervalQuery; //定时查询交易结果
/*
//点击按钮发起交易, 这里为调用智能合约的例子
function onButtonClick() {        
    var to = "n1e5ijJf3MpLCz7zUherUvuZcLPSHP57UYX";   //Dapp的合约地址
    var value = "0";
    var callFunction = "query" //调用的函数名称
    var callArgs =  JSON.stringify(["苏德矿"]);  //参数格式为参数数组的JSON字符串, 比如'["arg"]','["arg1","arg2]'        
    

    //发送交易(发起智能合约调用)
    serialNumber = nebPay.call(to, value, callFunction, callArgs, null);

    //设置定时查询交易结果
    intervalQuery = setInterval(function() {
        funcIntervalQuery();
    }, 10000); //建议查询频率10-15s,因为星云链出块时间为15s,并且查询服务器限制每分钟最多查询10次。
}

//查询交易结果. queryPayInfo返回的是一个Promise对象.
function funcIntervalQuery() {   
    //queryPayInfo的options参数用来指定查询交易的服务器地址,(如果是主网可以忽略,因为默认服务器是在主网查询)
    nebPay.queryPayInfo(serialNumber, options)   //search transaction result from server (result upload to server by app)
        .then(function (resp) {
            console.log("tx result: " + resp)   //resp is a JSON string
            var respObject = JSON.parse(resp)
            //code==0交易发送成功, status==1交易已被打包上链
            if(respObject.code === 0 && respObject.data.status === 1){                    
                //交易成功,处理后续任务....
                clearInterval(intervalQuery)    //清除定时查询
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}
*/


window.AddComment = async function(){
    var target = document.getElementById("realname").innerHTML;
    if(target == "N/A") {
        alert("No teacher was selected");
        return false;
    }
   
    var comment = document.getElementById("comments").value;
    var cHash = md5(target+comment);
    console.log("chash="+cHash);
    var score = parseInt(document.getElementById("score").value);
    var to = "n1e5ijJf3MpLCz7zUherUvuZcLPSHP57UYX";
    var value = 0;
    var callFunction = "comment";
    var infor = {
        name: target,
        comment: comment,
        hash: cHash,
        score: score
    }
    var inforArray = [infor];
    var callArgs =  JSON.stringify(inforArray);
    serialNumber = nebPay.call(to, value, callFunction, callArgs, {
        qrcode: {
           showQRCode: true
        },
    });
    var url = "http://47.100.192.19/updateComment.php";
    var headers = new Headers();
    headers.append("Content-Type","application/x-www-form-urlencoded");
    var body = `id=${cHash}&status=0`;
    console.log("body="+body);
    await fetch(url,{method:"POST",headers,body});
    return false;
}


window.OnButtonClick= function() {
    // var to = "n1e5ijJf3MpLCz7zUherUvuZcLPSHP57UYX";
    // var value = 0;
    // var callFunction = "query";
    // var callArgs =  JSON.stringify(["苏德矿"]);
    // serialNumber = nebPay.call(to, value, callFunction, callArgs, {
    //     qrcode: {
    //         showQRCode: true
    //     },
    //     listener: listener  //set listener for extension transaction result
    // });
    var keyWord = document.getElementById("keyword");
    var a = [keyWord];
    const url = "https://mainnet.nebulas.io/v1/user/call";
    const headers = { "Content-Type": "application/json" };
    const body = JSON.stringify({

        "from": "n1bz1jRkWC37Ka2xZY3zQhhLn3C5PfYpG9p",
        "to": "n1e5ijJf3MpLCz7zUherUvuZcLPSHP57UYX",
        "value": "0",
        "nonce": 0,
        "gasPrice": "1000000",
        "gasLimit": "2000000",
        "contract": {
            "function": "query", "args": JSON.stringify(["苏德矿"])

        }
    });
    fetch(url, { method: "POST", headers, body })  
    .then(function (response){
        if (response.status == 200){
            return response;
        }
    })
    .then(function (d) {
      return d.json();
    })
    .then(function(data){
        console.log(data);
    })
    
}


function listener(resp) {
    console.log("resp: " + JSON.stringify(resp))
}





window.SearchTeacher = async function() {
    $("#sear").attr("disabled",true);
    $("#sear").html("查询中...");
    var keyWord = document.getElementById("keyword").value;
    var a = [keyWord];
    const url = "https://mainnet.nebulas.io/v1/user/call";
    var headers =new Headers();
    headers.append("Content-Type","application/x-www-form-urlencoded");
    var body = JSON.stringify({

        "from": "n1bz1jRkWC37Ka2xZY3zQhhLn3C5PfYpG9p",
        "to": "n1e5ijJf3MpLCz7zUherUvuZcLPSHP57UYX",
        "value": "0",
        "nonce": 0,
        "gasPrice": "1000000",
        "gasLimit": "2000000",
        "contract": {
            "function": "query", "args": JSON.stringify(a)

        }
    });
    const response = await fetch(url, { method: "POST", headers, body })  
  
        if (response.status == 200){
            $("#sear").removeAttr("disabled");
            $("#sear").html("搜索");
        }
        if(response.status == 400){
           
        }
  
 
    const data = await response.json();
        try{
        if(data.result.result == 'Error: No data registered before.'){
            throw "查无此人！";
        }
        else{
            var url_2 = 'http://47.100.192.19/selectComment.php';
            console.log(JSON.parse(data.result.result));
            var result = JSON.parse(data.result.result);
            var courses = JSON.parse(result.courses);
            document.getElementById("name").innerHTML = '<div id="realname">' + result.name + "</div><br/>" + "" + result.score.toFixed(2).toString();
            document.getElementById("college").innerHTML = result.college; 
            var coursesHTML = "";
            for(var i = 0; i < courses.length; i++)
                coursesHTML += ('<li class="list-group-item" align="justify">'+courses[i]+'</li>');
            document.getElementById("courses").innerHTML = coursesHTML; 
            document.getElementById("ExistComments").innerHTML = "";
            var hashTable = [];
            var ids = ''
            for(var i = 0; i < result.comments.length; i++){
                hashTable.push(result.comments[i].hash);
                ids+=result.comments[i].hash;
                if(i!==result.comments.length-1){
                    ids+="#";
                }
            }
            var headers = new Headers();
            headers.append("Content-Type","application/x-www-form-urlencoded");
             body = `idString=${ids}`;
            console.log(body);
            const response_2 = await fetch(url_2,{method:"POST",headers,body});
            try{
            var data_1 = await response_2.json();
            console.log(data_1);
            }
            catch(e){
            }
            var like = new Array();
            for(var i = 0 ; i < result.comments.length; i++){
                if(data_1[i] == null) like.push(0);
                else{
                    like.push(data_1[i]);
                }
            }
            //like = data_1;
            for(var i = 0 ; i < result.comments.length; i++){
                var comment = result.comments[i].comment;
                localStorage.setItem(keyWord+ '_' + i, result.comments[i].hash);
                document.getElementById("ExistComments").innerHTML += ('<div class="jumbotron">\
                <div class="col-md-12 col-sm-6 wow fadeInUp animated" data-wow-duration="300ms" data-wow-delay="100ms" style="visibility: visible; animation-duration: 300ms; animation-delay: 100ms; animation-name: fadeInUp;">\
                        <div class="media service-box">\
                            <div class="pull-left">\
                                <i class="fa fa-compass"></i>\
                            </div>\
                            <div class="media-body">\
                                <h4 class="media-heading">Upvoke '+like[i]+'</h4>\
                                <p>'+comment+'</div>\
                                </div>\
                        </div>\
                        <a class="btn btn-link-2 launch-modal" data-modal-id="modal-register" id = "pos' + i + '" onclick="good(' + i + ')">赞同</a>\
                        <a class="btn btn-link-2 launch-modal" data-modal-id="modal-register" id = "neg' + i + '" onclick="fuck(' + i + ')">反对</a>\
                    </div>');
            }
        }


    }
    catch(err){
        alert(err);
    }
        
;
}

window.good = async function(num){
    const url = 'http://47.100.192.19/updateComment.php';
    const headers = new Headers();
    headers.append("Content-Type","application/x-www-form-urlencoded");
    var key = document.getElementById("realname").innerHTML;
    key += ('_' + num);
    var hash = localStorage.getItem(key); 
    const body = `id=${hash}&status=1`;
    const response = await fetch(url,{method:"POST",headers,body});
    const data = await response.text();
}

window.fuck = async function(num){
    const url = 'http://47.100.192.19/updateComment.php';
    const headers = new Headers();
    headers.append("Content-Type","application/x-www-form-urlencoded");
    var key = document.getElementById("realname").innerHTML;
    key += ('_' + num);
    var hash = localStorage.getItem(key); 
    const body = `id=${hash}&status=-1`;
    const response = await fetch(url,{method:"POST",headers,body});
    const data = await response.text();
}

async function GetCurrentLike(){

}
