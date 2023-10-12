import { useState } from 'react';
import './App.css';
import LinkForm from './componets/LinkForm';
import { getData } from './apis/api';
import { PaginatedItems } from './componets/pagination/Paginate';
import TableData from './componets/table/TableData';

function App() {
  const [urlResponse, setUrlResponse] = useState('');
  const [historyData, setHistoryData] = useState({});
  const { items = [], total = 0 } = historyData;
  const [query] = useState({ page: 1, size: 10 });
  const [showTable, setShowTable] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputUrl = e.target.elements.url.value || '';
    const result = await getData({ endpoint: 'scrape/', options: { news_url: inputUrl } });
    if (result) {
      setUrlResponse(result);
      e.target.elements.url.value = '';
    }
  };

  const getHistoryData = async (params = {}) => {
    const result = await getData({ endpoint: 'history/', options: { ...params } });
    if (result) {
      setHistoryData(result);
    }
    setShowTable(true);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    getHistoryData({ ...query });
  };

  // useEffect(()=>{
  //   getHistoryData(query)
  // },[query])

  return (
    <>
      <h2>How To use</h2>
      <ul className='list-wrapper'>
        <li>1. Input the full URL of the news you want to categorize.</li>
        <li>2. Hit the "Submit" button and wait as it takes a few seconds to categorize the news.</li>
        <li>3. To see previous categorization history hit the "Get History Data" button.</li>
      </ul>
      <LinkForm handleSubmit={handleSubmit} />
      <div className='result-category'>
        {urlResponse && (
          <h2>
            Category: <span>{urlResponse.category}</span>
          </h2>
        )}
      </div>

      <div style={{ margin: '36px auto', width: 'fit-content' }}>
        <button onClick={handleClick} className='btn-normal'>
          Get History Data
        </button>
      </div>
      {showTable && (
        <section>
          <center>
            <caption>History</caption>
          </center>
          <div className='history-table'>
            {items.length ? (
              <TableData data={items} headers={['Url', 'Category']} />
            ) : (
              <center>
                <h2>No Data</h2>
              </center>
            )}
            {!!items.length && (
              <div className='pagination'>
                <PaginatedItems totalItems={total} onClick={(page) => getHistoryData({ ...query, page: page + 1 })} itemsPerPage={query.size} />
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default App;
