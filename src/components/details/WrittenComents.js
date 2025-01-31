import { useSelector } from "react-redux";

function WrittenComents({ itemId }) {
  const coments = useSelector((state) => state.userData.coments);
  const findComents = coments.filter((item) => item.itemId === itemId);
  console.log(coments);

  const borderStyle = {
    border: findComents && findComents.length > 0 && "solid 1px #fff4e5e6",
  };

  return (
    <div className="written-coments" style={borderStyle}>
      <ul>
        {findComents.map((item) => (
          <li key={item.id}>
            <div className="written-user">
              <i className="fa-solid fa-user"></i>
              <h4>{item.userName}</h4>
            </div>
            <div className="written-text">
              <p>{item.coment}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WrittenComents;
