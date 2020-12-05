import PDFStructTreeRoot from '../struct_tree_root';

export default {
   initStructTreeRoot() {
	   this.structTreeRoot = new PDFStructTreeRoot(this,{});
    return (this.structTreeRoot);
  },

  endStructTreeRoot() {
	this.structTreeRoot.endStructTreeRoot();
    this._root.data.StructTreeRoot = this.structTreeRoot.dictionary;
  
    
//	console.log('HELLO '+Object.keys(this._root.data).map((k) => {return k}).toString());
//	console.log(Object.values(this.document._root.data).map((v) => {return typeof v}));
  }
};
