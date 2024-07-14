import { render, cleanup, screen } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import FooterComponent from '../components/footer-component';

describe('FooterComponent', () => {
  let element;

  beforeEach(() => {
    element = document.createElement('footer-component');
    document.body.appendChild(element);
  });

  afterEach(cleanup);

  test('renders without crashing', () => {
    expect(element).toBeInTheDocument();
  });

  test('renders correct content', () => {
    const footer = element.shadowRoot.querySelector('footer');
    expect(footer).toHaveClass('flex justify-center items-center bg-gray-700 text-white p-4');
    expect(footer).toHaveTextContent('© 2024 My Website. All rights reserved.');
  });

  test('includes Tailwind CSS stylesheet link', () => {
    const link = element.shadowRoot.querySelector('link[href="https://cdn.jsdelivr.net/npm/tailwindcss@^2.0/dist/tailwind.min.css"]');
    expect(link).toBeInTheDocument();
  });
});
