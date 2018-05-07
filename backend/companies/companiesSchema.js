const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DEFAULT_MESSAGE = 'Hello! Thank you for coming in today! I hope you enjoyed your visit and will come see us again soon. In the meantime, could you do me a favor and leave us a review? Here is a link that will make it easy: ';
const DEFAULT_REVIEW_SITE = 'http://www.yelp.com';


const companySchema = new Schema ({
   name : {
       type: String,
       required: true,
       unique: true
   },
   address : {
       type: String
   },
   contactFirstName : {
       type: String,
       required: true
   },
   contactLastName : {
       type: String,
       required: true
   },
   contactEmail : {
       type: String,
       required: true
   },
   defaultMessage: {
       type: String,
       default: DEFAULT_MESSAGE,
       required: true,
   },
   reviewSite: {
       type: String,
       default: DEFAULT_REVIEW_SITE,
       required: true,
   },
   paymentIsCurrent : {
       type: Boolean,
       default: false
   }
})

const CompanyModel = mongoose.model('Company', companySchema);
module.exports = CompanyModel;