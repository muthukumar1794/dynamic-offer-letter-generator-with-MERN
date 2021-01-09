const Candidates = require('../model/employee')
const path = require('path')
const fs = require('fs')
const PDFDOC = require('pdfkit')

exports.getHome = async(req,res,next)=>{
try{
const candids = await Candidates.find()
        res.status(201).json({
            message: "success",
            response: candids
        })

}

catch(err){
    throw err
}
}

exports.addEmployee = async(req,res,next)=>{
    console.log("ooooooooooo",req.body)
    try{
    const body = req.body
    const posts = await new Candidates({
        name: body.name,
        email: body.email,
        mobNo: body.number,
        city: body.city,
        state:body.state,
        zip:body.zip,
        selected:body.selected
})
    const success = await posts.save()
        res.status(201).json({
            message: "success",
            response: success
        })
}
catch(err){
    throw err
}
}
exports.appointmentPDF = (req,res,next)=>{

    const orderID =  req.params.id
    console.log("orderid",orderID.toString())
    var today = new Date();
    const date = String(today.getDate()).padStart(2, '0');
    const mon = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const year = today.getFullYear();
    

today = date + '/' + mon + '/' + year;

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

var exday = new Date()
var expday = exday.addDays(15)
const dd = String(expday.getDate()).padStart(2, '0');
const mm = String(expday.getMonth() + 1).padStart(2, '0'); //January is 0!
const yy = expday.getFullYear();
expday = dd + '/' + mm + '/' + yy;


    Candidates.findById({_id:orderID.toString()})
      .then(order=>{
          console.log("IIIINNNNN",order)
        
      const invoiceName = "order.pdf"
      const invoicePath = path.dirname(process.mainModule.filename)
      const camelCaseIt = string => string.toLowerCase().trim().split(/[.\-_\s]/g).reduce((string, word) => string + word[0].toUpperCase() + word.slice(1));
     
      String.prototype.toTitle = function() {
        return this.replace(/(^|\s)\S/g, function(t) { return t.toUpperCase() });
      }

  const pdf = new PDFDOC()
  res.setHeader('Content-Type','application/pdf')
  res.setHeader('Content-Disposition','attachment;filename='+order.name+'.pdf')
        pdf.pipe(fs.createWriteStream(path.join(invoicePath,'images','invoices',invoiceName)))
        
        pdf.pipe(res)
        
              
         
          pdf.fontSize(15).text("Offer Letter",{
            align: 'center'
          })
          pdf.text('\n')
          pdf.fontSize(15).text("KGISL",{
            align: 'right'
          }).text(today,{
            align: 'left'
          })
        
          pdf.text('\n') 
          pdf.fontSize(15).text(order.name.toTitle()+",")
          pdf.fontSize(15).text(order.city.toTitle()+",") 
          pdf.fontSize(15).text(order.state.toTitle()+",") 
          pdf.fontSize(15).text(order.zip+",") 
          pdf.fontSize(15).text("Mob-"+order.mobNo+".")
          pdf.text('\n') 
          pdf.fontSize(15).text("Dear "+order.name.toTitle()+",")
          pdf.text('\n') 
          pdf.fontSize(15).text("We are pleased to offer you the full-time position of Associate at KGISL with a start date of "+today+", contingent upon background check. You will be reporting directly to Manager at Coimbatore. We believe your skills and experience are an excellent match for our company.")
          pdf.text('\n') 
          pdf.fontSize(15).text("In this role, you will be required to job duties and responsibilities.")
      
 
             
            pdf.text('\n') 

            pdf.fontSize(15).text("As an employee of KGISL, you are also eligible for our benefits program, which includes medical insurance and other benefits which will be described in more detail in the employee handbook.")
                
            pdf.text('\n') 

            pdf.fontSize(15).text("Please confirm your acceptance of this offer by signing and returning this letter by "+expday+".")
            
            pdf.text('\n') 
        
            pdf.fontSize(15).text("We are excited to have you join our team! If you have any questions, please feel free to reach out at any time.")
            
            pdf.text('\n') 
        
            pdf.fontSize(15).text("Sincerely,")
            pdf.fontSize(15).text("Ram,")
            pdf.fontSize(15).text("HR")
            pdf.text('\n') 
            pdf.fontSize(15).text("Signature: Ram")
            pdf.fontSize(15).text("Date: "+today)

        
  
  
            pdf.end()
  
      }).catch(error=>{
          console.log("pppppppppppppp")
          throw error
      })
  }