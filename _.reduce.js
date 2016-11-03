function createReduce(dir){
	function iterator(obj,iteratee,memo,keys,index,length){
		for(; index>=0 && index<length; index+=dir){
			var currentKey=keys?keys[index]:index;
			memo=iteratee(memo,obj[currentKey],currentKey,obj);
		}
		return memo;
	}

	return function(obj,iteratee,memo,context){
		iteratee=optimizeCb(iteratee,context,4);
		var keys=!isArrayLike(obj) && _.keys(obj),
			length=keys.length,
			index=dir>0?0:length-1;
		if(arguments.length<3){
			memo=obj[keys?keys[index]:index];
			index+=dir;
		}
		return iterator(obj,iteratee,memo,keys,index,length);
	};
}

_.reduce=_.foldl=_.inject=createReduce(1);

_.reduceRight=_.foldr=createReduce(-1);