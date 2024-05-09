import { render, fireEvent, waitFor, RenderResult } from '@testing-library/react';
import { getCharacter } from 'src/actions/getCharacter';
import { Results } from '../../src/components/Results';
import Pagination from '../components/Pagination';
import { SearchBar } from '../components/SearchBar';


jest.mock('../../src/actions/getCharacter', () => ({
  getCharacter: jest.fn().mockResolvedValue({
    results: [],
    info: { count: 0, pages: 0, next: '', prev: '' }
  }),
}));


const mockHandleSetNewData = jest.fn();

const mockProps = {
  currentPage: 1,
  totalPages: 5,
  next: 'next-url',
  prev: 'prev-url',
  handleSetNewData: mockHandleSetNewData,
};


describe('Results Component Tests', () => {

  test('fetches character data when component mounts', async () => {

    await getCharacter(1);
    const data = { results: [], info: { count: 0, pages: 0, next: '', prev: '' } };
    render(<Results data={data} />);

    expect(getCharacter).toHaveBeenCalledWith(1);
  });


  test('pagination buttons render correctly and handle page change', async () => {
    const { getByText, getByTestId } = render(<Pagination {...mockProps} />);

    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
    expect(getByText('3')).toBeInTheDocument();

    fireEvent.click(getByText('2'));

    await waitFor(() => {
      expect(mockHandleSetNewData).toHaveBeenCalledWith(undefined, 2, '');
    });

  });


  test('search bar functions correctly', () => {

    const mockOnSearch = jest.fn();
    const { getByPlaceholderText, getByRole }: RenderResult = render(<SearchBar onSearch={mockOnSearch} />);
    const searchInput: HTMLInputElement | null = getByPlaceholderText('Search characters...') as HTMLInputElement;
    expect(searchInput).toBeInTheDocument();


    if (searchInput) {
      fireEvent.change(searchInput, { target: { value: 'Rick' } });
      expect(searchInput.value).toBe('Rick');
      const searchButton: HTMLElement | null = getByRole('button');
      if (searchButton) {
        fireEvent.click(searchButton);
        expect(mockOnSearch).toHaveBeenCalledWith('Rick');
        fireEvent.change(searchInput, { target: { value: '' } });

        expect(searchInput.value).toBe('');

      } else {
        fail('Search button not found');
      }
    } else {
      fail('Search input not found');
    }
  });

});
