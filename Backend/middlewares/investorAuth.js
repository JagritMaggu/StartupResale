function requireInvestor(req,res,next){
if(req.user?.role !== "investor"){
    return res.status(403).json({error:"Unuthorised"});
}
next();
}

module.exports = {requireInvestor}