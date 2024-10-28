import { render, cleanup } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import BodyComponent from '../components/body-component';

describe('BodyComponent', () => {
  let element;

  beforeEach(() => {
    element = document.createElement('body-component');
    document.body.appendChild(element);
  });

  afterEach(cleanup);

  test('renders without crashing', () => {
    expect(element).toBeInTheDocument();
  });

  test('renders correct content', () => {
    const h1 = element.shadowRoot.querySelector('h1');
    expect(h1).toHaveTextContent('Hello');
  });

  test('includes CSS stylesheet link', () => {
    const styleLink = element.shadowRoot.querySelector('style');
    expect(styleLink).not.toBeNull();
    expect(styleLink.textContent).toContain('@import "../../stylesheets/body-component.css";');
  });
});
