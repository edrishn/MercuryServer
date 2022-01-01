var { rest } = require("msw");

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./storage");
}

module.exports = rest.post("/", function (req, res, ctx) {
  let entityType = req.body.entities[0].entityAspect.entityTypeName.split(
    ":"
  )[0];
  let id = req.body.entities[0].ID;
  let originalValuesMap = req.body.entities[0].entityAspect.originalValuesMap;
  let changedPropName = Object.keys(originalValuesMap)[0];
  let newPropVal = req.body.entities[0][changedPropName];

  if (entityType === "Product") {
    let firstEntity = {
      $id: "2",
      $type: "Northwind.Product, Northwind.Business",
      ID: 1,
      ProductName: "Chai",
      UnitPrice: newPropVal
    };
    localStorage.setItem(entityType + "_" + id, JSON.stringify(firstEntity));
    return res(
      ctx.status(200),
      ctx.json({
        $id: "1",
        $type: "Workbench.Server.SaveResult, Workbench.Core",
        Entities: [firstEntity],
        KeyMappings: [],
        Errors: null
      })
    );
  } else if (entityType === "Category") {
    let firstEntity = {
      $id: "2",
      $type: "Northwind.Category, Northwind.Business",
      ID: 1,
      CategoryName: newPropVal
    };
    localStorage.setItem(entityType + "_" + id, JSON.stringify(firstEntity));
    return res(
      ctx.status(200),
      ctx.json({
        $id: "1",
        $type: "Workbench.Server.SaveResult, Workbench.Core",
        Entities: [firstEntity],
        KeyMappings: [],
        Errors: null
      })
    );
  }
});

/* GET users listing. */
// function GetItemKey(type, id) {
//   return "./data/" + type + "-" + id + ".json";
// }

// router.post("/", function (req, res, next) {
//   console.log("req is: ", req.body);
//   let entityType = req.body.entities[0].entityAspect.entityTypeName.split(
//     ":"
//   )[0];
//   console.log("type: ", entityType);
//   let id = req.body.entities[0].ID;
//   let originalValuesMap = req.body.entities[0].entityAspect.originalValuesMap;
//   let changedPropName = Object.keys(originalValuesMap)[0];
//   let newPropVal = req.body.entities[0][changedPropName];
//   console.log("new Val: ", newPropVal);

//   if (entityType === "Product") {
//     let firstEntity = {
//       $id: "2",
//       $type: "Northwind.Product, Northwind.Business",
//       ID: 1,
//       ProductName: "Chai",
//       UnitPrice: newPropVal
//     };

//     let filePath = GetFileName(entityType, id);
//     fs.writeFile(filePath, JSON.stringify(firstEntity), function (err) {
//       if (err) throw err;
//       console.log("Results Received");
//     });

//     res.send({
//       $id: "1",
//       $type: "Workbench.Server.SaveResult, Workbench.Core",
//       Entities: [firstEntity],
//       KeyMappings: [],
//       Errors: null
//     });
//   } else if (entityType === "Category") {
//     let firstEntity = {
//       $id: "2",
//       $type: "Northwind.Category, Northwind.Business",
//       ID: 1,
//       CategoryName: newPropVal
//     };
//     let filePath = GetFileName(entityType, id);
//     fs.writeFile(filePath, JSON.stringify(firstEntity), function (err) {
//       if (err) throw err;
//       console.log("Results Received");
//     });

//     res.send({
//       $id: "1",
//       $type: "Workbench.Server.SaveResult, Workbench.Core",
//       Entities: [firstEntity],
//       KeyMappings: [],
//       Errors: null
//     });
//   }
// });

// module.exports = router;
