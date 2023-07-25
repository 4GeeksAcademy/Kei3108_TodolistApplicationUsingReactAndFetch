import React, { useState, useEffect} from 'react';

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  // Add
  function handleNewHobby(e) {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const newHobby = { label: inputValue.trim(), done: false };
      setHobbies((prevHobbies) => [...prevHobbies, newHobby]);
      updateHobbyList([...hobbies, newHobby]);
      setInputValue("");
    }
  }

  // Delete 
  function handleDeleteHobby(index) {
    const updatedHobbies = hobbies.filter((_, i) => i !== index);
    setHobbies(updatedHobbies);
    updateHobbyList(updatedHobbies);
  }

  const handleMouseEnter = (index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  function clearList() {
    setHobbies([]); 
    updateHobbyList([]);
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
            <span>{hobby.label}</span>
              {activeIndex === index && (
                <i
                  className="fas fa-trash-alt"
                  onClick={() => handleDeleteHobby(index)}
                ></i>
              )}
            </li>
          ))
        )}
      </ul>
      <div>{hobbies.length} Hobbies</div>
      <button className="btn btn-info mt-2" onClick={clearList}>
        Delete All Hobbies
      </button>
    </div>
  );
}; 

export default Home;