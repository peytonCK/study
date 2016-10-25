function buildFragment(args,nodes,scripts){
   var fragment,cacheable,cacheresults,doc,first=args[0];

   if(node&&node[0]){
   	 doc=nodes[0].ownerDocument||nodes[0];
   }
   
   if(!doc.createDocumentFragment){
   	 doc=document;
   }

   if(args.length===1 && typeof first==="string" && first.length<512 && doc===document &&
   	  first.charAt(0)==="<" && !rnocache.test(first) && (jQuery.support.checkClone ||!rchecked.test(first))
   	  && (jQuery.support.html5Clone || !rnoshimcache.test(first))){
   	  cacheable=true;

   	 cacheresults=jQuery.fragments[first];
   	 if(cacheresults && cacheresults!==1){
   	 	fragment=cacheresults;
   	 }
   }
   
   if(!fragment){
   	 fragment=doc.createDocumentFragment();
   	 jQuery.clean(args,doc,fragment,scripts);
   }

   if(cacheable){
   	 jQuery.fragments[first]=cacheresults?fragment:1;
   }

   return {fragment:fragment,cacheable:cacheable};

}



function buildFragment(args,nodes,scripts){
	var fragment,cacheable,cacheresults,doc,first=args[0];

	if(node && node[0]){
		doc=nodes[0].ownerDocument||document;
	}

	if(!doc.createDocumentFragment){
		doc=docuemnt;
	}
    
    if(args.length===1 && typeof first === "string" && first.length<512 && doc===document &&
    	first.charAt(0)==="<" && !rnocache.test(first) &&(jQuery.support.checkClone || !rchecked.test(first))
    	&& (jQuery.support.html5Clone || !rnoshimcache.test(first)) ){
    	cacheable=true;
        cacheresults=jQuery.fragments[first];
        if(cacheresults && cacheresults!==1){
        	fragment=cacheresults;
        }
    }

    if(!fragment){
    	fragment=doc.createDocumentFragment();
    	jQuery.clean(args,doc,fragment,scripts);
    }

    if(cacheable){
    	jQuery.fragments[first]=cacheresults?fragment:1;
    }

    return {fragment:fragment,cacheable:cacheable};

}