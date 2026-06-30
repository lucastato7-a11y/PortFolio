/* =========================================================
   script.js — Portfolio de Lucas
========================================================= */

/* ---------------------------------------------------------
   1. DATOS — ARRAYS
--------------------------------------------------------- */

const proyectos = [
  {
    nombre: "Portfolio Web",
    descripcion: "Sitio personal hecho con HTML y CSS.",
    tecnologias: ["HTML", "CSS"],
    link: "#"
  },
  {
    nombre: "Landing Page",
    descripcion: "Diseño moderno responsive.",
    tecnologias: ["HTML", "CSS"],
    link: "#"
  },
  {
    nombre: "Proyecto JS",
    descripcion: "App interactiva con JavaScript.",
    tecnologias: ["JavaScript"],
    link: "#"
  },
  {
    nombre: "Buscador de turnos",
    descripcion: "Mini sistema para reservar turnos con validación de horarios.",
    tecnologias: ["HTML", "CSS", "JavaScript"],
    link: "#"
  }
];

const skills = [
  { nombre: "HTML", area: "Estructura y Semántica", nivel: "Avanzado" },
  { nombre: "CSS", area: "Diseño y Animaciones", nivel: "Avanzado" },
  { nombre: "JavaScript", area: "Interactividad y Lógica", nivel: "Intermedio" },
  { nombre: "Git", area: "Control de Versiones", nivel: "Intermedio" }
];

/* ---------------------------------------------------------
   2. PROYECTOS — render + filtro (funcionalidad principal #1)
--------------------------------------------------------- */

function crearCardProyecto(proyecto) {
  const card = document.createElement("div");
  card.classList.add("card");

  const titulo = document.createElement("h3");
  titulo.textContent = proyecto.nombre;

  const desc = document.createElement("p");
  desc.textContent = proyecto.descripcion;

  const tagsBox = document.createElement("div");
  tagsBox.classList.add("card-tags");
  proyecto.tecnologias.forEach(function (tec) {
    const tag = document.createElement("span");
    tag.classList.add("card-tag");
    tag.textContent = tec;
    tagsBox.appendChild(tag);
  });

  const boton = document.createElement("a");
  boton.classList.add("card-btn");
  boton.href = proyecto.link;
  boton.textContent = "Ver";

  card.addEventListener("mouseover", function () {
    titulo.textContent = proyecto.nombre + " — " + proyecto.tecnologias.join(" / ");
  });
  card.addEventListener("mouseout", function () {
    titulo.textContent = proyecto.nombre;
  });

  card.appendChild(titulo);
  card.appendChild(desc);
  card.appendChild(tagsBox);
  card.appendChild(boton);

  return card;
}

function renderProyectos(filtro) {
  const contenedor = document.getElementById("cards-container");
  const vacio = document.getElementById("proyectos-empty");
  contenedor.innerHTML = "";

  const filtrados = filtro === "Todos"
    ? proyectos
    : proyectos.filter(function (p) {
        return p.tecnologias.includes(filtro);
      });

  vacio.hidden = filtrados.length !== 0;

  filtrados.forEach(function (proyecto) {
    contenedor.appendChild(crearCardProyecto(proyecto));
  });
}

function renderFiltrosProyectos() {
  const barra = document.getElementById("filter-bar");
  barra.innerHTML = "";

  const tecnologiasUnicas = ["Todos"];
  proyectos.forEach(function (proyecto) {
    proyecto.tecnologias.forEach(function (tec) {
      if (!tecnologiasUnicas.includes(tec)) {
        tecnologiasUnicas.push(tec);
      }
    });
  });

  tecnologiasUnicas.forEach(function (tec) {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.classList.add("filter-btn");
    boton.textContent = tec;
    if (tec === "Todos") boton.classList.add("active");

    boton.addEventListener("click", function () {
      document.querySelectorAll(".filter-btn").forEach(function (b) {
        b.classList.remove("active");
      });
      boton.classList.add("active");
      renderProyectos(tec);
    });

    barra.appendChild(boton);
  });
}

/* ---------------------------------------------------------
   3. SKILLS — render + buscador (funcionalidad principal #2)
--------------------------------------------------------- */

function renderSkills() {
  const grid = document.getElementById("skills-grid");
  grid.innerHTML = "";

  skills.forEach(function (skill) {
    const card = document.createElement("div");
    card.classList.add("skill-card");
    card.dataset.nombre = skill.nombre.toLowerCase();

    const titulo = document.createElement("h3");
    titulo.textContent = skill.nombre;

    const area = document.createElement("p");
    area.textContent = skill.area;

    const nivel = document.createElement("span");
    nivel.classList.add("skill-level");
    nivel.textContent = "Nivel: " + skill.nivel;

    card.appendChild(titulo);
    card.appendChild(area);
    card.appendChild(nivel);
    grid.appendChild(card);
  });
}

function filtrarSkills(texto) {
  const termino = texto.trim().toLowerCase();
  const cards = document.querySelectorAll(".skill-card");
  const vacio = document.getElementById("skills-empty");
  let visibles = 0;

  cards.forEach(function (card) {
    const coincide = card.dataset.nombre.includes(termino);
    card.classList.toggle("is-hidden", !coincide);
    if (coincide) visibles++;
  });

  vacio.hidden = visibles !== 0;
}

/* ---------------------------------------------------------
   4. EVENTOS PRINCIPALES
--------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
  renderFiltrosProyectos();
  renderProyectos("Todos");
  renderSkills();

  document.getElementById("skills-search-input").addEventListener("input", function (evento) {
    filtrarSkills(evento.target.value);
  });
});
