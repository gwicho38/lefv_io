import { render, cleanup } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import MainComponent from '../components/main-component';

describe('MainComponent', () => {
  let element;

  beforeEach(() => {
    element = document.createElement('main-component');
    document.body.appendChild(element);
  });

  afterEach(cleanup);

  test('renders without crashing', () => {
    expect(element).toBeInTheDocument();
  });

  test('renders header-component', () => {
    const headerComponent = element.shadowRoot.querySelector('header-component');
    expect(headerComponent).toBeInTheDocument();
  });

  test('renders body-component', () => {
    const bodyComponent = element.shadowRoot.querySelector('body-component');
    expect(bodyComponent).toBeInTheDocument();
  });

  test('renders footer-component', () => {
    const footerComponent = element.shadowRoot.querySelector('footer-component');
    expect(footerComponent).toBeInTheDocument();
  });

  test('includes CSS stylesheet link', () => {
    const styleLink = element.shadowRoot.querySelector('style');
    expect(styleLink.textContent).toContain('@import "../../stylesheets/main-component.css";');
  });
});
