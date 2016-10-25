var underscore = {},
	_ = underscore;

/*
**功能：将list中的元素，按顺序遍历，并将其作参传给iteratee执行，最后返回list
**参数 list：数组、对象
**参数 iteratee：函数 当list为数组，传给iteratee的参数为(element,index,list);
					  当list为对象时，传给iteratee的参数为(value,key,list);
**参数 context：iteratee的执行环境
**/
_.each = function(list, iteratee, context) {
	if (typeof list === "Array") {
		for (var i = 0; i < list.length; i++) {
			iteratee.call(context, list[i], i, list);
		}
	} else {
		for (var key in list) {
			iteratee.call(context, list[key], key, list);
		}
	}
	return list;
}

/*
**功能：将list中的元素，按顺序遍历，并将其作参传给iteratee执行，最后返回将iteratee返回的新值赋给新数组
**参数 list：数组、对象
**参数 iteratee：函数 当list为数组，传给iteratee的参数为(element,index,list);
					  当list为对象时，传给iteratee的参数为(value,key,list);
**参数 context：iteratee的执行环境
**/
_.map = function(list, iteratee, context) {
	var result = [];
	if (typeof list === "Array") {
		for (var i = 0; i < list.length; i++) {
			result.push(iteratee.call(context, list[i], i, list));
		}
	} else {
		for (var key in list) {
			result.push(iteratee.call(context, list[key], key, list));
		}
	}
	return result;
}

/*
**功能：将list中的元素，按顺序遍历，并将其作参传给iteratee执行归结改变memo，最后将memo返回
**参数 list：数组、对象
**参数 iteratee：函数 当list为数组，传给iteratee的参数为(element,index,list);
					  当list为对象时，传给iteratee的参数为(value,key,list);
**参数 memo：iteratee的执行环境
**参数 context：iteratee的执行环境
**/
_.reduce = function(list, iteratee, memo, context) {
	if (typeof list === "Array") {
		for (var i = 0; i < list.length; i++) {
			memo = iteratee.call(context, memo, list[i], i, list);
		}
	} else {
		for (var key in list) {
			memo = iteratee.call(context, memo, list[key], key, list);
		}
	}
	return memo;
}

/*
**功能：将list中的元素，按倒序遍历，并将其作参传给iteratee执行归结改变memo，最后将memo返回
**参数 list：数组、对象
**参数 iteratee：函数 当list为数组，传给iteratee的参数为(element,index,list);
					  当list为对象时，传给iteratee的参数为(value,key,list);
**参数 memo：iteratee的执行环境
**参数 context：iteratee的执行环境
**/
_.reduceRight = function(list, iteratee, memo, context) { //这个地方，如果list是个对象，无法从最后开始，最好是先将key化成数组，然后再循环
	if (typeof list === "Array") {
		for (var i = 0; i < list.length; i++) {
			memo = iteratee.call(memo, list[list.length - 1 - i], list.length - 1 - i, list);
		}
	} else {
		var tempArray = [];
		for (var key in list) {
			tempArray.push(key);
		}
		for (var i = 0; i < tempArray.length; i++) {
			memo = iteratee.call(context, memo, list[tempArray[tempArray.length - 1 - i]], tempArray[tempArray.length - 1 - i], list);
		}
	}
	return memo;
}

/*
 **功能：在list中逐项查找，返回第一个通过predicate迭代函数真值检测的元素值，如果没有值传递给测试迭代器将返回undefined。 如果找到匹配的元素，函数将立即返回，不会遍历整个list。
 **参数 list：数组、对象
 **参数 predicate: 迭代函数，检测元素值
 **参数 context：predicate的执行环境
 **/
_.find = function(list, predicate, context) {
	if (typeof list === "Array") {
		for (var i = 0; i < list.length; i++) {
			if (predicate.call(context, list[i])) {
				return list[i];
			}
		}
	} else {
		for (var key in list) {
			if (predicate.call(context, list[key])) {
				return list[key];
			}
		}
	}
	return undefined;
}

/*
 **功能：遍历list中的每个值，返回包含所有通过predicate真值检测的元素值。
 **参数 list：数组、对象
 **参数 predicate: 迭代函数，检测元素值
 **参数 context：predicate的执行环境
 **/
_.filter = function(list, predicate, context) {
	var result = [];
	if (typeof list === "Array") {
		for (var i = 0; i < list.length; i++) {
			if (predicate.call(context, list[i])) {
				result.push(list[i]);
			}
		}
	} else {
		for (var key in list) {
			if (predicate.call(context, list[key])) {
				result.push(list[key]);
			}
		}
	}
	return result;
}

/*
 **功能：遍历list中的每一个值，返回一个数组，这个数组包含properties所列出的属性的所有的 键 - 值对。
 **参数 list：数组、对象
 **参数 properties: 一个键值对 对象
 **/
_.where = function(list, properties) {
	var result = [],flag=false;
	if (typeof list === "Array") {
		for (var i = 0; i < list.length; i++) {
			flag=true;
			for (var key in properties) {
				if (properties[key]!==list[i][key]) {
					flag=false;
					break;
				}
			}
			if(flag){
				result.push(list[i]);
			}
		}
	} 
	return result;
}

/*
 **功能：遍历整个list，返回匹配 properties参数所列出的所有 键 - 值 对的第一个值。
 **参数 list：数组、对象
 **参数 properties: 一个键值对 对象
 **/
_.findWhere = function(list, properties) {
	var result = undefined,flag=false;
	if (typeof list === "Array") {
		for (var i = 0; i < list.length; i++) {
			flag=true;
			for (var key in properties) {
				if (properties[key]!==list[i][key]) {
					flag=false;
					break;
				}
			}
			if(flag){
				result=list[i];
				break;
			}
		}
	} 
	return result;
}

/*
 **功能：返回list中没有通过predicate真值检测的元素集合，与filter相反
 **参数 list：数组、对象
 **参数 properties: 一个键值对 对象
 **/
_.reject = function(list, properties,context) {
	var result = [];
	if (typeof list === "Array") {
		for (var i = 0; i < list.length; i++) {
			if (!predicate.call(context, list[i])) {
				result.push(list[i]);
			}
		}
	} else {
		for (var key in list) {
			if (!predicate.call(context, list[key])) {
				result.push(list[key]);
			}
		}
	}
	return result;
}

/*
 **功能：如果list中的所有元素都通过predicate的真值检测就返回true。如果存在原生的every方法，就使用原生的every
 **参数 list：数组、对象
 **参数 properties: 一个键值对 对象
 **/
_.every = function(list, properties,context) {
	var flag=true;
	if (typeof list === "Array") {
		for (var i = 0; i < list.length; i++) {
			if (!predicate.call(context, list[i])) {
				flag=false;
			}
		}
	} else {
		for (var key in list) {
			if (!predicate.call(context, list[key])) {
				flag=false;
			}
		}
	}
	return flag;
}

/*
 **功能：如果list中有任何一个元素通过 predicate 的真值检测就返回true。一旦找到了符合条件的元素, 就直接中断对list的遍历.
 **参数 list：数组、对象
 **参数 properties: 一个键值对 对象
 **/
_.some = function(list, properties,context) {
	var flag=false;
	if (typeof list === "Array") {
		for (var i = 0; i < list.length; i++) {
			if (predicate.call(context, list[i])) {
				flag=true;
				break;
			}
		}
	} else {
		for (var key in list) {
			if (predicate.call(context, list[key])) {
				flag=true;
				break;
			}
		}
	}
	return flag;
}

/*
 **功能：如果list包含指定的value则返回true,如果list 是数组，内部使用indexOf判断。使用fromIndex来给定开始检索的索引位置。
 **参数 list：数组、对象
 **参数 properties: 一个键值对 对象
 **/
_.contains = function(list, value,fromIndex) {
	var flag=false;
	if (typeof list === "Array") {
		if(list.indexOf(value)>(-1+fromIndex?fromIndex:0)){
			flat=true;
		}
	} else {
		for (var key in list) {
			if (list[key]===value) {
				flag=true;
				break;
			}
		}
	}
	return flag;
}

/*
 **功能：在list的每个元素上执行methodName方法。任何传递给invoke的额外参数，invoke都会在调用methodName方法的时候传递给它。
 **参数 list：数组、对象
 **参数 methodName: 执行方法
 **参数 *arguments 参数
 **/
_.invoke = function(list, methodName,*arguments) {
	if (typeof list === "Array") {
		for(var i=0; i<list.length; i++){
			list[i]=methodName(list[i],*arguments);
		}
	} else {
		for (var key in list) {
			if (list[key]===value) {
				list[key]=methodName(list[key],*arguments);
			}
		}
	}
	return flag;
}

/*
 **功能：是map最常使用的用例模型的简化版本，即萃取数组对象中某属性值，返回一个数组。
 **参数 list：数组、对象
 **参数 propertyName: 一个键值对 对象
 **/
_.pluck = function(list, propertyName) {
	var result=[];
	if (typeof list === "Array") {
		for(var i=0; i<list.length; i++){
			if(list[i][key]){
				result.push(list[i][key]);
			}
		}
	} 
	return result;
}

/*
 **功能：list中的最大值。如果传递iteratee参数，iteratee将作为list中每个值的排序依据。如果list为空，将返回-Infinity，所以你可能需要事先用isEmpty检查 list 。
 **参数 list：数组、对象
 **参数 iteratee: 单个元素处理函数
 **参数 context:iteratee 运行环境
 **/
_.max = function(list, iteratee,context) {
	var result=[];
	if (!isEmpty(list) && typeof list === "Array") {
		for(var i=0; i<list.length; i++){
			result.push(iteratee.call(context,list[i]));
		}
		var temp=result[0],index=0;
		for(var j=1; j<result.length; j++){
			if(result[j]>temp){
				temp=result[j];
				index=j;
			}
		}
	} 
	return list[index];
}

/*
 **功能：list中的最大值。如果传递iteratee参数，iteratee将作为list中每个值的排序依据。如果list为空，将返回-Infinity，所以你可能需要事先用isEmpty检查 list 。
 **参数 list：数组、对象
 **参数 iteratee: 单个元素处理函数
 **参数 context:iteratee 运行环境
 **/
_.min = function(list, iteratee,context) {
	var result=[];
	if (!isEmpty(list) && typeof list === "Array") {
		for(var i=0; i<list.length; i++){
			result.push(iteratee.call(context,list[i]));
		}
		var temp=result[0],index=0;
		for(var j=1; j<result.length; j++){
			if(result[j]<temp){
				temp=result[j];
				index=j;
			}
		}
	} 
	return list[index];
}

/*
 **功能：返回一个排序后的list拷贝副本。如果传递iteratee参数，iteratee将作为list中每个值的排序依据。迭代器也可以是字符串的属性的名称进行排序的(比如 length)。
 **参数 list：数组、对象
 **参数 iteratee: 单个元素处理函数
 **参数 context:iteratee 运行环境
 **/
_.sortBy = function(list, iteratee,context) {
	var result=[];
	if (!isEmpty(list) && typeof list === "Array") {
		var temp=list.concat([]),
		length=temp.length;
		for(var i=1; i<length; i++){
			result.push(_.min(temp,iteratee));
			temp.splice(temp.indexOf(result[result.length-1]),1);
		}
	} 
	return result;
};


/*
 **功能：把一个集合分组为多个集合，通过 iterator 返回的结果进行分组. 如果 iterator 是一个字符串而不是函数, 那么将使用 iterator 作为各元素的属性名来对比进行分组.
 **参数 list：数组、对象
 **参数 iteratee: 单个元素处理函数
 **参数 context:iteratee 运行环境
 **/
_.groupBy = function(list, iteratee,context) {
	var result={},key;
	if (!isEmpty(list) && typeof list === "Array") {
		for(var i=0; i<list.length; i++){
			key=typeof iteratee==="Function"?iteratee.call(context,list[i]):list[i][iteratee];
			result[key]=result[key]?result[key]:[];
			result[key].push(list[i]);
		}
	} 
	return result;
};

/*
 **功能：给定一个list，和 一个用来返回一个在列表中的每个元素键 的iterator 函数（或属性名）， 返回一个每一项索引的对象。和groupBy非常像，但是当你知道你的键是唯一的时候可以使用indexBy 。
 **参数 list：数组、对象
 **参数 iteratee: 单个元素处理函数
 **参数 context:iteratee 运行环境
 **/
_.indexBy = function(list, iteratee,context) {
	var result={},key;
	if (!isEmpty(list) && typeof list === "Array") {
		for(var i=0; i<list.length; i++){
			key=typeof iteratee==="Function"?iteratee.call(context,list[i]):list[i][iteratee];
			result[key]=list[i];
		}
	} 
	return result;
};


/*
 **功能：排序一个列表组成一个组，并且返回各组中的对象的数量的计数。类似groupBy，但是不是返回列表的值，而是返回在该组中值的数目。
 **参数 list：数组、对象
 **参数 iteratee: 单个元素处理函数
 **参数 context:iteratee 运行环境
 **/
_.countBy = function(list, iteratee,context) {
	var result={},key;
	if (!isEmpty(list) && typeof list === "Array") {
		for(var i=0; i<list.length; i++){
			key=typeof iteratee==="Function"?iteratee.call(context,list[i]):list[i][iteratee];
			result[key]=result[key]?result[key]:0;
			result[key]++;
		}
	} 
	return result;
};

/*
 **功能：返回一个随机乱序的 list 副本, 使用 Fisher-Yates shuffle 来进行随机乱序.
 **参数 list：数组、对象
 **参数 iteratee: 单个元素处理函数
 **参数 context:iteratee 运行环境
 **/
_.shuffle = function(list) {
	var result=[],temp=list.concat([]),index=0;
	while(temp.length){
		index=parseInt(Math.random()*temp.length,10);
		result.push(temp[index]);
		temp.splice(index,1);
	}
	return result;
};

/*
 **功能：从 list中产生一个随机样本。传递一个数字表示从list中返回n个随机元素。否则将返回一个单一的随机项。
 **参数 list：数组、对象
 **参数 iteratee: 单个元素处理函数
 **参数 context:iteratee 运行环境
 **/
_.sample = function(list,n) {
	var result=[],temp=list.concat([]),index=0;
	if(!n){
		return result;
	}
	while(temp.length){
		index=parseInt(Math.random()*temp.length,10);
		result.push(temp[index]);
		if (result.length==n){
			break;
		}
		temp.splice(index,1);
	}
	return result;
};

/*
 **功能：把list(任何可以迭代的对象)转换成一个数组，在转换 arguments 对象时非常有用。
 **参数 list：任何可以迭代的对象
 **/
_.toArray=function(list){
	//?
}

/*
 **功能 **参数 list：任何可以迭代的对象
 **/
_.size=function(list){
	var temp=_.toArray(list);
	return temp.length;
}

/*
 **功能：拆分一个数组（array）为两个数组：  第一个数组其元素都满足predicate迭代函数， 而第二个的所有元素均不能满足predicate迭代函数。
 **参数 predicate：迭代函数
 **/
_.partition(array,predicate){
	var result=[[],[]];
	for(var i=0;i<array.length; i++){
		//result[predicate(array[i])?0:1].push(array[i]);
		if(predicate(array[i])){
			result[0].push(array[i]);
		}else{
			result[1].push(array[i]);
		}
	}
	return result;
}