let base_url = "https://api.football-data.org/v2/";
const authToken = "2562d52563c540fd88386a0342752e78";

const fetchApi = (base_url, id) => {
    return fetch(`{base_url}competitions/${id}/teams`, {
        headers : {
            'X-Auth-Token' : authToken
        }
    });
};

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
    alert(error);
  }

//cache all team list 
function cacheCompetition(id) {
    fetchApi(base_url, id)
        .then(status);
}

// Blok kode untuk melakukan request data json menurut ID (details)
function getTeamById() {

    return new Promise(function (resolve, reject) {
      // Ambil nilai query parameter (?id=)
      let urlParams = new URLSearchParams(window.location.search);
      let idParam = urlParams.get("id");
  
      if ('caches' in window) {
        caches.match(base_url + "teams/" + idParam).then(function (response) {
            if (response) {
              response.json().then(function (data) {
              
  
                showSquadMember(data);
                resolve(data);
              });
            }
          })
          .catch(error);
      }
  
  
      fetch(base_url + "teams/" + idParam, {
          headers: {
            "X-Auth-Token": authToken
          }
        })
        .then(status)
        .then(json)
        .then(function (data) {
        
  
          showSquadMember(data);
          resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }

 
  function showSquadMember(data) {
    let nameHTML = `
            <a>${data.name}</a>
        `;
    let squadHTML = `
            <div class="row">
              <div class="col s1"><b>#</b></div>
              <div class="col s3"><b>Name</b></div>
              <div class="col s3"><b>Position</b></div>
              <div class="col s3"><b>Nationality</b></div>
              <div class="col s2"><b>Role</b></div>
            </div><hr>
          `;
    
    data.squad.forEach(squad => {
      let shirtNumber = "";
      let position = "";
  
      (squad.shirtNumber === null) ? (shirtNumber = "-") : (shirtNumber = squad.shirtNumber);
      (squad.position === null) ? (position = "-") : (position = squad.position);
        
      nameHTML = `
            <a>${data.name}</a>
             `;
      squadHTML += `
              <div class="row">
                <div class="col s1">${shirtNumber}</div>
                <div class="col s3">${squad.name}</div>
                <div class="col s3">${position}</div>
                <div class="col s3">${squad.nationality}</div>
                <div class="col s2">${squad.role}</div>
              </div><hr>
            `;
    });
    //squad-member
    document.getElementById("body-content").innerHTML = squadHTML;
    document.getElementById("logo-container").innerHTML = nameHTML;
  }
  


