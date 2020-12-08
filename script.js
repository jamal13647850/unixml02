const createTableRow = (columns = []) => {
  let row = document.createElement("tr");
  columns.forEach((column) => {
    let cell = document.createElement("td");
    cell.appendChild(document.createTextNode(column));
    row.appendChild(cell);
  });
  return row;
};

const createTableHead = (headItems = [], allRows = []) => {
  let rowHead = document.createElement("tr");

  for (item of headItems) {
    let cellHead = document.createElement("th");
    cellHead.appendChild(document.createTextNode(item));
    rowHead.appendChild(cellHead);
  }
  return rowHead;
};

const createTable = (headItems = [], allRows) => {
  let tbl = document.getElementsByTagName("table")[0];
  if (tbl !== undefined) {
    tbl.remove();
  }

  let table = document.createElement("table");
  let tableBody = document.createElement("tbody");

  tableBody.appendChild(createTableHead(headItems));

  let rows = [];
  allRows.forEach((rowData) => {
    row = createTableRow(Object.values(rowData));
    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  document.body.appendChild(table);
};

const loadXMLDoc = () => {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      process(this);
    }
  };
  xmlhttp.open("GET", "./store.xml", true);
  xmlhttp.send();
};

const process = (xml) => {
  let xmlDoc;
  xmlDoc = xml.responseXML;
  let store = getStore(xmlDoc);
  let items = getItems(store);

  let allRows = [];
  for (let item of items) {
    let names = getTagAndAttr(item, "name_ghasemi", "language");

    let namesString = names.map((name) => {
      return name["attr"] + ": " + name["value"];
    });
    allRows.push({
      Code: getTag(item, "code_ghasemi"),
      Name: namesString.toString(),
      Inventory: getTag(item, "inventory_ghasemi"),
      Place: getTag(item, "place_ghasemi"),
      Supllier: getTag(item, "supplier_ghasemi"),
      OPoint: getTag(item, "opoint_ghasemi"),
      UnitVAlue: getTag(item, "unitvalue_ghasemi"),
    });
  }

  createTable(
    ["Code", "Name", "Inventory", "Place", "Supllier", "OPoint", "UnitVAlue"],
    allRows
  );
};

const getStore = (collection) => {
  return collection.getElementsByTagName("store_ghasemi")[0];
};

const getItems = (store) => {
  return store.getElementsByTagName("item_ghasemi");
};

const getTagAndAttr = (item, tagName, Attribute) => {
  let tags = item.getElementsByTagName(tagName);
  let tagAndAttr = [];
  for (let tag of tags) {
    tagAndAttr.push({
      attr: tag.getAttribute(Attribute),
      value: tag.innerHTML,
    });
  }

  return tagAndAttr;
};

const getTag = (item, tagName) => {
  return item.getElementsByTagName(tagName)[0].innerHTML;
};
