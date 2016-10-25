var flagsCache={};

function createFlags(flags){
  var object=flagsCache[flags]={},i,length;
  flags=flags.split(/\s+/);
  for(i=0,length=flags.length;i<length; i++){
  	object[flags[i]]=true;
  }
  return object;
}

function Callbacks(flags){
	flags=flags?(flagsCache[flags]||createFlags(flags)):{};
	var list=[],stack=[],memory,fired,firingStart,firingLength,firingIndex,
	add=function(args){
        var i,length,elem,type,actual;
        for(i=0,length=args.length;i<length;i++){
        	elem=args[i];
        	type=jQuery.type(elem);
        	if(type==="array"){
        		add(elem);
        	}else if(type==="function"){
        		if(!flags.unique||!self.has(elem)){
        			list.push(elem);
        		}
        	}
        }
	},
	fire=function(context,args){
		args=args||[];
		memory=!flags.memory||[context,args];
		fired=true;
		firing=true;
		firingIndex=firingStart||0;
		firingStart=0;
		firingLength=list.length;
		for(;list&&firingIndex<firingLength; firingIndex++){
			if(list[firingIndex].apply(context,args)===false && flags.stopOnFalse){
				memory=true;
				break;
			}
		}
		firing=false;
		if(list){
			if(!flags.once){
				if(stack && stack.length){
					memory=stack.shift();
					self.fireWidth(memory[0],memory[1]);
				}
			}else if(memory===true){
				self.disable();
			}else{
				list=[];
			}
		}
	},
	self={
		add:function(){
			if(list){
				var length=list.length;
				add(arguments);
				if(firing){
					firingLength=list.length;
				}else if(memory && memory!==true){
					firingStart=length;
					fire(memory[0],memory[1]);
				}
			}
			return this;
		},
		remove:function(){
			if(list){
				var args=arguments,argIndex=0,argLength=args.length;
				for(;argIndex<argLength;argIndex++){
					for(var i=0;i<list.length;i++){
						if(args[argIndex]===list[i]){
							if(firing){
								if(i<=firingLength){
									firingLength--;
									if(i<=firingIndex){
										firingIndex--;
									}
								}
							}
							list.splice(i--,1);
							if(flags.unique){
								break;
							}
						}
					}
				}
			}
			return this;
		},
		has:function(fn){
			if(list){
				var i=0,length=list.length;
				for(;i<length; i++){
					if(fn===list[i]){
						return true;
					}
				}
			}
			return false;
		},
		empty:function(){
           list=[];
           return this;
		},
		disable:function(){
			list=stack=memory=undefined;
			return this;
		},
		disabled:function(){
			return !list;
		},
		lock:function(){
			stack=undefined;
			if(!memory ||memory===true){
				self.disable();
			}
			return this;
		},
		locked:function(){
			return !stack;
		},
		fireWith:function(context,args){
           if(stack){
           	 if(firing){
           	 	if(!flags.once){
           	 		stack.push([context,args]);
           	 	}
           	 }else if(!(flags.once&&memory)){
           	 	fire(context,args);
           	 }
           }
           return this;
		},
		fire:function(){
			self.fireWidth(this,arguments);
			return this;
		},
		fired:function(){
			return !!fired;
		}
	};
	return self;
}


var sliceDeferred=[].slice;
function Deferred(func){
	var doneList=jQuery.Callbacks("once memory"),
	    failList=jQuery.Callbacks("once memory"),
	    progressList=jQuery.Callbacks("memory"),
	    state="pending",
	    lists={
	    	resolve:doneList,
	    	reject:failList,
	    	notify:progressList
	    },
	    promise={
	    	done:doneList.add,
	    	fail:failList.add,
	    	progress:progressList.add,
	    	state:function(){
	    		return state;
	    	},
	    	isResolved:doneList.fired,
	    	isRejected:failList.fired,
	    	then:function(doneCallbacks,failCallbacks,progressCallbacks){
	    		deferred.done(doneCallbacks).fail(failCallbacks).progress(progressCallbacks);
	    	},
	    	always:function(){
	    		deferred.done.apply(deferred,arguments).fail.apply(deferred,arguments);
	    		return this;
	    	},
	    	pipe:function(fnDone,fnFail,fnProgress){
                return jQuery.Deferred(function(newDefer){
                    jQuery.each({
                    	done:[fnDone,"resolve"],
                    	fail:[fnFail,"reject"],
                    	progress:[fnProgress,"notify"]
                    },function(handler,data){
                    	var fn=data[0],
                    	    action=data[1],
                    	    returned;
                    	if(jQuery.isFunction(fn)){
                    		deferred[handler](function(){
                               returned=fn.apply(this,arguments){
                               	if(returned && jQuery.isFunction(returned.promise)){
                               		returned.promise().then(newDefer.resolve,newDefer.reject,newDefer.notify)
                               	}else{
                               		newDefer[action+"With"](this===deferred?newDefer:this,[returned]);
                               	}
                               }
                    		})
                    	}else{
                           deferred[handler](newDefer[action]);
                    	}
                    });
                }).promise();
	    	},
	    	promise:function(obj){
	    		if(obj==null){
	    			obj=promise;
	    		}else{
	    			for(var key in promise){
	    				obj[key]=promise[key];
	    			}
	    		}
	    		return obj;
	    	}
	    },
	    deferred=promise.promise({}),key;
	    for(key in lists){
	    	deferred[key]=lists[key].fire;
	    	deferred[key+"With"]=lists[key].fireWith;
	    }
	    deferred.done(function(){
	    	state="resolved";
	    },failList.disable,progressList.lock).fail(function(){
	    	state="rejected";
	    },doneList.disable,progressList.lock);

	    if(func){
	    	func.call(deferred,deferred);
	    }

	    return deferred;
}

function when(firstParam){
    var args=sliceDeferred.call(arguments,0),
    i=0,length=args.length,pValues=new Array(length),count=length,pCount=length,deferred=length<=1 && firstParam && jQuery.isFunction(firstParam.promise)?
        firstParam:jQuery.Deferred(),
    promise=deferred.promise();
    function resolveFunc(i){
    	return function(value){
    		args[i]=arguments.length>1?sliceDeferred.call(arguments,0):value;
    		if(!(--count)){
    			deferred.resolveWith(deferred, args);
    		}
    	};

    }
    function progressFunc(i){
    	return function(value){
    		pValues[i]=arguments.length>1?sliceDeferred.call(arguments,0):value;
    		deferred.notifyWith(promise,pValues);
    	};
    }
    if(length>1){
    	for(;i<length;i++){
    		if(args[i] && args[i].promise && jQuery.isFunction(args[i].promise)){
    			args[i].promise().then(resolveFunc(i),deferred.reject,progressFunc(i));
    		}else{
    			--count;
    		}
    	}
    	if(!count){
    		deferred.resolveWith(deferred, args);
    	}
    }else if(deferred!==firstParam){
    	deferred.resolveWith(deferred,length?[firstParam]:[]);
    }
    return promise;
}