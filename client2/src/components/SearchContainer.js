import Wrapper from "../assets/wrappers/SearchContainer"
import { FormRow, FormRowSelect } from "./"
import { useAppContext } from '../context/appContext';

const SearchContainer = () => {
    const { job: { search, searchStatus, searchType, statusOptions, sort, sortOptions, jobTypeOptions }, isLoading, setSearch, clearSearchValues } = useAppContext();

    const handleChange = (e) => {
        if (isLoading) {
            return;
        }
        const payload = { name: e.target.name, value: e.target.value };
        setSearch(payload);
        e.preventDefault();
    }

    const handleClear = (e) => {
        e.preventDefault();
        clearSearchValues()
    }

    return (
        <Wrapper>
            <form className='form' >
                <h3>Search</h3>
                <div className='form-center'>
                    <FormRow type='text' name='search' value={search} handleChange={handleChange} />
                    <FormRowSelect name="searchStatus" value={searchStatus} labelText={'status'} list={['all', ...statusOptions]} handleChange={handleChange} />
                    <FormRowSelect name="searchType" value={searchType} labelText={'Job Type'} list={['all', ...jobTypeOptions]} handleChange={handleChange} />
                    <FormRowSelect name="sort" value={sort} list={sortOptions} handleChange={handleChange} />
                    <button type='button' className='btn btn-block btn-danger' onClick={handleClear} >
                        clear filters
                    </button>
                </div>
            </form>
        </Wrapper>
    )
}

export default SearchContainer