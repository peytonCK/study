function noConflict(deep){
	if(window.$===jQuery){
		window.$=_$;
	}
	if(deep && window.jQuery===jQuery){
		window.jQuery=_jQuery;
	}
	return jQuery;
}

function isNumeric(obj){
	return !isNaN(parseFloat(obj)) && isFinite(obj);
}

function type(obj){
	return obj == null ?
	       String(obj):
	       class2type[toString.call(obj)]||"object";
}

function isPlainObject(obj){
	if(!obj || jQuery.type(obj)!=="object"||obj.nodeType ||jQuery.isWindow(obj)){
		return false;
	}
	try{
		if(obj.constructor && !hasOwn.call(obj.constructor.prototype,"isPrototypeOf")){
			return false;
		}
	}catch(e){
		return false;
	}
	var key; 
	for(key in obj){}
	return key===undefined ||hasOwn.call(obj,key);
}

function isEmptyObject(obj){
	for(var name in obj){
		return false;
	}
	return true;
}


function error(msg){
	throw new Error(msg);
}

function globalEval(data){
	if(data && rnotwhite.test(data)){
		(window.execScript||function(data){
			window["eval"].call(window,data);
		})(data);
	}
}

function nodeName(elem,name){
	return elem.nodeName && elem.nodeName.toUpperCase()===name.toUpperCase();
}

trim:trim?
   function(text){
   	return text==null?"":trim.call(text);
   }:
   function(text){
   	return text==null?"":text.toString().replace(trimLeft,"").replace(trimRight,"");
   };


function makeArray(array,results){
	var ret=results||[];
	if(array!=null){
		var type=jQuery.type(array);
		if(array.length==null || type ==="string" ||type==="function"||type==="regexp"||jQuery.isWindwo(array)){
			push.call(ret,array);
		}else{
			jQuery.merge(ret,array);
		}
	}
	return ret;
}

function inArray(elem,array,i){
	var len;
	if(array){
		if(indexOf){
			return indexOf.call(array,elem,i);
		}
		len=array.length;
		i=i>i<0?Math.max(0,len+i):i:0;
		for(;i<len; i++){
			if(i in array && array[i]===elem){
				return i;
			}
		}
	}
	return -1;
}

function merge(first,second){
	var i=first.length,
	j=0;
	if(typeof second.length==="number"){
		for(var l=second.length; j<l;j++){
			first[i++]=second[j];
		}
	}else{
		while(second[j]!==undefined){
			first[i++]=second[i++];
		}
	}
	first.length=i;
	return first;
}

function grep(elems,callback,inv){
	var ret=[],retVal;
	inv=!!inv;

	for(var i=0,length=elems.length; i<length; i++){
		retVal=!!callback(elems[i],i);
		if(inv!==!!retVal){
			ret.push(elems[i]);
		}
	}
	return ret;
}

function proxy(fn,context){
	if(typeof context==="string"){
		var tmp=fn[context];
		context=fn;
		fn=tmp;
	}

	if(!jQuery.isFunction(fn)){
		return undefined;
	}

	var args=slice.call(arguments,2),
	    proxy=function(){
	    	return fn.apply(context,args.concat(slice.call(arguments)));
	    };
	proxy.guid=fn.guid=fn.guid||proxy.guid||jQuery.guid++;
	return proxy;
}

function access(elems,fn,key,value,chainable,emptyGet,pass){
	var exec,
	    bulk=key==null,
	    i=0,
	    length=elems.length;

	if(key && typeof key==="object"){
		for(i in key){
			jQuery.access(elems,fn,i,key[i],1,emptyGet,value);
		}
		chainable=1;
	}else if(value!==undefined){
		exec=pass===undefined && jQuery.isFunction(value);
		if(bulk){
			exec=fn;
			fn=function(elem,key,value){
				return exec.call(jQuery(elem),value);
			}
		}else{
			fn.call(elems,value);
			fn=null;
		}
		if(fn){
		for(;i<length; i++){
			fn(elems[i],key,exec?value.call(elems[i],i,fn(elems[i],key)):value,pass);
		}
	}
	chinalbe=1;
	}
	
    return chainable?elems:
           bulk?fn.call(elems):
           length?fn(elems[0],key):emptyGet;
}

function access(elems,fn,key,value,chainable,emptyGet,pass){
	var exec,
	    bulk=key==null,
	    i=0,
	    length=elems.length;

	if(key && typeof key =="object"){
		for(i in key){
			jQuery.access(elems,fn,i,key[i],1,emptyGet,value);
		}
		chainable=1;
	}else if(value!==undefined){
		exec=pass===undefined && jQuery.isFunction(value);
		if(bulk){
			exec=fn;
			fn=function(elem,key,value){
				return exec.call(jQuery(elem),value);
			}
		}else{
			fn.call(elems,value);
			fn=null;
		}
		if(fn){
			for(;i<length; i++){
				fn(elems[i],key,exec?value.call(elems[i],i,fn(elems[i],key)):value,pass);
			}
		}
		chainable=1;
	}
	return chainable?elems:
	       bulk?fn.call(elems):
	       length?fn(elems[0],key):emptyGet;
}



