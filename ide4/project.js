var express = require("express");
var router = express.Router({mergeParams:true});

let c = require("../CONST");
let DGW = require("../DGW")
let dgw = new DGW(c.appKey);


router.get("/",(req,res)=>{
	res.send("Welcome to IDE@4 Project");
});

router.get("/:projectId/",(req, res)=>{
	dgw.invokeByRestOutObject("royall.rms.project.get",{project_id:req.params.projectId})
		.then((data)=>{
			if (data._success){
				res.send("Welcome to IDE@4 for " + data._project.project_desc);
			} else {
				res.send(data._message);
			}
		})
		.catch(err=>{console.log(err);});
})

module.exports = router;