import React, { useState, useEffect} from 'react';

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  // Add
  function handleNewHobby(e) {
    if (e.key === "Enter" && inputValue !== "") {
      setHobbies((prevHobbies) => [...prevHobbies, inputValue]);
      let aux = hobbies.concat({ label: e.target.value, done: false });
      updateHobbyList(aux);
      setInputValue("");
    }
  }

  // Delete 
  function HandleDeleteHobby(id) {
    setHobbies((prevHobbies) => {
      const updatedHobbies = [...prevHobbies];
      updatedHobbies.splice(id, 1);
      return updatedHobbies;
    });
    let aux = hobbies.filter((item, index) => index !== id); 
    updateHobbyList(aux);
  }

  const handleMouseEnter = (index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  function clearList() {
    setHobbies([]); 
    setHobbyList([]);
  }

  // Fetch  GET API
  function getHobbyList() {
    fetch(
      "https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/Kei3108"
    )
      .then((response) => response.json())
      .then((data) => setHobbies(data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getHobbyList();
  }, []);

  // Update the API 
function updateHobbyList(hobbiesArray) {
  fetch(
    "https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/Kei3108",
    {
      method: "PUT",
      body: JSON.stringify(hobbiesArray),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((resp) => {
      console.log(resp.ok);
      console.log(resp.status); 
      console.log(resp.text()); 
      return resp.json(); 
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

  return (
    <div className="container">
      <h1>My Hobbies</h1>

      <ul>
        <li>
        <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyDown={(e) => {
              handleNewHobby(e);
            }}
            placeholder="What needs to be done?"
          />
        </li>
        {hobbies.length === 0 ? (
          <li>No hobbies. Add hobbies</li>
        ) : (
          hobbies.map((hobby, index) => (
            <li
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {hobby}
              {activeIndex === index && (
                <i
                  className="fas fa-trash-alt"
                  onClick={() => HandleDeleteHobby(index)}
                ></i>
              )}
            </li>
          ))
        )}
      </ul>
      <div>{hobbies.length} Hobbies</div>
        <button
          className="btn btn-info mt-2"
          onClick={() => {
            clearList();
          }}
        >
          Delete All Hobbies
        </button>
    </div>
  );
};

export default Home;