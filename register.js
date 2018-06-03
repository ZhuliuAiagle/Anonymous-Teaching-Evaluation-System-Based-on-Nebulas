



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