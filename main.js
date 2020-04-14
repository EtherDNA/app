let maxheight=window.screen.height;
let maxwidth=window.screen.width;
var password;
var amount=0.01;
var registerhash="0x";
var withdrawhash;
var address;
console.log(44);
function perc(n,p) {
  return (n/100)*p;
}




function SHA256(s){
 var chrsz  = 8;
 var hexcase = 0;
 function safe_add (x, y) {
 var lsw = (x & 0xFFFF) + (y & 0xFFFF);
 var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
 return (msw << 16) | (lsw & 0xFFFF);
 }
 function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
 function R (X, n) { return ( X >>> n ); }
 function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
 function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
 function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
 function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
 function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
 function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }
 function core_sha256 (m, l) {
 var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
 var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
 var W = new Array(64);
 var a, b, c, d, e, f, g, h, i, j;
 var T1, T2;
 m[l >> 5] |= 0x80 << (24 - l % 32);
 m[((l + 64 >> 9) << 4) + 15] = l;
 for ( var i = 0; i<m.length; i+=16 ) {
 a = HASH[0];
 b = HASH[1];
 c = HASH[2];
 d = HASH[3];
 e = HASH[4];
 f = HASH[5];
 g = HASH[6];
 h = HASH[7];
 for ( var j = 0; j<64; j++) {
 if (j < 16) W[j] = m[j + i];
 else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
 T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
 T2 = safe_add(Sigma0256(a), Maj(a, b, c));
 h = g;
 g = f;
 f = e;
 e = safe_add(d, T1);
 d = c;
 c = b;
 b = a;
 a = safe_add(T1, T2);
 }
 HASH[0] = safe_add(a, HASH[0]);
 HASH[1] = safe_add(b, HASH[1]);
 HASH[2] = safe_add(c, HASH[2]);
 HASH[3] = safe_add(d, HASH[3]);
 HASH[4] = safe_add(e, HASH[4]);
 HASH[5] = safe_add(f, HASH[5]);
 HASH[6] = safe_add(g, HASH[6]);
 HASH[7] = safe_add(h, HASH[7]);
 }
 return HASH;
 }
 function str2binb (str) {
 var bin = Array();
 var mask = (1 << chrsz) - 1;
 for(var i = 0; i < str.length * chrsz; i += chrsz) {
 bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);
 }
 return bin;
 }
 function Utf8Encode(string) {
 string = string.replace(/\r\n/g,"\n");
 var utftext = "";
 for (var n = 0; n < string.length; n++) {
 var c = string.charCodeAt(n);
 if (c < 128) {
 utftext += String.fromCharCode(c);
 }
 else if((c > 127) && (c < 2048)) {
 utftext += String.fromCharCode((c >> 6) | 192);
 utftext += String.fromCharCode((c & 63) | 128);
 }
 else {
 utftext += String.fromCharCode((c >> 12) | 224);
 utftext += String.fromCharCode(((c >> 6) & 63) | 128);
 utftext += String.fromCharCode((c & 63) | 128);
 }
 }
 return utftext;
 }
 function binb2hex (binarray) {
 var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
 var str = "";
 for(var i = 0; i < binarray.length * 4; i++) {
 str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
 hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8 )) & 0xF);
 }
 return str;
 }
 s = Utf8Encode(s);
 return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
}



















window.addEventListener('load', function () {
  if(typeof ethereum=="undefined"){
    document.getElementById("noprovideralert").style.marginLeft=maxwidth/2-200+"px";
    document.getElementById("noprovideralert").style.marginTop=maxheight/2-200+"px";
  }else {
    ethereum.enable();
    web3 = new Web3(web3.currentProvider);
    var abi=[{"constant":false,"inputs":[{"name":"_proof","type":"bytes32"}],"name":"children","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_proof","type":"uint256"},{"name":"_to","type":"address"}],"name":"DNK","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_proof","type":"bytes32"}],"name":"parent","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]

    var atadr="0xef7e707a436d16517820f5eb36db4b55fea86ba9";
    var contract =new web3.eth.Contract(abi,atadr);
    //check if network is mainnet
    web3.eth.net.getId().then(netId => {
      switch (netId) {
        case 1:
        document.getElementById("signal").style.backgroundColor="#c2e5f9"
          break

        default:
        document.getElementById("signal").style.backgroundColor="#D12B99";
      }
    })
  }


  document.getElementById("logo").style.marginLeft=perc(maxwidth,10)+"px";
  document.getElementById("logot").style.marginLeft=perc(maxwidth,10)+100+"px";
  document.getElementById("signal").style.marginLeft=maxwidth-100+"px";
  document.getElementById("howworks").style.marginLeft=maxwidth-260+"px";
  document.getElementById("privacytips").style.marginLeft=maxwidth-380+"px";
  document.getElementById("mainalert").style.marginLeft=perc(maxwidth,10)+"px";
  document.getElementById("newaccsubmain").style.marginLeft=perc(maxwidth,10)+"px";
  document.getElementById("depositsubmain").style.marginLeft=perc(maxwidth,10)+149+"px";
  document.getElementById("withdrawsubmain").style.marginLeft=perc(maxwidth,10)+298+"px";
  document.getElementById("newaccmain").style.marginLeft=perc(maxwidth,10)+"px";
  document.getElementById("mutation").style.marginLeft=perc(maxwidth,10)+500+"px";
  document.getElementById("alertmutation").style.marginLeft=perc(maxwidth,10)+390+"px";
  document.getElementById("arrowmutation").style.marginLeft=perc(maxwidth,10)+112+390+"px";

  document.getElementById("donationt").style.marginLeft=perc(maxwidth,10)+"px";
  document.getElementById("version").style.marginLeft=perc(maxwidth,10)+"px";

  //show mutation
  document.getElementById("mutation").addEventListener("mouseover", function(){
    document.getElementById("alertmutation").style.display="block";
    document.getElementById("arrowmutation").style.display="block";
  });
//hide mutation
document.getElementById("mutation").addEventListener("mouseout", function(){
  document.getElementById("alertmutation").style.display="none";
  document.getElementById("arrowmutation").style.display="none";
});
//dot shows
document.getElementById("dot0").addEventListener("click", function(){
  document.getElementById("dot0").style.backgroundColor="#94FEBF";
  document.getElementById("dot1").style.backgroundColor="#1F096B";
  document.getElementById("dot2").style.backgroundColor="#1F096B";
  document.getElementById("dot3").style.backgroundColor="#1F096B";
});
//
//dot shows
document.getElementById("dot1").addEventListener("click", function(){
  document.getElementById("dot0").style.backgroundColor="#1F096B";
  document.getElementById("dot1").style.backgroundColor="#94FEBF";
  document.getElementById("dot2").style.backgroundColor="#1F096B";
  document.getElementById("dot3").style.backgroundColor="#1F096B";
  amount=0.1;
});
//
document.getElementById("dot2").addEventListener("click", function(){
  document.getElementById("dot0").style.backgroundColor="#1F096B";
  document.getElementById("dot1").style.backgroundColor="#1F096B";
  document.getElementById("dot2").style.backgroundColor="#94FEBF";
  document.getElementById("dot3").style.backgroundColor="#1F096B";
  amount=1;
});
//
document.getElementById("dot3").addEventListener("click", function(){
  document.getElementById("dot0").style.backgroundColor="#1F096B";
  document.getElementById("dot1").style.backgroundColor="#1F096B";
  document.getElementById("dot2").style.backgroundColor="#1F096B";
  document.getElementById("dot3").style.backgroundColor="#94FEBF";
  amount=10;
});

//depositmaindiv
document.getElementById("depositmain").style.marginLeft=perc(maxwidth,10)+"px";
//withdrawmain
document.getElementById("withdrawmain").style.marginLeft=perc(maxwidth,10)+"px";
//clickchange newacc
document.getElementById("newaccsubmain").addEventListener("click", function(){
  document.getElementById("newaccsubmain").style.backgroundColor="#210864";
  document.getElementById("depositsubmain").style.backgroundColor="transparent";
  document.getElementById("withdrawsubmain").style.backgroundColor="transparent";

  document.getElementById("newaccmain").style.display="block";
  document.getElementById("depositmain").style.display="none";
  document.getElementById("withdrawmain").style.display="none";

});
//clickchange deposit
document.getElementById("depositsubmain").addEventListener("click", function(){
  document.getElementById("newaccsubmain").style.backgroundColor="transparent";
  document.getElementById("depositsubmain").style.backgroundColor="#210864";
  document.getElementById("withdrawsubmain").style.backgroundColor="transparent";

  document.getElementById("newaccmain").style.display="none";
  document.getElementById("depositmain").style.display="block";
  document.getElementById("withdrawmain").style.display="none";

});
//clickchange withdraw
document.getElementById("withdrawsubmain").addEventListener("click", function(){
  document.getElementById("newaccsubmain").style.backgroundColor="transparent";
  document.getElementById("depositsubmain").style.backgroundColor="transparent";
  document.getElementById("withdrawsubmain").style.backgroundColor="#210864";

  document.getElementById("newaccmain").style.display="none";
  document.getElementById("depositmain").style.display="none";
  document.getElementById("withdrawmain").style.display="block";

});
//SEQUENCE 1
document.getElementById("continueclickednewacc").style.marginLeft= maxwidth-200-400+"px";
document.getElementById("continueclickednewaccheader").style.marginLeft= maxwidth-200-400+"px";
document.getElementById("continueclickedwithdraw").style.marginLeft= maxwidth-200-400+"px";
document.getElementById("continueclickeddeposit").style.marginLeft= maxwidth-200-400+"px";







//onclick show final data
//newaccmain onclick promp confirm form
document.getElementById("newaccmaincontinue").addEventListener("click",function () {
  password = document.getElementById("passwordvalue").value;
  if (password.length>=10) {
    document.getElementById("continueclickednewaccheader").style.display="block";
    document.getElementById("continueclickednewacc").style.display="block";
    document.getElementById("continueclickednewaccpasswordvalue").innerHTML=password;

    let tryhash=SHA256(password);
    while(tryhash[0]=="0"){
      tryhash=SHA256(tryhash);
    }
    tryhash=SHA256(tryhash.slice(0,10));
    registerhash="0x"+tryhash;
    document.getElementById("continueclickednewaccdeposithash").innerHTML=registerhash;
     document.getElementById("passwordvalue").value="";

  }

});
//write to contract new account
document.getElementById("withdrawalmaincontinue").addEventListener("click",function () {
  document.getElementById("continueclickedwithdraw").style.display="block";
  document.getElementById("continueclickeddeposit").style.display="block";
  withdrawhash=document.getElementById("withdrawmainaddress").value;
  document.getElementById("continueclickeddeposit4").innerHTML=document.getElementById("withdrawmainaddress").value;
  address=document.getElementById("withdrawmainaddress").value;
  password=  document.getElementById("withdrawmainpassword").value;

})

document.getElementById("connectnewacc").addEventListener("click",function () {

  document.getElementById('continueclickednewaccheader').style.display="none";
  document.getElementById('continueclickednewacc').style.display="none";
  document.getElementById("confirmtransalert").style.display="block";
  document.getElementById("confirmtransalert").style.marginLeft=maxwidth-300+"px";

  document.getElementById("arrowup").style.display="block";
  document.getElementById("arrowup").style.marginLeft=maxwidth-210+"px";


  document.getElementById("confirmtransalert").style.display="block";
  document.getElementById("confirmtransalert").style.marginLeft=maxwidth-300+"px";
  setTimeout(function(){
    document.getElementById("confirmtransalert").style.display="none";
    document.getElementById("arrowup").style.display="none";
    document.getElementById("confirmtransalert").style.display="none";

  }, 5000);

  contract.methods.parent(registerhash).send({from: web3.givenProvider.selectedAddress,value: amount*1000000000000000000})
  .then(function (e) {
    console.log(e);
    document.getElementById("tconfirmed").style.display="block";
    document.getElementById("tconfirmed").style.marginLeft=maxwidth-300+"px";
    setTimeout(function(){
      document.getElementById("tconfirmed").style.display="none";
    }, 5000);
  })
});
//withdraw
document.getElementById("cnonnectwithdraw").addEventListener("click",function () {
  let DNA = SHA256(password);
  while (DNA[0]=="0") {
    DNA=SHA256(DNA);
  }
  DNA=DNA.slice(0,10);
  DNA=parseInt(DNA,16);
  let children= web3.givenProvider.selectedAddress/10000000000000000000000000000000000000
  let isParent=Math.floor(DNA)-Math.floor(children);
  document.getElementById('continueclickedwithdraw').style.display="none";
  document.getElementById('continueclickeddeposit').style.display="none";

  document.getElementById("confirmtransalert").style.display="block";
  document.getElementById("confirmtransalert").style.marginLeft=maxwidth-300+"px";

  document.getElementById("arrowup").style.display="block";
  document.getElementById("arrowup").style.marginLeft=maxwidth-210+"px";

  document.getElementById("confirmtransalert").style.display="block";
  document.getElementById("confirmtransalert").style.marginLeft=maxwidth-300+"px";
  setTimeout(function(){
    document.getElementById("confirmtransalert").style.display="none";
    document.getElementById("confirmtransalert").style.display="none";
    document.getElementById("arrowup").style.display="none";

  }, 5000);


  contract.methods.DNK(isParent,address).send({from: web3.givenProvider.selectedAddress})
  .then(function () {
    document.getElementById("tconfirmed").style.display="block";
    document.getElementById("tconfirmed").style.marginLeft=maxwidth-300+"px";
    setTimeout(function(){
      document.getElementById("tconfirmed").style.display="none";
    }, 5000);

  })

});

//deposit
document.getElementById("depositmaincontinue").addEventListener("click",function () {

  amount=document.getElementById("depositmainvalue").value;
  let where=document.getElementById("depositmainhashvalue").value;
  document.getElementById("arrowup").style.display="block";
  document.getElementById("arrowup").style.marginLeft=maxwidth-210+"px";

  document.getElementById("confirmtransalert").style.display="block";
  document.getElementById("confirmtransalert").style.marginLeft=maxwidth-300+"px";
  contract.methods.children(where).send({from: web3.givenProvider.selectedAddress,value: amount*1000000000000000000})
  .then(function () {
    document.getElementById("tconfirmed").style.display="block";
    document.getElementById("tconfirmed").style.marginLeft=maxwidth-300+"px";
    setTimeout(function(){
      document.getElementById("tconfirmed").style.display="none";
      document.getElementById("confirmtransalert").style.display="none";
      document.getElementById("arrowup").style.display="none";

    }, 5000);
  })

});




//endo of onoad
})
