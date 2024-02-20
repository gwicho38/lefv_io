import { render, cleanup, screen } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import HeaderComponent from '../components/header-component';

describe('HeaderComponent', () => {
  let element;

  beforeEach(() => {
    element = document.createElement('header-component');
    document.body.appendChild(element);
  });

  afterEach(cleanup);

  test('renders without crashing', () => {
    expect(element).toBeInTheDocument();
  });

  test('renders correct content', () => {
    const header = element.shadowRoot.querySelector('header');
    expect(header).toHaveClass('justify-center items-center bg-blue-500 text-white p-4');
    expect(header).toHaveTextContent('Welcome to My Website');
  });

  test('includes Tailwind CSS stylesheet link', () => {
    const link = element.shadowRoot.querySelector('link[href="https://cdn.jsdelivr.net/npm/tailwindcss@^2.0/dist/tailwind.min.css"]');
    expect(link).toBeInTheDocument();
  });
});
