var MAP = new Array();
var dateyear = new Array(400);
function trim(cad){
var res="";
  for(i=0;i<cad.length;i++)
   {
     if(cad.charAt(i)==" "){
	 
	 }
	 else{
	 res+=cad.charAt(i);
	 }
   }
  return res;
}
function hasStars(val)
 {
 var pattern1 = new RegExp();
 pattern1.compile("^\\*.*\\*$");
 var b=pattern1.exec(val);
 if(b==null)
  return false;
 else 
  return true; 
 }
function hasDashes(val)
 {
  var pattern2 = new RegExp();
  pattern2.compile(".*-.*");
  var b=pattern2.exec(val);
  if(b==null)
   return false;
  else 
   return true; 
 }
 function isCombined(val){
 if(val.indexOf("/$$")>0){
 var k=val.match(".*/.*");
 if(k!=null)
  return true;
 else 
  return false;  
 }
 else{
 return false;
 }
 
}
function isHIBC(val)
 {
  var pattern4 = new RegExp();
  pattern4.compile("^\\+.");
  var b=pattern4.exec(val);
  if(b==null)
   return false;
  else 
   return true; 
 
 }
function isHIBCCatNum(val)
 {
   var pattern5 = new RegExp();
   pattern5.compile("^\\+[a-zA-Z].");
   var b=pattern5.exec(val);
   if(b==null)
    return false;
   else 
    return true; 
 }
function isGS1CatNum(val)
 {
 var pattern6 = new RegExp();
 pattern6.compile("^01[0-9]{14}(17[0-9]{6})?240[!\\\"%&'\\(\\)\\*\\+\\,\\-\\./0-9\\:;\\<\\=\\>\\?A-Z_a-z]{1,30}$");
 var b=pattern6.exec(val);
 if(b==null)
  return false;
 else 
  return true; 
 }
 function isHIBCLotCode(val)
  {
  var pattern7 = new RegExp();
 pattern7.compile("^\\+[0-9\\$].");
 var b=pattern7.exec(val);
 if(b==null)
  return false;
 else 
  return true; 
  }

 function isGS1(val){
 var pattern7 = new RegExp();
 pattern7.compile("^([0-9]{2,4}[!\\\"%&'\\(\\)\\*\\+\\,\\-\\./0-9\\:;\\<\\=\\>\\?A-Z_a-z]+)+$");
 var b=pattern7.exec(val);
 if(b==null)
  return false;
 else 
  return true; 
 }
 function isHIBCLotCodeSingleDollar(val){
 var pattern8 = new RegExp();
 pattern8.compile("^\\+\\$[0-9a-zA-Z].");
 var b=pattern8.exec(val);
 if(b==null)
  return false;
 else 
  return true; 
  }
 function isHIBCLotCodeNumeric(val){
 var pattern9 = new RegExp();
 pattern9.compile("^\\+[0-9].");
 var b=pattern9.exec(val);
 if(b==null)
  return false;
 else 
  return true; 
 } 
  function isHIBCLotCodeTwoDollars(val){
 var pattern10 = new RegExp();
 pattern10.compile("^\\+\\$\\$[0-9].");
 var b=pattern10.exec(val);
 if(b==null)
  return false;
 else 
  return true; 
  }
function isGS1LotCode(val){
var pattern11 = new RegExp();
 pattern11.compile("^((21[!\\\"%&'\\(\\)\\*\\+\\,\\-\\./0-9\\:;\\<\\=\\>\\?A-Z_a-z]{1,20})|(22[!\\\"%&'\\(\\)\\*\\+\\,\\-\\./0-9\\:;\\<\\=\\>\\?A-Z_a-z]{1,29}))$");
 var b=pattern11.exec(val);
 if(b==null)
  return false;
 else 
  return true; 
  }  
function isSerialNumber(val){
 var k=val.match("^21[!\\\"%&'\\(\\)\\*\\+\\,\\-\\./0-9\\:;\\<\\=\\>\\?A-Z_a-z]{1,20}$");
 if(k!=null)
  return true;
 else 
  return false; 
  }
function isSecundaryData(val){
 var k=val.match("^22[!\\\"%&'\\(\\)\\*\\+\\,\\-\\./0-9\\:;\\<\\=\\>\\?A-Z_a-z]{1,20}$");
 if(k!=null)
  return true;
 else 
  return false; 
} 
function getCatNum(val){
var retVal;
val = hasStars(val)?val.substring(1,val.length-1):val;
	if(isHIBCCatNum(val)){
		retVal=parseCatNum(val);
	}
	else{
		if(isGS1CatNum(val))
		{
		retVal=GS1parseCatNum(val);
		}
		else{
		retVal=val;
		}

}
return retVal;
}
function GS1parseCatNum(val)
 {
  var retVal=val;
 if(isGS1CatNum(val))
  {
  var res=val.match("240[!\\\"%&'\\(\\)\\*\\+\\,\\-\\./0-9\\:;\\<\\=\\>\\?A-Z_a-z]{1,30}");
  if(res!=null)
   {
    retVal=res;
    if(retVal!=null)
	 {
	 var m=retVal+"";
	 retVal=m.substring(3,m.length);
	 }
	 else{
	 retVal=val;
	 }
   }
  
  }
  return retVal;
 }
function parseCatNum(val){
 var retVal;
 if(checkSumMatch(val)){
 retVal=val.substring(5,val.length-2);
 }else{
 if(checkSumMatch(val+' ')){
 retVal=val.substring(5,val.length-1);
 }else{
 retVal=val.substring(5,val.length);
 }
 }
 
 return retVal;
}
function checkSumMatch(val)
 {
 
 val = hasStars(val)?val.substring(1,val.length-1):val;
 var computedValue = getCheckSumValue(val);
 var checksumVal = get(val.charAt(val.length-1));
 return computedValue == checksumVal;
 }
 
 function getCheckSumValue(val)
 {
 var retVal=0;
 val = hasStars(val)?val.substring(1,val.length-1):val;
 array = val.split("");
 for(var i=0;i<array.length-1;i++)
  {
   try{
   retVal+=get(array[i]);
   }catch(e){
   
   }
  }
return retVal%43;
 } 
function get(cadena)
 {
 var res=0;
 for(var i=0;i<MAP.length;i++)
  {
  if(cadena==MAP[i])
   {
   res=i;
   }
   else{
   
   }
  }
 return res;
 } 
function getHashMap()
 {
 var Letras = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
  for(var i=0;i<10;i++)
   {
    MAP[i]=i+'';
   }
   for(var i=0;i<26;i++)
    {
	MAP[i+10]=Letras[i];
	}
	MAP[36]="-";
	MAP[37]=".";
	MAP[38]=" ";
	MAP[39]="$";
	MAP[40]="/";
	MAP[41]="+";
	MAP[42]="%";
	
 }
 
 function dateformat(date){
 var prueba = new Date('1111101');
 var x=prueba.getYear();
 
 }
 function getLotCode(val, catNum,modification)
  {
  var retVal;
  if(modification==0){
  if(val.substring(0,2)=="+$"&&val.charAt(2)!='$')
   {
    if(val.length>10)
	 {
	  retVal=val.substring(2,val.length-2);
	 }
   }
   else{
   retVal=getLotCode(val,catNum,1);
   }
  }
  else{
  val = hasStars(val) ? val.substring(1, val.length - 1) : val;
  if(isHIBCLotCode(val))
   {
    retVal=HIBCparseLotCode(val);
   }
   else{
   
		if(catNum!=null&&isGS1CatNum(catNum)&&isGS1LotCode(val))
		  {
		    retVal=GS1parseLotCode(val);
			
		  }
		  else{
		  retVal=val;
		  }
		 
   }
 
  }
   
   return retVal;
  }
 function GS1parseLotCode(val){
    var retVal=val;
	if(isGS1LotCode(val)){
	
	  if(isSerialNumber(val))
	   {
	    retVal=parseSerialNumber(val);
	   }
	    else{
			if(isSecundaryData(val)){
			 retVal=GS1parseSecondaryData(val);
			}
		  }
	}
	
 return retVal;
 }
 function GS1parseSecondaryData(val){
 var retVal=val;
 var index=2+GS1getDateLength(val)+GS1getQuantityLength(val);
  try{
 
 if(index>val.length){
 
 }else{
 retVal = val.substring(index, (val.length-1));
 }
 }catch(e){
 }
 return retVal;
 }
 
 function parseSecondaryData(val){
 var retVal=val;
 var index=2+getDateLength(val)+getQuantityLength(val);
 try{
 retVal = val.substring(index, val.length-1);
 }catch(e){
 }
 return retVal;
 }
 function parseSerialNumber(val){
 retVal=val;
 try{
  retVal=retVal.substring(2,retVal.length);
 }catch(e){
 
 }
 return retVal;
 }
 function linkCharSpace(val){
 return val.charAt((val.length)-2) == ' ';
 } 
 function HIBCparseLotCode(val){
 var retVal = val;
 var match=checkSumMatch(val);
 if (!match && checkSumMatch(val + ' ')) {
            match = true;
            val = val + ' ';
        }
var linkSpace = linkCharSpace(val);
if (isHIBCLotCodeNumeric(val)) { 
   retVal = match || linkSpace ? val.substring(6, val.length - 2) : val.substring(6,val.length);	
 }
else{ 
if (isHIBCLotCodeSingleDollar(val)) {  
            if ( val.length <= 10) {
                retVal = match || linkSpace ? val.substring(2, (val.length - 2)) : val.substring(2,val.length);
             } else {
                retVal = match || linkSpace ? val.substring(7, (val.length - 2)) : val.substring(7,val.length);
             }
        } else if (isHIBCLotCodeTwoDollars(val)) {  
            retVal = parseTwoDollar(val, match);
        }
	
}

return retVal; 
 }
 function getQuantityLength(val){
 var retVal=0;
 if(val.charAt(3)=='8'){
   retVal=3;
 }
 else{
  if(val.charAt(3)=='9'){
  retVal=6;
  }
 }
 return retVal;
 }
function GS1getQuantityLength(val){
 var retVal=0;
 if(val.charAt(2)=='8'){
   retVal=3;
 }
 else{
  if(val.charAt(2)=='9'){
  retVal=6;
  }
 }
 return retVal;
 }
function GS1getDateLength(val){
var retVal=0;
var index=2+GS1getQuantityLength(val);
var formatDigit = val.charAt(index);
switch(formatDigit){
            case '2':
                // MMDDYY: this plus 6
            case '3':
                // YYMMDD: this plus 6
                retVal = 7;
                break;
            case '4':
                // YYMMDDHH: this plus 8
                retVal = 9;
                break;
            case '5':
                // YYJJJ: this plus 5
                retVal = 6;
                break;
            case '6':
                // YYJJJHH: this plus 7
                retVal = 8;
                break;
            case '7':
                // empty: this only
                retVal = 1;
                break;
            default:
                // if it's anything else, it's MMYY with now prefix, so 4
                retVal = 4;
                break;
}
return retVal;
} 
function getDateLength(val){
var retVal,index=3;
index+=getQuantityLength(val);
var digit=parseInt(val.substring(index,index+1));
switch (digit) {
            case 2:
                retVal = 7;
                break;
            case 3:
                retVal = 7;
                break;
            case 4:
                retVal = 9;
                break;
            case 5:
                retVal = 6;
                break;
            case 6:
                retVal = 8;
                break;
            case 7:
                retVal = 1;
                break;
            default:
                retVal = 4;
                break;
        }
return retVal+index;
} 
function parseTwoDollar(val,match){
var retVal;
var startIndex=getDateLength(val);
retVal = match ? val.substring(startIndex, val.length - 2) : val.substring(startIndex,val.length-1);
return retVal;
}
function parseExpirationDate(val, catNum){
var retVal=null;
if(isHIBCLotCode(val))
 {
   retVal=HIBCparseExpirationDate(val);
 }else{
	if(catNum!=null&&isGS1CatNum(catNum) && isGS1LotCode(val)){
	retVal=GS1parseExpirationDate(val);
	}
 }
 return retVal;
}
function GS1parseExpirationDate(val){
 var retVal=null;
 var sdf=null;
 var dateString='';
 if (isGS1LotCode(val)) {
   var index = 2+GS1getQuantityLength(val);
   var formatDigit = parseInt(val.charAt(index));
   var dateString = val.substr(1, 6);
   sdf="";	
   switch (formatDigit) {
            case 0:
			case 1: 
				dateString = val.substring(index , index + 4);
				sdf="MMyy";
				break;
			case 2:
                dateString = val.substring(index+1, index + 7);
				sdf="MMddyy";
                break;
            case 3:
                dateString = val.substring(index+1, index + 7);
                sdf="yyMMdd";
				break;
            case 4:
                dateString = val.substring(index+1, index + 9);
				sdf="yyMMddhh";
                break;
            case 5:
                dateString = val.substring(index+1, index + 6);
				sdf="yyDDD";
                break;
            case 6:
                dateString = val.substring(index+1, index + 8);
				sdf="yyDDDhh";
                break;
        }
		
	 }
if (dateString != null && sdf != null) {
            try {
                retVal = parse(dateString,sdf);
            } catch (e) {
                retVal = null;
            }
        }
return retVal;		
}

function HIBCparseExpirationDate(val){
 var retVal=null;
 var sdf=null;
 var dateString='';
 if (isHIBCLotCodeNumeric(val)) {
   dateString = val.substr(1, 6);
   sdf="yyDDD";	
	}
	else{
	if(isHIBCLotCodeTwoDollars(val))
	 {
	  var index=3;
	  index += getQuantityLength(val);
	  var digit=parseInt(val.substring(index, index + 1));
	  index++;
	  switch (digit) {
            case 0:
			case 1: 
				dateString = val.substring(index - 1, index + 3);
				sdf="MMyy";
				break;
			case 2:
                dateString = val.substring(index, index + 6);
				sdf="MMddyy";
                break;
            case 3:
                dateString = val.substring(index, index + 6);
                sdf="yyMMdd";
				break;
            case 4:
                dateString = val.substring(index, index + 8);
				sdf="yyMMddhh";
                break;
            case 5:
                dateString = val.substring(index, index + 5);
				sdf="yyDDD";
                break;
            case 6:
                dateString = val.substring(index, index + 7);
				sdf="yyDDDhh";
                break;
        }
		
	 }
	}
if (dateString != null && sdf != null) {
            try {
                retVal = parse(dateString,sdf);
            } catch (e) {
                retVal = null;
            }
        }
return retVal;		
}
function parse(dateString,sdf){
var res="";
var date;
  switch (sdf) {
      case 'MMyy':
	    var factor = parseInt(dateString.substr(2,2))>20 && parseInt(dateString.substr(2,2))<=99?1900:2000;
		res=(parseInt(dateString.substr(2,2))+factor)+"/"+dateString.substr(0,2)+"/01";
		date=new Date(res);
	  break;
	  case 'MMddyy':
	    var factor = parseInt(dateString.substr(4,2))>20 && parseInt(dateString.substr(4,2))<=99?1900:2000;
	    res=(parseInt(dateString.substr(4,2))+factor)+"/"+dateString.substr(0,2)+"/"+dateString.substr(2,2)+"";
		date=new Date(res);
	  break;
	  case 'yyMMdd':
	    var factor = parseInt(dateString.substr(0,2))>20 && parseInt(dateString.substr(0,2))<=99?1900:2000;
		res=(parseInt(dateString.substr(0,2))+factor)+"/"+dateString.substr(2,2)+"/"+dateString.substr(4,2)+"";
		date=new Date(res);
	  break;
	  case 'yyMMddhh':
	    factor = parseInt(dateString.substr(0,2))>20 && parseInt(dateString.substr(0,2))<=99?1900:2000;
	    res=(parseInt(dateString.substr(0,2))+factor)+"/"+dateString.substr(2,2)+"/"+dateString.substr(4,2)+",";
		date=new Date(res);
		date.setHours(parseInt(dateString.substr(6,2)))
	  break;
	  case 'yyDDD':
	    var factor = parseInt(dateString.substr(0,2))>20 && parseInt(dateString.substr(0,2))<=99?1900:2000;
	    year=parseInt(dateString.substr(0,2))+factor;
	    makedates(year);
		day=parseInt(dateString.substr(2,3));
		date=new Date(dateyear[day]);
	  break;
	  case 'yyDDDhh':
	    var factor = parseInt(dateString.substr(0,2))>20 && parseInt(dateString.substr(0,2))<=99?1900:2000;
	    year=parseInt(dateString.substr(0,2))+factor;
	    makedates(year);
		day=parseInt(dateString.substr(2,3));
		date=new Date(dateyear[day]);
		date.setHours(parseInt(dateString.substr(5,2)));
	  break;
}
return date;
}

function makedates(year){
var feb=0;
if (((year % 4)==0) && ((year % 100)!=0 || (year % 400)==0))
 {
  feb=29;
 } 
 else{
 feb=28;
 }
var con=1; 
var endmonth = new Array(31, parseInt(feb), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31); 
for(var i=1;i<13;i++)
 {
   for(var j=1;j<=endmonth[i-1];j++)
    {
	month=0, day=0;
	 if(i<10)
	  {
	   month='0'+i;
	  }
	  else{
	   month=i+'';
	  }
	 if(j<10){
	  day='0'+j;
	 } 
	 else{
	 day=j+'';
	 }
	 dateyear[con]=year+"/"+month+"/"+day;
	 con++;
	}
 }
}
function replacecharacter(val,character)
 {
 var retVal="";
 var arraych=val.split("");
 for(var i=0;i<arraych.length;i++)
  {
   if(arraych[i]==character)
    {
	arraych[i]="";
	}
	retVal+=arraych[i]+"";
  }
  
 return retVal;
 
 }
 function isltrim(val)
  {
  
  }
 function parseBarCode(val, modification, code128)
 {
  console.log('BARCODE');
 var parsedValue;
  getHashMap();
  if($('#txtInventoryCountCatalog').val()=='800-0250' || $('#txtInventoryCountLotCode').val()=='800-0250' || $('#txtInventoryCountCatalog').val()=='106994' || $('#txtInventoryCountLotCode').val()=='106994' || $('#txtUsageCatalog').val()=='800-0250' || $('#txtUsageLotCode').val()=='800-0250' || $('#txtUsageCatalog').val()=='106994' || $('#txtUsageLotCode').val()=='106994')
  {
    code128="0"
  }
  else
  {
    code128="1" 
  }

 if(code128=="0"){
console.log('entro code128')
 parsedValue=val;


      setTimeout(function()
        {
          //$.alert('Inactive Use: Sorry, but this application has not been used in the last 30 minutes and therefore you had to be logged out.');
          $('#txtInventoryCountLotCode').focus().val();
          $('#txtUsageLotCode').focus().val();

        }, 1500);
   



    
 }
 else{

  val = hasStars(val)?val.substring(1,val.length-1):val;
 if(isHIBC(val))
  {
  if (isHIBCCatNum(val)) {
  parsedValue=getCatNum(val);
  }
  if(isHIBCLotCode(val))
   {
   parsedValue=getLotCode(val,"+H92032015010 ",modification);
   }
 }else{
   val=replacecharacter(val,'(');
   val=replacecharacter(val,')');
   if (isGS1(val)) {
   if (isGS1CatNum(val)) {
   parsedValue=getCatNum(val);
   }
   if(isGS1LotCode(val)){
    parsedValue=getLotCode(val,"0128031497000583240SPK0022",modification);
   }
   }
  }
 }
return parsedValue;
}
 function testString(){
  console.log('Entro Parseado');
  if($('#lbScanner').text()=='Default')
  {
    modification="1"
  }
  else
  {
    modification="0" 
  }
  var code128= '0';

  var valueCtalog= $("#txtInventoryCountCatalog").val(); 

  if (valueCtalog.length > 0)
  {
    console.log('concatenado 1');
    var concatenado = $("#txtInventoryCountCatalog").val();
  }
  else
  {
    console.log('concatenado 2');
    var concatenado = $("#txtUsageCatalog").val();
  }
  
  var val= concatenado;
  var val2= $("#txtInventoryCountLotCode").val();
  var val3= $("#txtUsageCatalog").val();
  var val4= $("#txtUsageLotCode").val(); 
  //var modification= 1;
  var StringShow="<br><tab>****************************<br>";
  StringShow+="<B>BARCODE: </B>"+val+"<br>";
  if(isCombined(val))
   {
	StringShow+="IS COMBINED TRUE<br>";
	//val=trim(val);
	var arraych=val.split("/");

   StringShow+="<B>BARCODE 1: </B>"+arraych[0]+"<br>";  
  arraych[0]=arraych[0].substring(0,(arraych[0].length-1));
  parsedValue=parseBarCode(arraych[0], 0,code128);
  //parsedValue2=parseBarCode(arraych[0], 0,code128);
  //$("#txtInventoryCountCatalog").val(arraych[0]);
  parsedValue=parseBarCode(arraych[0], 0,code128);
  //parsedValue2=parseBarCode(arraych[0], 0,code128);
  $("#txtInventoryCountCatalogHidden").val(parsedValue);
  $("#txtUsageCatalogHidden").val(parsedValue);
  StringShow+="<b>Parsed Value</b> : "+parsedValue;
  //$('#txtInventoryCountLotCode').focus();
  StringShow+="<B><br>BARCODE 2: </B>"+arraych[1]+"<br>";
  //$("#txtInventoryCountLotCode").val(arraych[1]);
  arraych[1]="+"+arraych[1];
  parsedValue=parseBarCode(arraych[1], 1,code128);
  //parsedValue2=parseBarCode(arraych[1], 1,code128);
  $("#txtInventoryCountLotCodeHidden").val(parsedValue);
  $("#txtUsageLotCodeHidden").val(parsedValue);

  if ($("#txtInventoryCountCatalogHidden").val() > 0 || $("#txtInventoryCountLotCodeHidden").val() > 0 )
    {
      setTimeout(function()
        {
          //$.alert('Inactive Use: Sorry, but this application has not been used in the last 30 minutes and therefore you had to be logged out.');
          $('#btnInventoryCountSubmit').tap();

        }, 1500);
    }

  
  //StringShow+="<b>Parsed Value</b> : "+parsedValue;
  //StringShow+="<br><b>Expiration date: </b>"+parseExpirationDate(arraych[1],"+H92032015010");
  //StringShow+="<br><tab>****************************<br>";  
	}
	else{
		parsedValue=parseBarCode(val, modification,code128);
    parsedValue2=parseBarCode(val2, modification,code128);
    parsedValue3=parseBarCode(val3, modification,code128);
    parsedValue4=parseBarCode(val4, modification,code128);
		//StringShow+="<b>Parsed Value</b> : "+parsedValue;
    $("#txtInventoryCountCatalogHidden").val(parsedValue);
    $('#txtInventoryCountLotCodeHidden').val(parsedValue2);
    $("#txtUsageCatalogHidden").val(parsedValue3);
    $('#txtUsageLotCodeHidden').val(parsedValue4);

    if ($("#txtInventoryCountCatalogHidden").val() > 0)
    {
      setTimeout(function()
        {
          //$.alert('Inactive Use: Sorry, but this application has not been used in the last 30 minutes and therefore you had to be logged out.');
          $('#txtInventoryCountLotCode').focus().val();

        }, 1500);
    }

    if ($("#txtUsageCatalogHidden").val() > 0)
    {
      setTimeout(function()
        {
          //$.alert('Inactive Use: Sorry, but this application has not been used in the last 30 minutes and therefore you had to be logged out.');
          $('#txtUsageLotCode').focus().val();

        }, 1500);
    }

    
    //$('#txtInventoryCountLotCode').focus();
		StringShow+="<br><tab>****************************<br>";  
    }    
 //document.getElementById("txtInventoryCountLotCode").innerHTML=StringShow;
 //$('#txtInventoryCountLotCode').val(StringShow);  
 }