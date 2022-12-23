const express = require("express");
const router = new express.Router();

const items = require("./fakeDb")

router.get("/", function(req,res) {
    return res.json(items)
})

router.post("/", function(req, res) {
    itemName = req.body.name;
    itemPrice = req.body.price;
    item = {"name":itemName, "price": itemPrice}
    items.push(item)
    return res.status(201).json({"added":item}).statusCode(201)
})

router.get("/:name", function(req,res) {
    itemName = req.params.name
    item = items.find(i => i["name"] === itemName)
    return res.json(item)
})

router.patch("/:name", function(req,res){
    itemName = req.params.name
    item = items.find(i => i["name"] === itemName)
    newItemName = req.body.name
    newItemPrice = req.body.price
    item["name"] = newItemName
    item["price"] = newItemPrice
    return res.status(201).json({"updated":item})
})

router.delete("/:name", function(req,res){
    itemName = req.params.name
    const itemIndex = items.findIndex(i => i["name"] === itemName)
    items.splice(itemIndex,1)
    return res.status(201).json({"msg":"Deleted"})
})

module.exports = router;