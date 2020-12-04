/*
PDFNumTree - represents a num tree object
*/

import PDFObject from './object';

class PDFNumTree {

  constructor() {
    this.Nums = {};
  }

    toString() {
    	const out = ['<<'];
    	out.push('/Nums [');
    	for (let key of Object.keys(this.Nums).sort()) {
    		out.push(`${key} ${PDFObject.convert(this.Nums[key])}`);
    }
    out.push(']');
    out.push('>>');
    return out.join(' ');
  }
}

export default PDFNumTree;