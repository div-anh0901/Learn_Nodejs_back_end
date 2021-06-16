const mongoose = require("mongoose");
const marked =  require('marked');
const slugify = require("slugify");
const createDomPurity = require("dompurify");
const {JSDOM} = require("jsdom");
const dompurify= createDomPurity(new JSDOM().window);

const articlesSchema = new mongoose.Schema({
    title : {
        type:String,
        required : true
    },
    description :{
        type :String
    },
    markdown : {
        type : String,
        require: true
    },
    createAt : {
        type :Date,
        default : Date.now()
    },
    slug:{
        type : String,
        require : true,
        unique : true
    },
    sanitizedHtml : {
        type :String,
         required: true
    }

});
articlesSchema.pre("validate", function(next){
    if(this.title){
        this.slug = slugify(this.title, { lower : true , strict : true})
    }

    if(this.markdown){
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
    }
    next();
})

module.exports = mongoose.model('article', articlesSchema);