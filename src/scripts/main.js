var setupLinkScrollHandlers = function() {
  document.getElementById('brands-link').addEventListener('click', () => {
    scrollIt(
      document.getElementById('brands'),
      1200,
      'easeOutQuad',
      () => console.log(`Just finished scrolling to ${window.pageYOffset}px`)
    );
  });
  document.getElementById('opening-hours-link').addEventListener('click', () => {
    scrollIt(
      document.getElementById('opening-hours'),
      1600,
      'easeOutQuad',
      () => console.log(`Just finished scrolling to ${window.pageYOffset}px`)
    );
  });
  document.getElementById('map-link').addEventListener('click', () => {
    scrollIt(
      document.getElementById('map').offsetTop + 500,
      1400,
      'easeOutQuad',
      () => console.log(`Just finished scrolling to ${window.pageYOffset}px`)
    );
  });
  document.getElementById('contact-link').addEventListener('click', () => {
    scrollIt(
      document.getElementById('contact'),
      1600,
      'easeOutQuad',
      () => console.log(`Just finished scrolling to ${window.pageYOffset}px`)
    );
  });
}

var setupMobileMenuCloseHandlers = function() {
  var elements = document.getElementsByClassName('menu-link');

  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', () => {
      document.getElementById('menu-toggle-checkbox').checked = false;
    });
  }
}

window.onload = function() {
  setupLinkScrollHandlers();
  setupMobileMenuCloseHandlers();
};

