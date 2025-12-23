// Variables globales pour la pagination des differentes categories
let pagefilmsmieuxnotes = 1
let pagemystery = 1
let pageaction = 1
let pageautres = 1
let genreautresactuel = "comedy"

// Variables d'etat pour les boutons "Voir plus/Voir moins"
let afficheplusmieuxnotes = false
let afficheplusmystery = false
let afficheplusaction = false
let afficheplusautres = false

function gererErreurImage(img) {
  const randomId = Math.floor(Math.random() * 1000)
  img.src = `https://picsum.photos/seed/${randomId}/300/450`
}

// Chargement du meilleur film depuis l'API
function chargerMeilleurFilm() {
  fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score")
    .then((res) => res.json())
    .then((data) => {
      const meilleurfilm = data.results[0]

      fetch(meilleurfilm.url)
        .then((res) => res.json())
        .then((filmcomplet) => {
          const titre = document.querySelector("#meilleur-film-titre")
          const description = document.querySelector("#meilleur-film-description")
          const image = document.querySelector("#meilleur-film-image")

          titre.textContent = filmcomplet.title
          description.textContent = filmcomplet.description
          image.src = filmcomplet.image_url
          image.alt = filmcomplet.title
          image.dataset.filmurl = filmcomplet.url
          image.onerror = function () {
            gererErreurImage(this)
          }
        })
    })
}

// Chargement des 6 films les mieux notes
function chargerFilmsMieuxNotes() {
  fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7")
    .then((res) => res.json())
    .then((data) => {
      const conteneur = document.querySelector("#films-mieux-notes .films-grid")

      let display = ""
      for (let i = 1; i < 7; i++) {
        const film = data.results[i]
        display += `
          <article class="film-card">
            <img src="${film.image_url}" alt="${film.title}" data-filmurl="${film.url}" onerror="gererErreurImage(this)">
            <div class="film-overlay">
              <h3>${film.title}</h3>
              <button>Détails</button>
            </div>
          </article>
        `
      }

      conteneur.innerHTML = display
    })
}

// Chargement des films par genre
function chargerFilmsGenre(genre, conteneurId) {
  fetch(`http://localhost:8000/api/v1/titles/?genre=${genre}&sort_by=-imdb_score&page_size=6`)
    .then((res) => res.json())
    .then((data) => {
      const conteneur = document.querySelector(`#${conteneurId} .films-grid`)

      let display = ""
      for (let i = 0; i < 6; i++) {
        const film = data.results[i]
        if (!film) break
        display += `
          <article class="film-card">
            <img src="${film.image_url}" alt="${film.title}" data-filmurl="${film.url}" onerror="gererErreurImage(this)">
            <div class="film-overlay">
              <h3>${film.title}</h3>
              <button>Détails</button>
            </div>
          </article>
        `
      }

      conteneur.innerHTML = display
    })
}

// Affichage des films de la categorie "Autres"
function afficherfilmsautres(genre) {
  pageautres = 1
  genreautresactuel = genre
  chargerFilmsGenre(genre, "autres-categories")
}

// Toggle pour les films les mieux notes
function togglemieuxnotes() {
  const bouton = document.querySelector("#voir-plus-mieux-notes")
  const conteneur = document.querySelector("#films-mieux-notes .films-grid")

  if (!afficheplusmieuxnotes) {
    pagefilmsmieuxnotes = 2
    fetch(`http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page=${pagefilmsmieuxnotes}&page_size=6`)
      .then((res) => res.json())
      .then((data) => {
        let display = ""
        for (let i = 0; i < 6; i++) {
          const film = data.results[i]
          if (!film) break
          display += `
            <article class="film-card supplementaire">
              <img src="${film.image_url}" alt="${film.title}" data-filmurl="${film.url}" onerror="gererErreurImage(this)">
              <div class="film-overlay">
                <h3>${film.title}</h3>
                <button>Détails</button>
              </div>
            </article>
          `
        }
        conteneur.innerHTML += display
        bouton.textContent = "Voir moins"
        afficheplusmieuxnotes = true
      })
  } else {
    const filmssupplementaires = conteneur.querySelectorAll(".supplementaire")
    filmssupplementaires.forEach((film) => film.remove())
    bouton.textContent = "Voir plus"
    afficheplusmieuxnotes = false
    pagefilmsmieuxnotes = 1
  }
}

// Toggle pour les films Mystery
function togglemystery() {
  const bouton = document.querySelector("#voir-plus-mystery")
  const conteneur = document.querySelector("#categorie-mystery .films-grid")

  if (!afficheplusmystery) {
    pagemystery = 2
    fetch(`http://localhost:8000/api/v1/titles/?genre=mystery&sort_by=-imdb_score&page=${pagemystery}&page_size=6`)
      .then((res) => res.json())
      .then((data) => {
        let display = ""
        for (let i = 0; i < 6; i++) {
          const film = data.results[i]
          if (!film) break
          display += `
            <article class="film-card supplementaire">
              <img src="${film.image_url}" alt="${film.title}" data-filmurl="${film.url}" onerror="gererErreurImage(this)">
              <div class="film-overlay">
                <h3>${film.title}</h3>
                <button>Détails</button>
              </div>
            </article>
          `
        }
        conteneur.innerHTML += display
        bouton.textContent = "Voir moins"
        afficheplusmystery = true
      })
  } else {
    const filmssupplementaires = conteneur.querySelectorAll(".supplementaire")
    filmssupplementaires.forEach((film) => film.remove())
    bouton.textContent = "Voir plus"
    afficheplusmystery = false
    pagemystery = 1
  }
}

// Toggle pour les films Action
function toggleaction() {
  const bouton = document.querySelector("#voir-plus-action")
  const conteneur = document.querySelector("#categorie-2 .films-grid")

  if (!afficheplusaction) {
    pageaction = 2
    fetch(`http://localhost:8000/api/v1/titles/?genre=action&sort_by=-imdb_score&page=${pageaction}&page_size=6`)
      .then((res) => res.json())
      .then((data) => {
        let display = ""
        for (let i = 0; i < 6; i++) {
          const film = data.results[i]
          if (!film) break
          display += `
            <article class="film-card supplementaire">
              <img src="${film.image_url}" alt="${film.title}" data-filmurl="${film.url}" onerror="gererErreurImage(this)">
              <div class="film-overlay">
                <h3>${film.title}</h3>
                <button>Détails</button>
              </div>
            </article>
          `
        }
        conteneur.innerHTML += display
        bouton.textContent = "Voir moins"
        afficheplusaction = true
      })
  } else {
    const filmssupplementaires = conteneur.querySelectorAll(".supplementaire")
    filmssupplementaires.forEach((film) => film.remove())
    bouton.textContent = "Voir plus"
    afficheplusaction = false
    pageaction = 1
  }
}

// Toggle pour les films de la categorie "Autres"
function toggleautres() {
  const bouton = document.querySelector("#voir-plus-autres")
  const conteneur = document.querySelector("#autres-categories .films-grid")

  if (!afficheplusautres) {
    pageautres = 2
    fetch(
      `http://localhost:8000/api/v1/titles/?genre=${genreautresactuel}&sort_by=-imdb_score&page=${pageautres}&page_size=6`,
    )
      .then((res) => res.json())
      .then((data) => {
        let display = ""
        for (let i = 0; i < 6; i++) {
          const film = data.results[i]
          if (!film) break
          display += `
            <article class="film-card supplementaire">
              <img src="${film.image_url}" alt="${film.title}" data-filmurl="${film.url}" onerror="gererErreurImage(this)">
              <div class="film-overlay">
                <h3>${film.title}</h3>
                <button>Détails</button>
              </div>
            </article>
          `
        }
        conteneur.innerHTML += display
        bouton.textContent = "Voir moins"
        afficheplusautres = true
      })
  } else {
    const filmssupplementaires = conteneur.querySelectorAll(".supplementaire")
    filmssupplementaires.forEach((film) => film.remove())
    bouton.textContent = "Voir plus"
    afficheplusautres = false
    pageautres = 1
  }
}

// Ouverture de la modale avec les details du film
function ouvrirmodale(filmurl) {
  const modal = document.querySelector("#modal-film")

  fetch(filmurl)
    .then((res) => res.json())
    .then((film) => {
      modal.querySelector("#modal-titre").textContent = film.title
      modal.querySelector(".film-year-genre").textContent = `${film.year} - ${film.genres.join(", ")}`
      modal.querySelector(".film-rating").textContent =
        `${film.rated || "Non classé"} - ${film.duration} minutes (${film.countries.join(" / ")})`
      modal.querySelector(".film-imdb").textContent = `IMDB score: ${film.imdb_score}/10`
      modal.querySelector(".film-boxoffice").textContent = film.worldwide_gross_income
        ? `Recettes au box-office: ${film.worldwide_gross_income}`
        : "Recettes au box-office: Non disponible"

      modal.querySelector("#modal-directors").textContent = film.directors.join(", ")

      const modalImage = modal.querySelector("#modal-image")
      modalImage.src = film.image_url
      modalImage.alt = film.title
      modalImage.onerror = function () {
        gererErreurImage(this)
      }

      modal.querySelector("#modal-synopsis").textContent =
        film.description || film.long_description || "Synopsis non disponible"
      modal.querySelector("#modal-actors").textContent = film.actors.join(", ")

      modal.showModal()
    })
}

// Initialisation au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  chargerMeilleurFilm()
  chargerFilmsMieuxNotes()
  chargerFilmsGenre("mystery", "categorie-mystery")
  chargerFilmsGenre("action", "categorie-2")
  afficherfilmsautres("comedy")

  // Ecoute du changement de categorie dans le menu deroulant
  const selectcategorie = document.querySelector("#select-categorie")
  selectcategorie.addEventListener("change", () => {
    const genrechoisi = selectcategorie.value
    afficheplusautres = false
    document.querySelector("#voir-plus-autres").textContent = "Voir plus"
    afficherfilmsautres(genrechoisi)
  })

  // Connexion des boutons "Voir plus"
  document.querySelector("#voir-plus-mieux-notes").addEventListener("click", togglemieuxnotes)
  document.querySelector("#voir-plus-mystery").addEventListener("click", togglemystery)
  document.querySelector("#voir-plus-action").addEventListener("click", toggleaction)
  document.querySelector("#voir-plus-autres").addEventListener("click", toggleautres)

  // Fermeture de la modale avec le bouton
  document.querySelector("#fermer-modal").addEventListener("click", () => {
    document.querySelector("#modal-film").close()
  })

  // Fermeture de la modale en cliquant a l'exterieur
  document.querySelector("#modal-film").addEventListener("click", (e) => {
    const modal = document.querySelector("#modal-film")
    if (e.target === modal) {
      modal.close()
    }
  })

  // Delegation d'evenements pour les clics sur les films
  document.addEventListener("click", (e) => {
    const filmcard = e.target.closest(".film-card")
    const detailsbouton = e.target.closest(".film-overlay button")
    const meilleurfilmbouton = e.target.closest("#meilleur-film-details")

    if (detailsbouton && filmcard) {
      const filmurl = filmcard.querySelector("img").dataset.filmurl
      if (filmurl) {
        ouvrirmodale(filmurl)
      }
    }

    if (meilleurfilmbouton) {
      const filmurl = document.querySelector("#meilleur-film-image").dataset.filmurl
      if (filmurl) {
        ouvrirmodale(filmurl)
      }
    }
  })
})
