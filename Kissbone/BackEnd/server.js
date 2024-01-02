const express = require ('express');
const mysql = require ('mysql');
const cors = require('cors');
const session = require('express-session');

const app = express()
app.use(cors())

app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'eventsreserve'
})

app.use(session({
  secret: '123',
  resave: true,
  saveUninitialized: true,
}));


app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Query to check login credentials
  const query = 'SELECT position FROM accounts WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('MySQL Query Error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.length > 0) {
        res.json({ success: true, message: 'Login successful' });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    }
  });
});


// Logout endpoint
app.get('/api/logout', (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.error('Session Destruction Error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ success: true, message: 'Logout successful' });
    }
  });
});


const checkLoggedIn = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

app.get('/api/reservation', checkLoggedIn, (req, res) => {
  if (req.session.position === 'user') {
    // Proceed to the reservation page for users
    res.json({ success: true, message: 'Proceed to reservation page' });
  } else if (req.session.position === 'admin') {
    // Proceed to the reservation, customers, administrator pages for admins
    res.json({ success: true, message: 'Proceed to reservation, customers, administrator pages' });
  } else {
    // Handle other positions if needed
    res.status(403).json({ error: 'Forbidden' });
  }
});



app.get('/Foods', (req, res) => {
  const sql = "SELECT * from partyplatters";
  db.query(sql, (err, data) => {
      if(err) return res.json(err);
      return res.json(data);
  })
})

app.get('/Customers', (req, res) => {
  const sql = "SELECT * from customers_order";
  db.query(sql, (err, data) => {
      if(err) return res.json(err);
      return res.json(data);
  })
})

app.get('/Rooms', (req, res) => {
  const sql = "SELECT * from rooms";
  db.query(sql, (err, data) => {
      if(err) return res.json(err);
      return res.json(data);
  })
})


app.get('/Room_Name', (req, res) => {
  const sql = "SELECT Room_Name, Price FROM rooms";
  db.query(sql, (err, data) => {
      if(err) return res.json(err);
      return res.json(data);
  })
})


app.get('/Room_Price/:roomName', (req, res) => {
  const roomName = req.params.roomName;
  const sql = "SELECT `Price` FROM `rooms` WHERE `Room_Name` = ?";
  
  db.query(sql, [roomName], (err, data) => {
      if(err) return res.json(err);
      return res.json(data);
  });
});


app.get('/accounts', (req, res) => {
  // Remove the unused parameter accountsName
  const sql = "SELECT * FROM accounts";
  
  db.query(sql, (err, data) => {
      if(err) {
        // Handle the error and send an error response
        console.error('Error fetching accounts:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Send the fetched data as a JSON response
      return res.json(data);
  });
});




app.get('/accountsGetID', (req, res) => {
  // Remove the unused parameter accountsName
  const sql = "SELECT MAX(account_id) AS MaxID from accounts";
  
  db.query(sql, (err, data) => {
      if(err) {
        // Handle the error and send an error response
        console.error('Error fetching accounts:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Send the fetched data as a JSON response
      return res.json(data);
  });
});


  app.get('/api/menu', (req, res) => {
    const query = 'SELECT Food, Price FROM partyplatters';
    db.query(query, (err, results) => {
      if (err) {
        console.error('MySQL Query Error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      const menuItems = results.map((item) => ({
        Food: item.Food,
        price: item.Price, // Ensure the case matches the expected case in your front-end code
      }));
  
      res.json(menuItems);
    });
  });
  

  
app.get('/kissvone/Reservations', (req, res) => {
  const sql = "SELECT * from customers_reservation";
  db.query(sql, (err, data) => {
      if(err) return res.json(err);
      return res.json(data);
  })
})


















  app.post('/signup', (req, res) => {
    const { name, username, password, contactNo, position } = req.body;

    try {
        // Validate input data
        if (!name || !username || !password || !contactNo || !position) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const query =
            'INSERT INTO accounts (Name, username, password, contact_no, position) VALUES (?, ?, ?, ?, ?)';
        const values = [name, username, password, contactNo, position];

        db.query(query, values, (err, results) => {
            if (err) {
                console.error('MySQL Query Error:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            } else {
                // Return the inserted record or a success message
                res.json({ success: true, data: results });
            }
        });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.post('/api/saveReservation', (req, res) => {
  const {
    Name,
    Contact_No,
    Venue,
    Menu,
    Event,
    Date,
    Time,
    Total_Orders,
    Status
  } = req.body;

  // Define the SQL query for inserting into the customers_reservation table
  const query = 'INSERT INTO `customers_reservation` (`Name`, `Contact_No`, `Venue`, `Menu`, `Event`, `Date`, `Time`, `Total_Orders`, `Status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

  // Specify the values to be inserted
  const values = [Name, Contact_No, Venue, Menu, Event, Date, Time, Total_Orders, Status];

  // Execute the query using the database connection (assuming 'db' is your database connection)
  db.query(query, values, (err, results) => {
    if (err) {
      // Handle any errors that occur during the database query
      console.error('MySQL Query Error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // If the query is successful, send the results as a JSON response
      res.json(results);
    }
  });
});


















app.post('/customersorder', async (req, res) => {
  const {
    Name,
    Email,
    Contact_no,
    Venue,
    Menu,
    Event,
    Date,
    Time,
    Total_Orders,
  } = req.body;

  try {
    // Insert into customers_order table
    const insertOrderQuery = `
      INSERT INTO customers_order (Name, Email, Contact_no, Venue, Menu, Event, Date, Time, Total_Orders)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    await db.promise().execute(insertOrderQuery, [
      Name,
      Email,
      Contact_no,
      Venue,
      Menu,
      Event,
      Date,
      Time,
      Total_Orders,
    ]);

    console.log('Reservation saved successfully.');
    res.status(200).json({ message: 'Reservation saved successfully.' });
  } catch (error) {
    console.error('Error saving reservation:', error);
    res.status(500).json({ error: 'Error saving reservation. Please try again.' });
  }
});



app.post('/partyplatters', (req, res) => {
  const {
      Food,
      Price,
  } = req.body;

  const query =
  'INSERT INTO `partyplatters`(`Food`, `Price`) VALUES (?,?)';
  const values = [Food, Price];

  db.query(query, values, (err, results) => {
      if (err) {
          console.error('MySQL Query Error:', err);
          res.status(500).json({ error: 'Internal Server Error' });
      } else {
          res.json(results);
      }
  });
});


app.post('/FunctionRoom', (req, res) => {
  const {
      Room_Name,
      Price,
  } = req.body;

  const query =
  'INSERT INTO `rooms`(`Room_Name`, `Price`) VALUES (?,?)';
  const values = [Room_Name, Price];

  db.query(query, values, (err, results) => {
      if (err) {
          console.error('MySQL Query Error:', err);
          res.status(500).json({ error: 'Internal Server Error' });
      } else {
          res.json(results);
      }
  });
});
  





app.delete('/Delete_Customers/:foodId', (req, res) => {
  const foodId = req.params.foodId;

  const query = 'DELETE FROM customers_reservation WHERE Customer_ID = ?';

  db.query(query, [foodId], (err, results) => {
      if (err) {
          console.error('MySQL Query Error:', err);
          res.status(500).json({ error: 'Internal Server Error' });
      } else {
          if (results.affectedRows === 0) {
              res.status(404).json({ error: 'Record not found' });
          } else {
              res.json({ success: true, message: 'Record deleted successfully' });
          }
      }
  });
});


app.delete('/DeleteFood/:Product_ID', (req, res) => {
  const productId = req.params.Product_ID; // Updated parameter name

  // Implement MySQL query to delete a record by ID
  const query = 'DELETE FROM `partyplatters` WHERE Product_ID = ?';

  db.query(query, [productId], (err, results) => {
    if (err) {
      console.error('MySQL Query Error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.affectedRows === 0) {
        // No record was deleted (ID not found)
        res.status(404).json({ error: 'Record not found' });
      } else {
        res.json({ success: true, message: 'Record deleted successfully' });
      }
    }
  });
});



app.delete('/DeleteRooms/:Room_ID', (req, res) => {
  const Room_ID = req.params.Room_ID;

  // Implement MySQL query to delete a record by ID
  const query = 'DELETE FROM `rooms` WHERE Room_ID = ?';

  db.query(query, [Room_ID], (err, results) => {
    if (err) {
      console.error('MySQL Query Error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.affectedRows === 0) {
        // No record was deleted (ID not found)
        res.status(404).json({ error: 'Record not found' });
      } else {
        res.json({ success: true, message: 'Record deleted successfully' });
      }
    }
  });
});



app.delete('/accounts/:account_id', (req, res) => {
  const account_id = req.params.account_id;

  // Implement MySQL query to delete a record by ID
  const query = 'DELETE FROM `accounts` WHERE account_id = ?';

  db.query(query, [account_id], (err, results) => {
    if (err) {
      console.error('MySQL Query Error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.affectedRows === 0) {
        // No record was deleted (ID not found)
        res.status(404).json({ error: 'Record not found' });
      } else {
        res.json({ success: true, message: 'Record deleted successfully' });
      }
    }
  });
});





//UPDATES
app.put('/Update_Customers/:foodId', (req, res) => {
  const foodId = req.params.foodId;
  const { Product_ID, Food, Price } = req.body;

  if (!Product_ID || !Food || !Price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query =
  'UPDATE `partyplatters` SET Food=?, Price=? WHERE Product_ID=?';

db.query(query, [Food, Price, foodId], (err, results) => {
  if (err) {
    console.error('MySQL Query Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  } else {
    if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Record not found' });
    } else {
      res.json({ success: true, message: 'Record updated successfully' });
    }
  }
});
});



app.put('/Update_Customers/:foodId', (req, res) => {
  const foodId = req.params.foodId;
  const { Product_ID, Food, Price } = req.body;

  if (!Product_ID || !Food || !Price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query =
  'UPDATE `partyplatters` SET Food=?, Price=? WHERE Product_ID=?';

db.query(query, [Food, Price, foodId], (err, results) => {
  if (err) {
    console.error('MySQL Query Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  } else {
    if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Record not found' });
    } else {
      res.json({ success: true, message: 'Record updated successfully' });
    }
  }
});
});


app.put('/Update_Rooms/:Room_ID', (req, res) => {
  const Room_ID = req.params.Room_ID;
  const { Room_Name, Price} = req.body;

  if (!Room_Name || !Price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query =
    'UPDATE `rooms` SET `Room_Name`= ?, `Price`= ? WHERE Room_ID = ?';

  db.query(query, [Room_Name, Price, Room_ID], (err, results) => {
    if (err) {
      console.error('MySQL Query Error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Record not found' });
      } else {
        res.json({ success: true, message: 'Record updated successfully' });
      }
    }
  });
});



app.put('/Update_customers/:customerId', (req, res) => {
  const Customer_ID = req.params.customerId;
  const { Name, Contact_No, Venue, Menu, Event, Date, Time, Total_Orders, Status } = req.body;

  if (!Name || !Contact_No || !Venue || !Menu || !Event || !Date || !Time || !Total_Orders || !Status) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = 'UPDATE customers_reservation SET Name=?, Contact_No=?, Venue=?, Menu=?, Event=?, Date=?, Time=?, Total_Orders=?, Status=? WHERE Customer_ID=?';

  db.query(query, [Name, Contact_No, Venue, Menu, Event, Date, Time, Total_Orders, Status, Customer_ID], (err, results) => {
    if (err) {
      console.error('MySQL Query Error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Record not found' });
      } else {
        res.json({ success: true, message: 'Record updated successfully' });
      }
    }
  });
});






app.put('/Update_accounts/:account_id', (req, res) => {
  const Room_ID = req.params.Room_ID;
  const { Room_Name, Price} = req.body;

  if (!Room_Name || !Price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query =
    'UPDATE `accounts` SET `Name`= ?, `username`= ?, `password`= ?, `contact_no`= ?, `position`= ? WHERE account_id = ?';

  db.query(query, [Room_Name, Price, Room_ID], (err, results) => {
    if (err) {
      console.error('MySQL Query Error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Record not found' });
      } else {
        res.json({ success: true, message: 'Record updated successfully' });
      }
    }
  });
});




app.put('/update_Status/:customerId', (req, res) => {
  const Customer_ID = req.params.customerId;
  const {Status } = req.body;

  if (!Status) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = 'UPDATE customers_reservation SET Status=? WHERE Customer_ID=?';

  db.query(query, [Status, Customer_ID], (err, results) => {
    if (err) {
      console.error('MySQL Query Error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Record not found' });
      } else {
        res.json({ success: true, message: 'Record updated successfully' });
      }
    }
  });
});




app.listen(8081, () => {
    console.log('Server is running on port 3001')
})