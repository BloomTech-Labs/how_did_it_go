const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema ({
   name : {
       type: String,
       required: true
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
   paymentIsCurrent : {
       type: Boolean,
       default: false
   }
})

const CompanyModel = mongoose.models('Company', companySchema);
module.exports = CompanyModel;