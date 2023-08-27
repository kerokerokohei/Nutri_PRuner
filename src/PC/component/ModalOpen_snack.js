import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { updateSelectedDishes_snack } from "../actions/updateSelectedDishes";
import { useTodos } from "../../FireBase/TodosProvider"; //Context API

const ModalOpen_snack = ({ Menu, closeModalFn }) => {
  const dispatch = useDispatch();
  const { todos } = useTodos();
  const selectedDishes_snack = useSelector(
    (state) => state.selectedDishes_snack
  );

  const toggleDishSelection_snack = (dish_snack) => {
    const isSelected = selectedDishes_snack.some(
      (selected) => selected.value === dish_snack.value
    );

    if (isSelected) {
      const updatedSelection_snack = selectedDishes_snack.filter(
        (selected) => selected.value !== dish_snack.value
      );
      dispatch(updateSelectedDishes_snack(updatedSelection_snack));
    } else {
      dispatch(
        updateSelectedDishes_snack([...selectedDishes_snack, dish_snack])
      );
    }
  };

  return (
    <div className="App">
      <Modal
        className="flex mx-auto my-20 h-5/6 w-3/4 bg-white bg-opacity-100 rounded-xl border-solid border-[#37AB9D] border-8 overflow-y-scroll"
        isOpen={true}
        onRequestClose={closeModalFn}
        shouldCloseOnOverlayClick={true}
      >
        <div className="flex flex-wrap justify-center">
          {todos.map((dish_snack) => (
            <div
              key={dish_snack.id}
              className={`px-4 py-2 bg-gray-200 m-2 flex items-center justify-center rounded-full ${
                selectedDishes_snack.some(
                  (selected) => selected.value === dish_snack.value
                )
                  ? "bg-amber-300 transition-all duration-500 ease-out"
                  : ""
              }`}
              onClick={() => toggleDishSelection_snack(dish_snack)}
              style={{
                backgroundColor: selectedDishes_snack.some(
                  (selected) => selected.value === dish_snack.value
                )
                  ? "#FDE68A"
                  : "",
              }}
            >
              {dish_snack.name}
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default ModalOpen_snack;
