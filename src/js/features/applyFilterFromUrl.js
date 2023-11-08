function applyFilterFromUrl() {
  const section = location.hash.replace("#/", "");
  const link = document.querySelector(`#filter-${section}`);

  if (link) {
    link.click();
  }
}

export default applyFilterFromUrl;
