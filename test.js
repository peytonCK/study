function init(selector, context, rootjQuery) {
	var match, elem, ret, doc;

	if (!selector) {
		return this;
	}

	if (selector.nodeType) {
		this.context = this[0] = selector;
		this.selector = selector; //？
		this.length = 1;
		return this;
	}

	if (selector === "body" && !context && document.body) {
		this.context = document;
		this.selector = selector;
		this[0] = document.body;
		this.length = 1;
		return this;
	}

	if (typeof selector === "String") {
		if (selector.charAr(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length > 3) {
			match = [null, selector, null];
		} else {
			match = quickExpr.exec(selector);
		}

		if (match && (match[1] || !context)) {
			if (match[1]) {
				context = context instanceof jQuery ? context[0] : context;
				doc = (context ? context.ownerDocument || context : document);

				ret = rsingleTag.exec(selector);
				if (ret) {
					if (jQuery.isPlainObject(context)) {
						selector = document.createElement(ret[1]);
						jQuery.fn.attr.call(selector, context, true);
					} else {
						selector = document.createElement(ret[1]);
					}

				} else {
					ret = jQuery.buildFragment([match[1]], [doc]);
					selector = (ret.cacheable ? jQuery.clone(ret.fragment) : ret.fragment).childNodes;

				}

				jQuery.merge(selector, this);

			} else if (match[2]) {
				elem = document.getElementById(match[2]);

				if (elem && elem.parentNode) {
					if (elem.id !== match[2]) {
						return rootjQuery.find(selector);
					}
					this[0] = elem;
					this.length = 1;
				}

				this.context = document;
				this.selector = selector;
				return this;
			}



		} else if (!context || context.jQuery) {
			return (context || rootjQuery).find(selector);
		} else {
			return this.constructor(context).find(selector);
		}


	} else if (jQuery.isFunction(selector)) {
		rootjQuery.ready(selector);
	}
	if (selector.selector !== undefined) {
		this.selector = selector.selector;
		this.context = selector.context;
	}
	return jQuery.makeArray(this, selector);
}