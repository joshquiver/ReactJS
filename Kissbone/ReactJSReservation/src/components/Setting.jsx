// settings.js
/*
import React, { useState, useEffect } from 'react';
import './settings.css';

const Settings = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedFood, setSelectedFood] = useState({Product_ID:'', Food: '', Price: ''});

  useEffect(() => {
    // Fetch food items from the database when the component mounts
    fetchFoodItems();
  }, []);

  const fetchFoodItems = async () => {
    try {
      const response = await fetch('http://localhost:8081/Foods');
      const data = await response.json();
      setFoodItems(data);
    } catch (error) {
      console.error('Error fetching food items:', error);
    }
  };

  const handleFoodSelection = (food) => {
    setSelectedFood(food);
  };

  const handleSave = () => {
    fetch('http://localhost:8081/partyplatters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedFood),
    })
      .then((response) => response.json())
      .then(() => {
        fetchFoodItems();
        setSelectedFood({ Food: '', Price: '' });
      })
      .catch((error) => {
        console.error('Error saving food item:', error);
      });
  };

  const handleUpdate = () => {
    const { Product_ID, ...updatedValues } = selectedFood;
  
    fetch(`http://localhost:8081/Update_Customers/${Product_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Product_ID, ...updatedValues }), // Include Product_ID in the request body
    })
      .then((response) => response.json())
      .then(() => {
        // Handle the response or update UI as needed
        fetchFoodItems();
      })
      .catch((error) => {
        console.error('Error updating food item:', error);
      });
  };
  
  
  
  const handleDelete = () => {
    const { Product_ID } = selectedFood; // Corrected property name
  
    fetch(`http://localhost:8081/Delete_Customers/${Product_ID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error deleting food item: ${response.statusText}`);
        }
        return response.json();
      })
      .then(() => {
        fetchFoodItems();
        setSelectedFood({ Food: '', Price: '', Product_ID: '' });
      })
      .catch((error) => {
        console.error(error.message);
      });
  };





  return (
    <div className="settings-container">
      <div className="food-price-container">
        <h3>PARTY PLATTERS</h3>

        <label>Product_ID</label>
        <input
          type="text"
          value={selectedFood.Product_ID}
          onChange={(e) => setSelectedFood({ ...selectedFood, Product_ID: e.target.value })}
        />

        <label>Food</label>
        <input
          type="text"
          value={selectedFood.Food}
          onChange={(e) => setSelectedFood({ ...selectedFood, Food: e.target.value })}
        />
        <label>Price</label>
        <input
          type="text"
          value={selectedFood.Price}
          onChange={(e) => setSelectedFood({ ...selectedFood, Price: e.target.value })}
        />
      </div>
      <div className="button-container">
        <button className="save-button" onClick={handleSave}>Save</button>
        <button className="update-button" onClick={handleUpdate}>Update</button>
        <button className="delete-button" onClick={handleDelete}>Delete</button>
      </div>
      <div className="table-container">
        <h3>Food Items</h3>
        <table>
          <thead>
            <tr>
              <th>Product_ID</th>
              <th>Food</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {foodItems.map((foodItem) => (
              <tr key={foodItem.Customer_ID} onClick={() => handleFoodSelection(foodItem)}>
                <td>{foodItem.Product_ID}</td>
                <td>{foodItem.Food}</td>
                <td>{foodItem.Price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Settings;
*/

// settings.js
import React, { useState, useEffect } from 'react';
import './settings.css';

const Settings = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedFood, setSelectedFood] = useState({Product_ID:'', Food: '', Price: ''});

  const [roomItems, setRoomItems] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState({ Room_ID: '', Room_Name: '', Price: '' });

  useEffect(() => {
    // Fetch food items from the database when the component mounts
    fetchFoodItems();
    fetchRoomItems();
  }, []);

  const fetchFoodItems = async () => {
    try {
      const response = await fetch('http://localhost:8081/Foods');
      const data = await response.json();
      setFoodItems(data);
    } catch (error) {
      console.error('Error fetching food items:', error);
    }
  };
//FUNCTION ROOM
const fetchRoomItems = async () => {
  try {
    const response = await fetch('http://localhost:8081/Rooms');

    if (!response.ok) {
      throw new Error(`Error fetching room items: ${response.statusText}`);
    }

    const data = await response.json();
    setRoomItems(data);
  } catch (error) {
    console.error('Error fetching room items:', error.message);
  }
};

  const handleRoomSelection = (room) => {
    setSelectedRoom(room)
  };

//FUNCTION ROOM

const handleSaveRoom = () => {
  fetch('http://localhost:8081/FunctionRoom', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Room_Name: selectedRoom.Room_Name,
      Price: selectedRoom.Price,
    }),
  })
    .then((response) => response.json())
    .then(() => {
      fetchRoomItems();
      setSelectedRoom({ room_no: '', Room_Name: '', Price: '' });
    })
    .catch((error) => {
      console.error('Error saving room:', error);
    });
};


const handleUpdateRoom = () => {
  const { Room_ID, ...updatedValues } = selectedRoom;

  fetch(`http://localhost:8081/Update_Rooms/${Room_ID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedValues), // Remove the unnecessary room_no property
  })
    .then((response) => response.json())
    .then(() => {
      // Handle the response or update UI as needed
      fetchRoomItems();
    })
    .catch((error) => {
      console.error('Error updating room item:', error);
    });
};




const handleDeleteRoom = () => {
  const { Room_ID } = selectedRoom;

  fetch(`http://localhost:8081/DeleteRooms/${Room_ID}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error deleting room item: ${response.statusText}`);
      }
      return response.json();
    })
    .then(() => {
      fetchRoomItems();
      setSelectedRoom({ room_no: '', room_name: '', room_price: '' });
    })
    .catch((error) => {
      console.error(error.message);
    });
};



  const handleSave = () => {
    fetch('http://localhost:8081/partyplatters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedFood),
    })
      .then((response) => response.json())
      .then(() => {
        fetchFoodItems();
        setSelectedFood({ Food: '', Price: '' });
      })
      .catch((error) => {
        console.error('Error saving food item:', error);
      });
  };

  const handleUpdate = () => {
    const { Product_ID, ...updatedValues } = selectedFood;
  
    fetch(`http://localhost:8081/Update_Customers/${Product_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Product_ID, ...updatedValues }), // Include Product_ID in the request body
    })
      .then((response) => response.json())
      .then(() => {
        // Handle the response or update UI as needed
        fetchFoodItems();
      })
      .catch((error) => {
        console.error('Error updating food item:', error);
      });
  };
  
  
  
  const handleDelete = () => {
    const { Product_ID } = selectedFood; // Corrected property name
  
    fetch(`http://localhost:8081/DeleteFood/${Product_ID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error deleting food item: ${response.statusText}`);
        }
        return response.json();
      })
      .then(() => {
        fetchFoodItems();
        setSelectedFood({ Food: '', Price: '', Product_ID: '' });
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
  

  const handleFoodSelection = (food) => {
    setSelectedFood(food);
  };
  

  return (
    
    <div className="settings-container">
      <div className="food-price-container">
        <h3 className="party">PARTY PLATTERS</h3>

        <label>Product_ID</label>
        <input
          type="text"
          value={selectedFood.Product_ID}
          onChange={(e) => setSelectedFood({ ...selectedFood, Product_ID: e.target.value })}
        />

        <label>Food</label>
        <input
          type="text"
          value={selectedFood.Food}
          onChange={(e) => setSelectedFood({ ...selectedFood, Food: e.target.value })}
        />
        <label>Price</label>
        <input
          type="text"
          value={selectedFood.Price}
          onChange={(e) => setSelectedFood({ ...selectedFood, Price: e.target.value })}
        />
      </div>

      <div className="button-container">
        <button className="save-button" onClick={handleSave}>Save</button>
        <button className="update-button" onClick={handleUpdate}>Update</button>
        <button className="delete-button" onClick={handleDelete}>Delete</button>
      </div>
      <div className="table-container">
        <h3>Food Items</h3>
        <table>
          <thead>
            <tr>
              <th>Product_ID</th>
              <th>Food</th>
              <th>Prices</th>
            </tr>
          </thead>
          <tbody>
            {foodItems.map((foodItem) => (
              <tr key={foodItem.Product_ID} onClick={() => handleFoodSelection(foodItem)}>
                <td>{foodItem.Product_ID}</td>
                <td>{foodItem.Food}</td>
                <td>{foodItem.Price}</td>
              </tr>
            ))}
          </tbody>
        </table>




        <div className="room-price-container">
        <h3>Rooms</h3>

        <label>Room No</label>
        <input
          type="text"
          value={selectedRoom.Room_ID}
          onChange={(e) => setSelectedRoom({ ...selectedRoom, Room_ID: e.target.value })}
        />

        <label>Room Name</label>
        <input
          type="text"
          value={selectedRoom.Room_Name}
          onChange={(e) => setSelectedRoom({ ...selectedRoom, Room_Name: e.target.value })}
        />

        <label>Price</label>
        <input
          type="text"
          value={selectedRoom.Price}
          onChange={(e) => setSelectedRoom({ ...selectedRoom, Price: e.target.value })}
        />
      </div>


      
      <div className="button-container">
        <button className="save-button" onClick={handleSaveRoom}>Save</button>
        <button className="update-button" onClick={handleUpdateRoom}>Update</button>
        <button className="delete-button" onClick={handleDeleteRoom}>Delete</button>

      </div>
      <div className="table-container">
  <h3>Rooms</h3>
  <table>
    <thead>
      <tr>
        <th>Room No</th>
        <th>Room Name</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      {roomItems.map((roomItem) => (
        <tr key={roomItem.Room_ID} onClick={() => handleRoomSelection(roomItem)}>
          <td>{roomItem.Room_ID}</td>
          <td>{roomItem.Room_Name}</td>
          <td>{roomItem.Price}</td>
        </tr>
              ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default Settings;
