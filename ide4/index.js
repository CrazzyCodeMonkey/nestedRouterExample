let express = require("express");
let project = require("./project");
let router = express.Router();

let c = require("../CONST");
let DGW = require("../DGW")
let dgw = new DGW(c.appKey);

router.get("/",(req,res)=>{
	res.send("Welcome to IDE@4 School");
});

router.get("/:schoolId/",(req, res)=>{
	dgw.invokeByRestOutObject("royall.rms.school.get",{school_id:req.params.schoolId})
		.then(data=>{
			res.send("Welcome to IDE@4 for " + data._school.school_name);
		});
})

router.use("/:schoolId/project", project);

module.exports = router;