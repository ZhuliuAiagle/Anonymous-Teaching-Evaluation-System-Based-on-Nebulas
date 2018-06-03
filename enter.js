(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){




async function GetVerify (){
    $("#verify").attr("disabled",true);
    $("#verify").html("请等待1min再试");
    var phone = document.getElementById("PhoneNumber").value;
    var address = document.getElementById("address").value;
    const url = 'http://47.100.192.19/message.php';
    const headers = new Headers();
    headers.append("Content-Type","application/x-www-form-urlencoded");
    const body = `mobile=${phone}&address=${address}`;
    const response = await fetch(url,{method:"POST",headers,body});
    const data = await response.text();
    setTimeout('refresh()',60000);
}

function refresh(){
    $("#verify").removeAttr("disabled");
    $("#verify").html("获取验证码");
}

window.register  = async function(){
    var phone = document.getElementById("PhoneNumber").value;
    var address = document.getElementById("address").value;
    var very = document.getElementById("very").value;
    const url = 'http://47.100.192.19/register.php';
    const headers = new Headers();
    headers.append("Content-Type","application/x-www-form-urlencoded");
    const body = `mobile=${phone}&address=${address}&userNumber=${very}`;
    const response = await fetch(url,{method:"POST",headers,body});
    const data = await response.text();
    console.log(data);
}
},{}]},{},[1]);
