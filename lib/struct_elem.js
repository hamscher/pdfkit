class PDFStructElem {
  constructor(document, parent, structureType, contents, options = { expanded: false }) {
	  /* required from pp.591-592 */
	  /* S - name - structure type from section 9.6.2 */
	  /* P - dictionary - immediate parent structure element. */ 
	  /* options from pp.591-592 */
	  /* ID - string - element identifier */
	  /* Pg - dictionary - indirect reference to a page object */
	  /* K - integer|array|dictionary - contents - refs, not other structElem */
	  /* A - dictionary|stream - attributes */
	  /* C - name|array - attribute class or classes */
	  /* R - integer - revision number */
	  /* T - text string - title */
	  /* Lang - text string - Language Identifier */
	  /* Alt - text string - Alternate of elt and children */
	  /* ActualText - text string - replacement text */
	this.document = document;
    this.options = options
    this.structElemData = {
    		S : structureType
    		, P : parent 
    		, K : ((Array.isArray(contents)) ? contents 
    				: ((typeof contents == 'number') ? [contents] : []))
    		};
    if (this.document.page != null) {
    	this.structElemData.Pg = this.document.page.dictionary /* Pg is optional but defaults to current page. */
    }
    for (let key in options) {
    	if (['S','P','Type'].indexOf(key)>0) continue; /* ignore required params that appear among the options */
    	let val = options[key];
    	if (typeof val == 'string') {
    		val = new String(val);
    	}
    	this.structElemData[key] = val;
    }
    this.structElemData['Type'] = 'StructElem';
    this.dictionary = this.document.ref(this.structElemData);
    this.children = []; /* other structElem, not refs */
  }
  
  addTag(structureType,contents, options = { expanded: false }) {
	    const result = new PDFStructElem(
	      this.document,
	      this.dictionary, /* this is a method of a non-root only */
	      structureType,
	      contents, // may be empty initially
	      options
	    );
	    const ref = result.dictionary;
	    //console.log('new tag 1 = id '+ref.id);
	    const root = this.document.structTreeRoot.structTreeData;
	    const nextKey = root.ParentTreeNextKey;
	    root.ParentTree.data.Nums[nextKey] = ref; // Could be a new object consisting of a single-item list
	    root.ParentTreeNextKey++;
	    this.structElemData.K.push(ref);
	    this.children.push(result);
	    return result;
	  }
  
  addContent(ref) { // add content - an mcid - after creation.
		 this.structElemData.K.push(ref);
	  }


  endStructElem() {
	  for (let child of this.children) {       
		  child.endStructElem();
      	}
    // console.log('about to do the dict');
    // console.log({}.toString.call(this.dictionary));
    // console.log(Object.keys(this.structElemData));
    return this.dictionary.end();
  }
}

export default PDFStructElem;
