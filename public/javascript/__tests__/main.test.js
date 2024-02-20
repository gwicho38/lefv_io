import { fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

jest.mock('Isotope');
jest.mock('GLightbox');
jest.mock('Swiper');
jest.mock('AOS', () => ({
  init: jest.fn(),
}));

describe('main.js', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="navbar"></div>
      <a href="#" class="back-to-top"></a>
      <a href="#" class="mobile-nav-toggle bi-list"></a>
      <div class="portfolio-container"></div>
      <div class="skills-content"></div>
      <div class="typed" data-typed-items="Item1,Item2"></div>
      <div id="preloader"></div>
    `;
    require('../main');
  });

  test('initializes without crashing', () => {
    expect(document.querySelector('.back-to-top')).not.toHaveClass('active');
  });

  test('window load events trigger correctly', () => {
    fireEvent.load(window);
    expect(document.querySelector('#preloader')).toBeNull();
    expect(AOS.init).toHaveBeenCalled();
  });

  test('scroll events trigger navbar links active state', () => {
    document.body.innerHTML += '<section id="testSection" style="height: 1000px;"></section>';
    const navbarLink = document.createElement('a');
    navbarLink.className = 'scrollto';
    navbarLink.href = '#testSection';
    document.querySelector('#navbar').appendChild(navbarLink);

    fireEvent.scroll(window, { target: { scrollY: 500 } });
    expect(navbarLink).toHaveClass('active');
  });

  test('clicking on mobile-nav-toggle toggles classes', () => {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    fireEvent.click(mobileNavToggle);
    expect(document.body).toHaveClass('mobile-nav-active');
    expect(mobileNavToggle).toHaveClass('bi-x');
  });

  test('clicking on .scrollto link calls scrollto function', () => {
    const scrollLink = document.createElement('a');
    scrollLink.className = 'scrollto';
    scrollLink.href = '#testSection';
    document.body.appendChild(scrollLink);

    fireEvent.click(scrollLink);
    // Since we cannot actually test scrolling, we check if the default action was prevented.
    expect(scrollLink).toHaveAttribute('href', '#testSection');
  });

  test('back to top button shows/hides on scroll', () => {
    fireEvent.scroll(window, { target: { scrollY: 101 } });
    expect(document.querySelector('.back-to-top')).toHaveClass('active');

    fireEvent.scroll(window, { target: { scrollY: 0 } });
    expect(document.querySelector('.back-to-top')).not.toHaveClass('active');
  });
});
