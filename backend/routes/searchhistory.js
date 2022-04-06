const express = require("express");
const router = express.Router();
const search = require("../model/search");
const bodyparser = require("body-parser");
router.use(bodyparser());
router.use(bodyparser.urlencoded({ extended: false }));
router.get("/allsearch", async (req, res) => {
    const searches = await search.find({userId:req.user});
    res.json(searches)
    // res.status(200).json({
    //     status: "success",
    //     searches
    // });
})

router.post("/search", async (req, res) => {
    try {
        const searchs= await search.create({
            userId:req.userId,
            id:req.body.id,
            title: req.body.title,
            description:req.body.description
        })
        res.status(200).json({
            status: " search is created  successfully",
            data: searchs
        })
    }
    catch (e) {
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
})

router.get("/allsearch/:title", async (req, res) => {
    try {
        const searchs = await search.find({title: req.params.title,userId: req.user})
        res.json(searchs)
        // return res.status(200).json({
        //     status: "Success",
        //     searchs
        // })

    } catch (e) {
        return res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
})
module.exports = router;