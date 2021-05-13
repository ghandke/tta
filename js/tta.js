(async (w) => {
  // wrap all imgs with links to original
  w.addEventListener('DOMContentLoaded', () => {
    w.document.querySelectorAll('picture').forEach((pic) => {
      const link = document.createElement('a');
      link.href = pic.querySelector('img').src.split('?')[0];
      link.target = '_blank';
      pic.parentElement.insertBefore(link, pic);
      link.appendChild(pic);
    });
  });

  // read /nav.json and draw nav
  const resp = await fetch('/nav.json');
  if (resp.ok) {
    const json = await resp.json();
    const data = json.data;
    if (data) {
      const navWrapper = document.createElement('topnav');
      data.forEach((item) => {
        const navLink = document.createElement('a');
        navLink.textContent = item.Title;
        navLink.href = item.URL;
        navWrapper.append(navLink);
      });
      document.body.insertBefore(navWrapper, document.querySelector('main'));
    }
  }

})(window);