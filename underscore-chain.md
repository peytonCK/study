# 链式
``` javascript
    var _=function(obj){
        if(obj instanceof _) return obj;
        if(!(this instanceof _)) return new _(obj);
        this._wrapped=obj;
    };
    
    _.chain=function(obj){
        var instance=_(obj);
        instance._chain=true;
        return instance;
    };

    var result=function(instance, obj){
        return instance._chain?_(obj).chain():obj;
    };

    var _.mixin=function(obj){
        _.each(_.function(obj),function(name){
            var func=_[name]=obj[name];
            _.prototype[name]=function(){
                var args=[this._wrapped];
                push.apply(args,arguments);
                return result(this,func.apply(_,args));
            };
        });
    }

    _.mixin(_);

    _.each(['pop','push','reverse','shift','sort','splice','unshift'],function(         name){
            var method=ArrayProto[name];
            _.prototype[name]=function(){
                var obj=this._wrapped;
                method.apply(obj,arguments);
                if((name==='shift' || name==='splice')&& obj.length===0) delete obj[0];
                return result(this,obj);
            }
    });
    
    _.each(['concat','join','slice'],function(name){
        var method=ArrayProto[name];
        _.prototype[name]=function(){
            return result(this,method.apply(this._wrapped,arguments));
        };
    });
    
    _.prototype.value=function(){
        return this.wrapped;
    }

```