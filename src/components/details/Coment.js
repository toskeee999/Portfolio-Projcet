import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionUserData } from "../../store/user-data";

function Coment({ itemId }) {
  const inputData = useRef();
  const userAuth = useSelector((state) => state.userData.userAuth);
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    const value = inputData.current.value;

    if (!userAuth) {
      alert("Please log in to write a review.");
      return;
    }

    if (value.trim() === "") {
      return;
    }

    dispatch(actionUserData.setComent({ value: value, itemId: itemId }));
  }

  return (
    <div className="coment">
      <h3>Comments</h3>
      <form onSubmit={handleSubmit}>
        <p>
          <textarea
            ref={inputData}
            required
            placeholder="Share your feedback!"
          />
        </p>
        <p>
          <button>Comment</button>
        </p>
      </form>
    </div>
  );
}

export default Coment;
