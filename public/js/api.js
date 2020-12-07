const base_url = "https://api.football-data.org/v2/competitions/";

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}



// Blok kode untuk melakukan request data json
function getArticles() {
  return new Promise(function(resolve, reject) {  
  if ('caches' in window) {
    caches.match(base_url + "2021/standings").then(function(response) {
      if (response) {
        response.json().then(function (data) {
          var articlesHTML = "";
          data.standings[0].table.forEach(function(key) {
            articlesHTML += `
              <div class="card">
                  <a href="./otherById.html?id=${key.team.id}">
                    <div class="card-image waves-effect waves-block waves-light">
                    <img src="${key.team.crestUrl}" alt="team"/>
                    </div>
                  </a>
                  <div class="card-content">
                    <span class="card-title truncate">${key.team.name}</span>
                    <p>Point: ${key.points}</p>
                    <p>Lost: ${key.lost}</p>
                    <p>Won: ${key.won}</p>
                  </div>
              </div>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #articles
          document.getElementById("articles").innerHTML = articlesHTML;
          resolve(data);
        })
      }
    })}

    fetch(base_url+"2021/standings",{
      method: "GET",
      headers: {

              "X-Auth-Token": "2562d52563c540fd88386a0342752e78"}
          })
      .then(status)
      .then(json)
      .then(function(data) {
        // Objek/array JavaScript dari response.json() masuk lewat data.
        // Menyusun komponen card artikel secara dinamis
        var articlesHTML = "";
        data.standings[0].table.forEach(function(key) {
          articlesHTML += `
                <div class="card">
                  <a href="./otherById.html?id=${key.team.id}">
                    <div class="card-image waves-effect waves-block waves-light">
                    <img src="${key.team.crestUrl}" />
                    </div>
                  </a>
                  <div class="card-content">
                    <span class="card-title truncate">${key.team.name}</span>
                    <p>Point: ${key.points}</p>
                    <p>Lost: ${key.lost}</p>
                    <p>Won: ${key.won}</p>
                  </div>
                </div>
              `;
        });
        // Sisipkan komponen card ke dalam elemen dengan id #content
        // document.getElementById("body-content").innerHTML = articlesHTML;
      })
      .catch(error);
  });
}

function getSavedArticles() {
  getAll().then(function(key) {
    console.log(key);
    // Menyusun komponen card artikel secara dinamis
    var tablesHTML = "";
    key.forEach(function(key) {
      console.log("data dari db");
      tablesHTML += `
                  <tr key= "team.id">

                      <td>
                      <a href="./otherById.html?id=${key.id}">
                      ${key.name}
                      </a>
                      </td>
                      <td>${key.address}</td>
                      <td>${key.area.name}</td>
                      <td>${key.activeCompetitions[0].name}</td>
                      <td>${key.activeCompetitions[0].plan}</td>
                  </tr>
                  
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("tables").innerHTML = tablesHTML;
  });
}

