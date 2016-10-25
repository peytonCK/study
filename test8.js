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
				deferred.don(doneCallbacks).fail(failCallbacks).progress(progressCallbacks);
				return this;
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
                				returned=fn.apply(this,arguments);
                				if(returned && jQuery.isFunction(returned.promise)){
                					returned.promise().then(newDefer.resolve,newDefer.reject,newDefer.notify);
                				}else{
                					newDefer[action+"With"](this===deferred?newDefer:this,[returned]);
                				}
                			});
                		}else{777777777777777777
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
		deferred=promise.promise({}),
		key;
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

	return deferred.promise();
}