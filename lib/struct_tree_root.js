import PDFNumTree from './num_tree';
import PDFStructElem from './struct_elem';

class PDFStructTreeRoot {
	constructor(document, options = { expanded: false }) {
		this.document = document;
		this.options = options;
		this.structTreeData = {
				Type: 'StructTreeRoot'
				,ParentTreeNextKey: 0
				, K: []
		};
		this.structTreeData.ParentTree = this.document.ref(new PDFNumTree());		
		this.dictionary = this.document.ref(this.structTreeData);		
		this.children = [];
	}
	

	  addTag(structureType,contents, options = { expanded: false }) {
	    const result = new PDFStructElem(
	      this.document,
	      this.dictionary, /* this is a method of the root only */
	      structureType,
	      contents,
	      options
	    );
	    const ref = result.dictionary;
	    //console.log('new tag 1 = id '+ref.id);
	    const nextKey = this.structTreeData.ParentTreeNextKey;
	    const o = this.structTreeData;
	    o.ParentTree.data.Nums[nextKey] = ref; 
	    o.ParentTreeNextKey++;
	    o.K.push(ref);
	    this.children.push(result);
	    return result;
	  }
	  
	  addContent(ref) { // the root does not usually have content (mcids), but it could.
		 this.structTreeData.K.push(ref);
	  }
	  
	  endStructTreeRoot() {
		this.structTreeData.ParentTree.end();
		for (let child of this.children) {
			child.endStructElem();
		}
	    return this.dictionary.end();
	  }
}


export default PDFStructTreeRoot;
