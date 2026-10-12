function renderProject(project) {
  const li = document.createElement("li");
  li.className = "entry";

  const head = document.createElement("div");
  head.className = "entry-head";

  const titleLink = document.createElement("a");
  titleLink.className = "entry-title";
  titleLink.href = project.link;
  titleLink.target = "_blank";
  titleLink.rel = "noopener";
  titleLink.textContent = project.title;

  const tag = document.createElement("span");
  tag.className = "entry-date";
  tag.textContent = project.tag;

  head.append(titleLink, tag);

  const desc = document.createElement("p");
  desc.className = "entry-desc";
  desc.textContent = project.description;

  li.append(head, desc);
  return li;
}

// load projects.json file
async function loadProjects() {
  const list = document.getElementById("projects-list");
  try {
    const res = await fetch("projects.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const projects = await res.json();

    const fragment = document.createDocumentFragment();
    projects.forEach((p) => fragment.appendChild(renderProject(p)));
    list.appendChild(fragment);
  } catch (err) {
    console.error("Failed to load projects:", err);
    list.innerHTML =
      '<li class="entry"><p class="entry-desc">Could not load projects.</p></li>';
  }
}

// footer (year)
document.getElementById("year").textContent = new Date().getFullYear();

loadProjects();
