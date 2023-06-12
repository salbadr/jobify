import Wrapper from "../assets/wrappers/PageBtnContainer";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { useAppContext } from "../context/appContext";

const PageContainer = () => {
    const { job: { page, numOfPages }, updatePage } = useAppContext()

    const prevPage = (e) => {
        e.preventDefault();
        updatePage(page - 1);
    }

    const nextPage = (e) => {
        e.preventDefault();
        updatePage(page + 1);
    }

    const goToPage = (e) => {
        e.preventDefault();
        updatePage(Number(e.target.innerText));
    }

    const ButtonList = () => {
        const buttons = [];
        for (let i = 1; i <= numOfPages; i++) {
            buttons.push(
                <button type='button'
                    className={i === page ? 'pageBtn active' : 'pageBtn'}
                    key={i}
                    onClick={goToPage}
                >
                    {i}
                </button>)
        }
        return buttons;
    }
    return (
        <Wrapper>
            {page > 1 && <button className="prev-btn" onClick={prevPage}>
                <HiChevronDoubleLeft />
                prev
            </button>
            }
            <div className="btn-container">
                <ButtonList />
            </div>
            {page < numOfPages && <button className="next-btn" onClick={nextPage}>
                next
                <HiChevronDoubleRight />
            </button>
            }
        </Wrapper>
    )
}

export default PageContainer;