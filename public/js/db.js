var dbPromised = idb.open("football", 1, function(upgradeDb) {
  var articlesObjectStore = upgradeDb.createObjectStore("tables", {
    keyPath: "id",
    autoIncrement:true
  });
  articlesObjectStore.createIndex("name", "name", { unique: false });
});



function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        const tx = db.transaction("tables", "readonly");
        const store = tx.objectStore("tables");
        return store.getAll();
      })
      .then(function(tables) {
        resolve(tables);
      });
  });
}

// function delete team

function deleteTeam(team) {
  dbPromised
    .then(function (db) {
      let tx = db.transaction("tables", "readwrite");
      let store = tx.objectStore("tables");
      console.log(team);
      store.delete(team);
      return tx.complete;
    })
    .then(function () {
      console.log("Database berhasil dihapus.");
      M.toast({
        html: `Removed from Database.`
      });
    })
    .catch(error => console.log(error));
}

// mengambil detail saved team
function getById(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        let tx = db.transaction("tables", "readonly");
        let store = tx.objectStore("tables");
        return store.get(id);
      })
      .then(function (team) {
        resolve(team);
      })
      .catch(error => {
        reject(error);
      })
  });
}

function saveForLater(data) {
  dbPromised
    .then(function(db) {
      const tx        = db.transaction("tables", "readwrite");
      const store     = tx.objectStore("tables");
      console.log(data);
      store.put(data);
  
      return tx.complete;
    })
    .then(function() {
      console.log("Data berhasil di simpan dan ditampilkan ke halaman note.");
      M.toast({
        html: `Add for Database.`
      });
    });
}
