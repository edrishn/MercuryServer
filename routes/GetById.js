// var express = require("express");
// var router = express.Router();
// var fs = require("fs");
var northwind = require("northwind-data");
var { rest } = require("msw");

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./storage");
}

// let obj = {
//   $id: 1,
//   $type: "Northwind.Product, Northwind.Business",
//   ID: 1,
//   ProductName: "Chai",
//   UnitPrice: 470
// };
// localStorage.setItem("Product_1", JSON.stringify(obj));

module.exports = rest.get("/", function (req, res, ctx) {
  let entityType;
  if (req.url.searchParams.get("type"))
    entityType = req.url.searchParams.get("type");
  else if (req.url.searchParams.get("entityType"))
    entityType = req.url.searchParams.get("entityType");
  let requestedItemKey = entityType + "_" + req.url.searchParams.get("id");
  let fromLS = localStorage.getItem(requestedItemKey);
  if (fromLS) {
    return res(ctx.status(200), ctx.json(JSON.parse(fromLS)));
  } else {
    let obj = northwind.Products.find(
      (item) => item.Id === Number.parseInt(req.url.searchParams.get("id"))
    );
    return res(
      ctx.status(200),
      ctx.json({
        $id: obj.Id,
        $type: "Northwind." + entityType + ", Northwind.Business",
        ID: obj.Id,
        ProductName: obj.ProductName,
        UnitPrice: obj.UnitPrice
      })
    );
  }
});
