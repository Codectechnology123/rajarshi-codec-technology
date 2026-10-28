const $ = (selector) => document.querySelector(selector);
const escapeHTML = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
async function getJSON(url) { const response = await fetch(url); if (!response.ok) throw new Error('Request failed'); return response.json(); }
async function loadProfile() {
 try {
  const { data } = await getJSON('/api/profile');
  $('#hero-name').innerHTML = escapeHTML(data.name) + '<span class="accent">.</span>';
  $('#hero-role').textContent = data.role || '';
  $('#hero-intro').textContent = data.intro || '';
  $('#about-text').textContent = data.about || '';
  $('#hero-location').textContent = data.location || '';
  $('#availability').textContent = data.availability || '';
  if (data.email) { $('#contact-email').textContent = data.email + ' ↗'; $('#contact-email').href = 'mailto:' + data.email; }
 } catch (error) { console.warn('Using default profile content.'); }
}
async function loadSkills() {
 const container = $('#skills-grid');
 try {
  const { data } = await getJSON('/api/skills');
  container.innerHTML = data.map((skill) => `<article class="skill-card"><span class="skill-dot"></span><h3>${escapeHTML(skill.name)}</h3><p>${escapeHTML(skill.category)} · ${escapeHTML(skill.level)}</p></article>`).join('');
 } catch (error) { container.innerHTML = '<p class="loading-state">Skills will appear here soon.</p>'; }
}
async function loadProjects() {
 const container = $('#projects-grid');
 try {
  const { data } = await getJSON('/api/projects');
  container.innerHTML = data.map((project, index) => `<article class="project-card"><div class="project-top"><span class="project-number">0${index + 1}</span><span class="project-status">${escapeHTML(project.status || 'Project')}</span></div><h3>${escapeHTML(project.title)}</h3><p>${escapeHTML(project.description)}</p><div class="tag-list">${(project.tags || []).map((tag) => `<span>${escapeHTML(tag)}</span>`).join('')}</div>${project.repoUrl ? `<a class="text-link" href="${escapeHTML(project.repoUrl)}" target="_blank" rel="noreferrer">View source ↗</a>` : ''}</article>`).join('');
 } catch (error) { container.innerHTML = '<p class="loading-state">Projects will appear here soon.</p>'; }
}
$('#menu-toggle').addEventListener('click', () => { const open = $('#menu-toggle').getAttribute('aria-expanded') !== 'true'; $('#menu-toggle').setAttribute('aria-expanded', String(open)); $('#nav-links').classList.toggle('is-open', open); });
document.querySelectorAll('#nav-links a').forEach((link) => link.addEventListener('click', () => { $('#menu-toggle').setAttribute('aria-expanded', 'false'); $('#nav-links').classList.remove('is-open'); }));
$('#contact-form').addEventListener('submit', async (event) => {
 event.preventDefault();
 const button = $('.submit-button'); const label = $('#submit-label'); const status = $('#form-status');
 button.disabled = true; label.textContent = 'Sending…'; status.textContent = '';
 const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
 try {
  const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || 'Unable to send your message.');
  status.textContent = result.message; event.currentTarget.reset();
 } catch (error) { status.textContent = error.message || 'The contact service is not configured yet. Please try again later.'; }
 finally { button.disabled = false; label.textContent = 'Send message'; }
});
$('#footer-year').textContent = new Date().getFullYear();
loadProfile(); loadSkills(); loadProjects();
