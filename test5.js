function clean(elems,context,fragment,scripts){
	var checkScriptType,script,j,ret=[];

	context=context||document;

	if(!context.createElement){
		context=context.ownerDocument||context[0]&&context[0].ownerDocument ||document;
	}

	for(var i=0; (elem=elems[i])!=null; i++){
		if(typeof elem ==="number"){
			elem+="";
		}
		if(!elem){
			continue;
		}
		if(typeof elem==="string"){
			if(!rhtml.text(elem)){
				elem=context.createTextNode(elem);
			}else{
				elem=elem.replace(rhtmlTag,"<$1></$2>");

				var tag=(rtagName.exec(elem)||["",""])[1].toLowerCase,
				    wrap=wrapMap[tag]||wrapMap._default,
				    depth=wrap[0],
				    div=context.createElement("div"),
				    safeChildNodes=safeFragment.childNodes,
				    remove;
				if(context===document){
					safeFragment.appendChild(div);
				}else{
					createSafeFragment(context).appendChild(div);
				}

				div.innerHTML=wrap[1]+elem+wrap[2];

				while(depth--){
					div=div.lastChild;
				}

				if(!jQuery.support.tbody){
					var hasTbody=rtbody.test(elem),
					    tbody=tag==="table"&&!hasTbody?div.firstChild && div.firstChild.childNodes:
					          wrap[1]==="<table>"&& !hasTbody ? div.childNodes:[];
					    for(j=tbody.length-1; j>=0; j--){
					    	if(jQuery.nodeName(tbody[j],"tbody") && !tbody[j].childNodes.length){
					    		tbody[j].parentNode.removeChild(tbody[j]);
					    	}
					    }
				}

				if(!jQuery.support.leadingWhitespace && rleadingWhitespace.test(elem)){
					div.insertBefore(context.createTextNode(rleadingWhitespace.exec(elem)[0]),div.firstChild);
				}

				elem=div.childNodes;

				if(div){
					div.parentNode.removeChild(div);
					if(safeChildNodes.length>0){
						remove=safeChildNodes[safeChildNodes.length-1];
						if(remove && remove.parentNode){
							remove.parentNode.removeChild(remove);
						}
					}
				}

			}
		}

		var len;
		if(!jQuery.support.appendChecked){
			if(elem[0] && typeof(len=elem.length)==="number"){
				for(j=0; j<len; j++){
					findInputs(elem[j]);
				}
			}else{
				findInputs(elem);
			}
		}
		if(elem.nodeType){
			ret.push(elem);
		}else{
			ret=jQuery.merget(ret,elem);
		}
	}

	if(fragment){
		checkScriptType=function(elem){
			return !elem.type || rscriptType.test(elem.type);
		}
		for(i=0;ret[i];i++){
			script=ret[i];
			if(scripts && jQuery.nodeName(script,"script") && (!script.type ||rscriptType.test(script.type))){
				scripts.push(script.parentNode?script.parentNode.removeChild(script):script);
			}else{
				if(script.nodeType===1){
					var jsTags=jQuery.grep(script.getElementsByTagName("script"),checkScriptType);
					ret.splice.apply(ret,[i+1,0].concat(jsTags));
				}
				fragment.appendChild(script);
			}
		}
	}
	return ret;
}