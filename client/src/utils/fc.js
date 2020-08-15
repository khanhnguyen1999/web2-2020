export const dateTimeToDate= (today1,species)=>
{
    const today = new Date(today1)
    var sc = String(today.getSeconds()).padStart(2, '0');
    var m  = String(today.getMinutes()).padStart(2, '0');
    var h  = String(today.getHours()).padStart(2, '0');
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    var date = dd + '/' + mm + '/' + yyyy;
    var datetime = dd + '/' + mm + '/' + yyyy +"   "+h+":"+m+":"+sc;
    if(species==0)
    {
        return date;
    }
    if(species==1)
    {
        return datetime;
    }
    if(species===2){
        return yyyy+'-'+mm+'-'+dd
    }
    return datetime;
}

export const inWords = (num)=> {
    var a = ['','Một ','Hai ','Ba ','Bốn ', 'Năm ','Sáu ','Bảy ','Tám ','Chín ','Mười ','Mười Một ','Mười Hai ','Mười Ba ','Mười Bốn ','Mười Lăm ','Mười sáu ','Mười Bảy ','Mười Tám ','Mười Chín '];
    var b = ['', '', 'Hai Mươi','Ba Mươi','Bốn Mươi','Năm Mươi', 'Sáu Mươi','Bảy Mươi','Tám Mươi','Chín Mươi'];
    if ((num = num.toString()).length > 9) return 'overflow';
    var n = ('000000000' + num).substr(-9).match(/^(\d{1})(\d{2})(\d{1})(\d{2})(\d{1})(\d{2})$/);
    console.log(n)
    if (!n) return; var str = '';
    
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Trăm ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Triệu ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[2][0]] + ' ' + a[n[3][1]]) + 'Trăm ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[3][0]] + ' ' + a[n[4][1]]) + 'Nghìn ' : '';
    str += (n[5] != 0) ? (a[Number(n[5])] || b[n[4][0]] + ' ' + a[n[5][1]]) + 'Trăm ' : '';
    str += (n[6] != 0) ? ((str != '') ? '' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'Đồng' : '';
    return str;
}

export const inMoney = (num) => {
    var rs = String(num);
    const formatter = new Intl.NumberFormat('de-DE', {
        currency: 'VND',
        minimumFractionDigits: 0
    })
    rs = formatter.format(rs)
    return rs;
}

export const inEmail=(email)=>{
    if(email)
    {
        var lengthEmail = email.length;
        const newEmail = email.substring(0,6)+"****"+ email.substring(lengthEmail-11,lengthEmail)
        return newEmail;
    }
    else
    {
        return '';
    }
    
}


export const checkStatus = (status)=>{
    var message = "";
    if(status==="PENDING")
    {
        message = "Vui lòng cho xac thuc";
    }
    if(status==="LOCKED")
    {
        message = "Tai khoan dang bi khoa";
    }
    if(status==="UNVERIFIED")
    {
        message = "Tai khoan tai chua xac thuc";
    }
    return message;
}
