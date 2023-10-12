import PropTypes from 'prop-types';
import './Table.css';
export default function TableData({ data = [], headers = [] }) {
  return (
    <table>
      <thead>
        <tr>
          {headers?.map((it, i) => (
            <th key={i}>{it}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((item, i) => (
          <tr key={i}>
            <td>
              <a href={item.url} target='_blank'>
                {item.url}
              </a>
            </td>
            <td>{item.category}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

TableData.propTypes = {
  data: PropTypes.array,
  headers: PropTypes.array,
};
