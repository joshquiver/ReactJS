/*
import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './reserve.module.css';

const ReservationForm = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/menu');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };


    fetchMenuItems();
  }, []);



   const handleQuantityChange = (food, quantity) => {
    setMenuItems((prevMenuItems) => {
      return prevMenuItems.map((item) => {
        if (item.Food === food) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  useEffect(() => {
    const newTotalPrice = menuItems.reduce((total, item) => {
      return total + (item.quantity || 0) * item.price;
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [menuItems]);


  const initialValues = {
    name: '',
    email: '',
    contact: '',
    selectedMenuItems: [],
    eventType: '',
    date: '',
    eventTime: '',
    venue: '',
    quantity: {},
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    contact: Yup.string().required('Required'),
    selectedMenuItems: Yup.array().min(1, 'Select at least one menu item').required('Required'),
    eventType: Yup.string().required('Required'),
    date: Yup.date().required('Required'),
    eventTime: Yup.string().required('Required'),
    venue: Yup.string().required('Required'),
  });

  
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log('Form Values:', values);
      // Make a POST request to save the reservation data
      const response = await axios.post('http://localhost:8081/Customers_Order', {
        name: values.name,
        email: values.email,
        contact: values.contact,
        venue: values.venue,
        selectedMenuItems: values.selectedMenuItems.join(', '),
        eventType: values.eventType,
        date: values.date,
        eventTime: values.eventTime,
        totalPrice: totalPrice,
      });

      console.log(response.data);

      // Reset the form after successful submission
      setSubmitting(false);
      resetForm();
      setTotalPrice(0);
    } catch (error) {
      console.error('Error submitting reservation:', error);
      console.log('Reservation not saved!');
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form>
        <div className="clearfix">
          <label htmlFor="name">Name:</label>
          <Field type="text" id="name" name="name" />
          <ErrorMessage name="name" component="div" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <Field type="text" id="email" name="email" />
          <ErrorMessage name="email" component="div" />
        </div>
        <div>
          <label htmlFor="contact">Contact number:</label>
          <Field type="text" id="contact" name="contact" />
          <ErrorMessage name="contact" component="div" />
        </div>

        <div>
          <label htmlFor="venue">Venue:</label>
          <Field type="text" id="venue" name="venue" />
          <ErrorMessage name="venue" component="div" />
        </div>


        <div>
          <label htmlFor="eventType">Event name:</label>
          <Field type="text" id="eventType" name="eventType" />
          <ErrorMessage name="eventType" component="div" />
        </div>


          <div>
          <label htmlFor="date">Date of Reservation:</label>
          <Field type="date" id="date" name="date" />
          <ErrorMessage name="date" component="div" />
        </div>

        <div>
          <label htmlFor="eventTime">Event Time:</label>
          <Field type="time" id="eventTime" name="eventTime" />
          <ErrorMessage name="eventTime" component="div" />
        </div>


        <Form>
        <div className="right-form">
          <label>Menu Items</label>
          <table>
            <thead>
              <tr>
                <th>Food</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item) => (
                <tr key={item.Food}>
                  <td>{item.Food}</td>
                  <td>{item.price}</td>
                  <td>
                    <Field
                      type="number"
                      name={`quantity.${item.Food}`}
                      onChange={(e) => handleQuantityChange(item.Food, parseInt(e.target.value, 10))}
                    />
                  </td>
                  <td>{(item.quantity || 0) * item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <label htmlFor="totalPrice">Total Price</label>
            <Field type="text" id="totalPrice" name="totalPrice" value={totalPrice} readOnly />
          </div>
        </div>

        </Form>
        <div>
          <button type="submit">Place Reservation</button>
        </div>
      </Form>
    </Formik>
  );
};

export default ReservationForm;

*/


/*
import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './reserve.module.css';

const ReservationForm = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [venueList, setVenueList] = useState([]); // Add venueList state
  const [selectedVenuePrice, setSelectedVenuePrice] = useState(0);

  const [selectedVenue, setSelectedVenue] = useState('');

  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/menu');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    const fetchVenueList = async () => {
      try {
        // Fetch venue list from MySQL database
        const response = await axios.get('http://localhost:8081/Room_Name');
        setVenueList(response.data.map(item => item.Room_Name)); // Adjust the mapping based on your actual response structure
      } catch (error) {
        console.error('Error fetching venue list:', error);
      }
    };

    fetchVenueList(); 
    fetchMenuItems();
  }, []);

  const fetchVenuePrice = async (roomName) => {
    try {
      const response = await axios.get(`http://localhost:8081/Room_Price/${roomName}`);
      const price = response.data[0].Price; // Assuming the response is an array with a single object containing the price
      return price;
    } catch (error) {
      console.error('Error fetching venue price:', error);
      return 0;
    }
  };

  

   const handleQuantityChange = (food, quantity) => {
    setMenuItems((prevMenuItems) => {
      return prevMenuItems.map((item) => {
        if (item.Food === food) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  
  useEffect(() => {
    const newTotalPrice = menuItems.reduce((total, item) => {
      return total + (item.quantity || 0) * item.price;
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [menuItems]);


  const initialValues = {
    name: '',
    email: '',
    contact: '',
    eventType: '',
    date: '',
    eventTime: '',
    venue: '',
    selectedVenue: '', // Add initial value for selectedVenue
    venuePrice: 0,     // Add initial value for venuePrice
    totalPrice: 0,     // Add initial value for totalPrice
    // ... other fields
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    contact: Yup.string().required('Required'),
    selectedMenuItems: Yup.array().min(1, 'Select at least one menu item').required('Required'),
    eventType: Yup.string().required('Required'),
    date: Yup.date().required('Required'),
    eventTime: Yup.string().required('Required'),
    venue: Yup.string().required('Required'),
  });

  const handleCheckboxChange = (food, checked, setFieldValue) => {
    setMenuItems((prevMenuItems) => {
      const updatedMenuItems = prevMenuItems.map((item) => {
        if (item.Food === food) {
          return { ...item, selected: checked };
        }
        return item;
      });
  
      const selectedItems = updatedMenuItems.filter((item) => item.selected);
      const newSelectedMenuItems = selectedItems.map((item) => ({ food: item.Food, quantity: item.quantity }));
  
      // Update selected menu items using setFieldValue
      setFieldValue('selectedMenuItems', newSelectedMenuItems);
  
      return updatedMenuItems;
    });
  };
  
  
  
  
  
  const handleVenueChange = (selectedVenue) => {
    const updateVenueData = async () => {
      // Fetch the venue price using the new function
      try {
        const venuePrice = await fetchVenuePrice(selectedVenue);
        setSelectedVenuePrice(venuePrice);
      } catch (error) {
        console.error('Error fetching venue price:', error);
        setSelectedVenuePrice(0); // Set the price to 0 or handle the error appropriately
      }
    };
  
    setSelectedVenue(selectedVenue);
    updateVenueData();
  };
  
  

  
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log('Form Values:', values);
  
      // Make a POST request to save the reservation data
      const response = await axios.post('http://localhost:8081/Customers_Order', {
        name: values.name,
        email: values.email,
        contact: values.contact,
        venue: values.venue,
        eventType: values.eventType,
        date: values.date,
        eventTime: values.eventTime,
        total: totalPrice + selectedVenuePrice,
        selectedMenuItems: values.selectedMenuItems,
      });
  
      console.log(response.data);
  
      // Reset the form after successful submission
      setSubmitting(false);
      resetForm();
      setTotalPrice(0);
      setSelectedVenue('');
      setSelectedVenuePrice(0);
      setError('');
    } catch (error) {
      console.error('Error submitting reservation:', error);
      console.log('Reservation not saved!');
      setError(error);
    }
  };
  
  

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form>
        <div className="clearfix">
          <label htmlFor="name">Name:</label>
          <Field type="text" id="name" name="name" />
          <ErrorMessage name="name" component="div" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <Field type="text" id="email" name="email" />
          <ErrorMessage name="email" component="div" />
        </div>
        <div>
          <label htmlFor="contact">Contact number:</label>
          <Field type="text" id="contact" name="contact" />
          <ErrorMessage name="contact" component="div" />
        </div>

        <div>
          <label htmlFor="venue">Venue:</label>
          <Field as="select" id="venue" name="venue" onChange={(e) => handleVenueChange(e.target.value)}>
            <option value="">Select Venue</option>
            {venueList.map((venue) => (
              <option key={venue} value={venue}>
                {venue}
              </option>
            ))}
          </Field>
          <ErrorMessage name="venue" component="div" />
        </div>

        <div>
          <label htmlFor="selectedVenue">Selected Venue:</label>
          <Field type="text" id="selectedVenue" name="selectedVenue" value={selectedVenue} readOnly />
        </div>

        <div>
          <label htmlFor="venuePrice">Venue Price:</label>
          <Field type="text" id="venuePrice" name="venuePrice" value={selectedVenuePrice} readOnly />
        </div>




        <div>
          <label htmlFor="eventType">Event name:</label>
          <Field type="text" id="eventType" name="eventType" />
          <ErrorMessage name="eventType" component="div" />
        </div>


          <div>
          <label htmlFor="date">Date of Reservation:</label>
          <Field type="date" id="date" name="date" />
          <ErrorMessage name="date" component="div" />
        </div>

        <div>
          <label htmlFor="eventTime">Event Time:</label>
          <Field type="time" id="eventTime" name="eventTime" />
          <ErrorMessage name="eventTime" component="div" />
        </div>


        <Form>
        <div className="right-form">
      <label>Menu Items</label>
      <table>
      <thead>
  <tr>
    <th>Select</th>
    <th>Food</th>
    <th>Price</th>
    <th>Quantity</th>
    <th>Total</th>
  </tr>
</thead>
<tbody>
  {menuItems.map((item) => (
    <tr key={item.Food}>
      <td>{item.Food}</td>
      <td>{item.price}</td>
      <td>{(item.quantity || 0) * item.price}</td>
    </tr>
  ))}
</tbody>
      </table>
      <div>
        <label htmlFor="totalPrice">Total Price</label>
        <Field type="text" id="totalPrice" name="totalPrice" value={totalPrice + selectedVenuePrice} readOnly />
      </div>
    </div>

        </Form>
        <div>
          <button type="submit">Place Reservation</button>
        </div>
      </Form>
    </Formik>
  );
};

export default ReservationForm;
*/

/*
import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './reserve.module.css';

const ReservationForm = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [venueList, setVenueList] = useState([]);
  const [selectedVenuePrice, setSelectedVenuePrice] = useState(0);

  const [selectedMenuItems, setSelectedMenuItems] = useState([]);

  const [selectedVenue, setSelectedVenue] = useState('');

  const [error, setError] = useState('');

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/menu');
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  useEffect(() => {
    const fetchVenueList = async () => {
      try {
        const response = await axios.get('http://localhost:8081/Room_Name');
        setVenueList(response.data.map(item => item.Room_Name));
        setSelectedVenue(response.data.length > 0 ? response.data[0].Room_Name: '');
      } catch (error) {
        console.error('Error fetching venue list:', error);
      }
    };

    fetchVenueList();
    fetchMenuItems();
  }, []);

  const handleQuantityChange = (food, quantity) => {
    setMenuItems(prevMenuItems => {
      return prevMenuItems.map(item => {
        if (item.Food === food) {
          return { ...item, quantity };
        }
        return item;
      });
    });

    if (quantity) {
      setSelectedMenuItems(prevSelectedItems => [...prevSelectedItems, { food, quantity }]);
    } else {
      setSelectedMenuItems(prevSelectedItems =>
        prevSelectedItems.filter(item => item.food !== food)
      );
    }
  };

  const fetchVenuePrice = async Room_Name => {
    try {
      const response = await axios.get(`http://localhost:8081/Room_Price/${Room_Name}`);
      const price = response.data[0].Price;
      return price;
    } catch (error) {
      return 0;
    }
  };

  useEffect(() => {
    const newTotalPrice = menuItems.reduce((total, item) => {
      return total + (item.quantity || 0) * item.price;
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [menuItems]);

  const initialValues = {
    name: '',
    email: '',
    contact_no: '',
    selectedMenuItems: [],
    eventType: '',
    date: '',
    eventTime: '',
    selectedVenue: '',
    totalOrders: '',
  };

  useEffect(() => {
    const updateVenueData = async () => {
      try {
        const venuePrice = await fetchVenuePrice(selectedVenue);
        setSelectedVenuePrice(venuePrice);
      } catch (error) {
        console.error('Error fetching venue price:', error);
        setSelectedVenuePrice(0);
      }
    };

    updateVenueData();
  }, [selectedVenue]);

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    contact_no: Yup.string().required('Required'),
    selectedMenuItems: Yup.array().min(1, 'Select at least one menu item').required('Required'),
    eventType: Yup.string().required('Required'),
    date: Yup.date().required('Required'),
    eventTime: Yup.string().required('Required'),
    selectedVenue: Yup.string().required('Required'),
  });

  const handleVenueChange = selectedVenue => {
    const updateVenueData = async () => {
      try {
        const venuePrice = await fetchVenuePrice(selectedVenue);
        setSelectedVenuePrice(venuePrice);
      } catch (error) {
        console.error('Error fetching venue price:', error);
        setSelectedVenuePrice(0);
      }
    };

    setSelectedVenue(selectedVenue);
    updateVenueData();
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const { selectedMenuItems, totalPrice, selectedVenuePrice, ...formData } = values;
  
      const selectedMenu = menuItems.filter(item => selectedMenuItems[item.Food]);
  
      const requestData = {
        ...formData,
        selectedMenuItems: JSON.stringify(selectedMenu.map(item => ({ food: item.Food, quantity: item.quantity || 0 }))),
        totalOrders: totalPrice + selectedVenuePrice,
      };
  
      const response = await axios.post('http://localhost:8081/customersorder', requestData);
      setSubmitting(false);
      resetForm();
      setTotalPrice(0);
      setSelectedMenuItems([]);
      setSelectedVenuePrice(0);
      setError('Reservation saved successfully.');
  
      console.log('Selected Menu Items:', selectedMenuItems);
      console.log('Form Values:', values);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error submitting reservation:', error);
      setError('Error saving reservation. Please try again.');
    }
  };
  
  
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form>
        <div className="clearfix">
          <label htmlFor="name">Name:</label>
          <Field type="text" id="name" name="name" />
          <ErrorMessage name="name" component="div" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <Field type="text" id="email" name="email" />
          <ErrorMessage name="email" component="div" />
        </div>
        <div>
          <label htmlFor="contact_no">Contact number:</label>
          <Field type="text" id="contact_no" name="contact_no" />
          <ErrorMessage name="contact_no" component="div" />
        </div>

        <div>
          <label htmlFor="selectedVenue">Venue:</label>
          <Field
            as="select"
            id="selectedVenue"
            name="selectedVenue"
            value={selectedVenue}
            onChange={e => handleVenueChange(e.target.value)}
          >
            <option value="">Select Venue</option>
            {venueList.map(venue => (
              <option key={venue} value={venue}>
                {venue}
              </option>
            ))}
          </Field>
          <ErrorMessage name="selectedVenue" component="div" />
        </div>

        <div>
          <label htmlFor="eventType">Event name:</label>
          <Field type="text" id="eventType" name="eventType" />
          <ErrorMessage name="eventType" component="div" />
        </div>

        <div>
          <label htmlFor="date">Date of Reservation:</label>
          <Field type="date" id="date" name="date" />
          <ErrorMessage name="date" component="div" />
        </div>

        <div>
          <label htmlFor="eventTime">Event Time:</label>
          <Field type="time" id="eventTime" name="eventTime" />
          <ErrorMessage name="eventTime" component="div" />
        </div>

        <div>
          <Field type="hidden" name="selectedMenuItems" />
          <div className="right-form">
            <label>Menu Items</label>
            <table>
              <thead>
                <tr>
                  <th>Check Item/s</th>
                  <th>Food</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.map(item => (
                  <tr key={item.Food}>
                    <td>
                      <input
                        type="checkbox"
                        name={`selectedMenuItems.${item.Food}`}
                        checked={item.quantity > 0}
                        onChange={e => handleQuantityChange(item.Food, e.target.checked)}
                      />
                    </td>
                    <td>{item.Food}</td>
                    <td>{item.price}</td>
                    <td>
                      <Field
                        type="number"
                        name={`quantity.${item.Food}`}
                        onChange={e => handleQuantityChange(item.Food, parseInt(e.target.value, 10))}
                      />
                    </td>
                    <td>{(item.quantity || 0) * item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <label htmlFor="totalPrice">Total Price</label>
              <Field type="text" id="totalPrice" name="totalPrice" value={totalPrice + selectedVenuePrice} readOnly />
            </div>
          </div>
        </div>

        <div>
          <button className="place" type="submit">
            Place Reservation
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default ReservationForm;
*/

























/*
import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './reserve.module.css';
const ReservationForm = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [venueList, setVenueList] = useState([]);
  const [selectedVenuePrice, setSelectedVenuePrice] = useState(0);
  const [venuePrices, setVenuePrices] = useState({});
  const [displayedVenuePrices, setDisplayedVenuePrices] = useState({}); // New state variable

  const [selectedVenue, setSelectedVenue] = useState('');
  const [error, setError] = useState('');

  const [selectedMenuItems, setSelectedMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/menu');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    const fetchVenueList = async () => {
      try {
        const response = await axios.get('http://localhost:8081/Room_Name');
        const venues = response.data.map((item) => item.Room_Name);
        setVenueList(venues);
        setDisplayedVenuePrices(
          venues.reduce((prices, venue) => {
            prices[venue] = venuePrices[venue] || 0;
            return prices;
          }, {})
        );
      } catch (error) {
        console.error('Error fetching venue list:', error);
      }
    };

    fetchVenueList();
    fetchMenuItems();
  }, [venuePrices]);

  const handleQuantityChange = (food, isChecked) => {
    setMenuItems((prevMenuItems) =>
      prevMenuItems.map((item) => {
        if (item.Food === food) {
          const newQuantity = isChecked ? (item.quantity || 0) + 1 : 0;
          return { ...item, quantity: newQuantity };
        } else {
          return item;
        }
      })
    );
  
    if (isChecked) {
      setSelectedMenuItems((prevSelectedItems) => [...prevSelectedItems, { food }]);
    } else {
      setSelectedMenuItems((prevSelectedItems) =>
        prevSelectedItems.filter((item) => item.food !== food)
      );
    }
  };
  
  
  
  useEffect(() => {
    const newTotalPrice = menuItems.reduce(
      (total, item) => total + (item.quantity || 0) * item.price,
      0
    );
    setTotalPrice(newTotalPrice);
  }, [menuItems]);



  const initialValues = {
    name: '',
    email: '',
    contact_no: '',
    selectedVenue: '',
    selectedMenuItems: [], // Assuming you want to store selected menu items as an array
    eventType: '',
    date: '',
    eventTime: '',
    totalOrders: '',
  };



  useEffect(() => {
    const fetchVenuePrices = async () => {
      try {
        const response = await axios.get('http://localhost:8081/Room_Name');
        const prices = {};
        response.data.forEach((item) => {
          prices[item.Room_Name] = item.Price;
        });
        setVenuePrices(prices);
      } catch (error) {
        console.error('Error fetching venue prices:', error);
      }
    };

    fetchVenuePrices();
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    contact_no: Yup.string().required('Required'),
    selectedMenuItems: Yup.array().min(1, 'Select at least one menu item').required('Required'),
    eventType: Yup.string().required('Required'),
    date: Yup.date().required('Required'),
    eventTime: Yup.string().required('Required'),
    selectedVenue: Yup.string().required('Required'),
  });

  const handleVenueChange = (selectedVenue) => {
  setSelectedVenue(selectedVenue);
  setSelectedVenuePrice(displayedVenuePrices[selectedVenue] || 0);
};


const handleSubmit = async (values, { setSubmitting, resetForm }) => {
  try {
    const response = await axios.post('http://localhost:8081/customersorder', values);

    console.log('Server response:', response.data);

    setSubmitting(false);
    resetForm();
    setTotalPrice(0);
    setSelectedMenuItems([]);
    setSelectedVenuePrice(0);
    setError('Reservation saved successfully.');
  } catch (error) {
    console.error('Error submitting reservation:', error);
    setError('Error saving reservation. Please try again.');
  }
};

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form>
        <div className="clearfix">
          <label htmlFor="name">Name:</label>
          <Field type="text" id="name" name="name" />
          <ErrorMessage name="name" component="div" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <Field type="text" id="email" name="email" />
          <ErrorMessage name="email" component="div" />
        </div>
        <div>
          <label htmlFor="contact">Contact number:</label>
          <Field type="text" id="contact" name="contact" />
          <ErrorMessage name="contact" component="div" />
        </div>

        <div>
          <label htmlFor="eventType">Event name:</label>
          <Field type="text" id="eventType" name="eventType" />
          <ErrorMessage name="eventType" component="div" />
        </div>

        <div>
          <label htmlFor="date">Date of Reservation:</label>
          <Field type="date" id="date" name="date" />
          <ErrorMessage name="date" component="div" />
        </div>

        <div>
          <label htmlFor="eventTime">Event Time:</label>
          <Field type="time" id="eventTime" name="eventTime" />
          <ErrorMessage name="eventTime" component="div" />
        </div>

        <div className='tables'>
          <label htmlFor="selectedVenue">Venue:</label>
          <table>
            <thead>
              <tr>
                <th>Select</th>
                <th>Room</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {venueList.map((venue) => (
                <tr key={venue}>
                  <td>
                    <Field
                      type="radio"
                      name="selectedVenue"
                      value={venue}
                      checked={selectedVenue === venue}
                      onChange={(e) => handleVenueChange(e.target.value)}
                    />
                  </td>
                  <td>{venue}</td>
                  <td>{displayedVenuePrices[venue]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ErrorMessage name="selectedVenue" component="div" />
        </div>


        <div className="right-form">
          <label>Menu Items</label>
          <table>
            <thead>
              <tr>
                <th>Check Item/s</th>
                <th>Food</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item) => (
                <tr key={item.Food}>
                  <td>
                    <input
                      type="checkbox"
                      name={`selectedMenuItems.${item.Food}`}
                      checked={item.quantity > 0}
                      onChange={(e) => handleQuantityChange(item.Food, e.target.checked)}
                    />
                  </td>
                  <td>{item.Food}</td>
                  <td>{item.price}</td>
                  <td>
                    <Field
                      type="number"
                      name={`quantity.${item.Food}`}
                      onChange={(e) =>
                        handleQuantityChange(item.Food, parseInt(e.target.value, 10))
                      }
                    />
                  </td>
                  <td>{(item.quantity || 0) * item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <label htmlFor="totalPrice">Total Price</label>
            <Field
              type="text"
              id="totalPrice"
              name="totalPrice"
              value={totalPrice + selectedVenuePrice}
              readOnly
            />
          </div>
        </div>

        <div className="button-container">
          <button className="place" type="submit">
            Place Reservation
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default ReservationForm;
*/




//FUNCTIONAL
/*
import './reserve.module.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReservationForm = () => {
  // State for form fields
  const [name, setName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [venue, setVenue] = useState('');
  const [menu, setMenu] = useState([]);
  const [event, setEvent] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [totalOrders, setTotalOrders] = useState('');
  const [status, setStatus] = useState('Reserved'); // Default status

  // State for menu items
  const [menuItems, setMenuItems] = useState([]);

  // State for selected menu items with quantity
  const [selectedMenu, setSelectedMenu] = useState([]);

  // State for venue options
  const [venueOptions, setVenueOptions] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState('');
  const [venuePrice, setVenuePrice] = useState(0);

  // State for total price
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8081/api/menu')
      .then(response => {
        console.log('Menu Items Response:', response.data);
        setMenuItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching menu:', error);
      });
      
    // Fetch venue options from the server
    axios.get('http://localhost:8081/Room_Name')
      .then(response => {
        setVenueOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching venue options:', error);
      });
  }, []);

  // Function to handle menu item selection
  const handleMenuChange = (food, price, quantity) => {
    const existingItemIndex = selectedMenu.findIndex(item => item.food === food);
    if (existingItemIndex !== -1) {
      // Update existing item
      const updatedMenu = [...selectedMenu];
      updatedMenu[existingItemIndex].quantity = quantity;
      setSelectedMenu(updatedMenu);
    } else {
      // Add new item
      setSelectedMenu(prevMenu => [...prevMenu, { food, price, quantity }]);
    }
  };

  // Function to handle venue selection
  const handleVenueChange = (selectedRoom, price) => {
    setSelectedVenue(selectedRoom);
    setVenuePrice(price);
  };

  // Function to calculate total price
  useEffect(() => {
    const menuTotal = selectedMenu.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalPrice = menuTotal + venuePrice;
    setTotalPrice(totalPrice);
  }, [selectedMenu, venuePrice]);

  // Function to handle form submission
  const handleSubmit = () => {
    // Prepare data for the POST request
    const reservationData = {
      Name: name,
      Contact_No: contactNo,
      Venue: selectedVenue,
      Menu: JSON.stringify(selectedMenu),
      Event: event,
      Date: date,
      Time: time,
      Total_Orders: totalOrders,
      Status: status,
    };

    // Send reservation data to the server
    axios.post('http://localhost:8081/api/saveReservation', reservationData)
  .then(response => {
    console.log('Reservation saved successfully:', response.data);
    // Reset form fields
    // TODO: Add logic to redirect or show a success message
  })
  .catch(error => {
    console.error('Error saving reservation:', error);
    // Log more details about the error
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Server responded with an error status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from the server');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up the request:', error.message);
    }
    // TODO: Handle error, show an error message, etc.
  });

  };

  return (
    <div>
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
  
      <label>Contact Number:</label>
      <input type="text" value={contactNo} onChange={(e) => setContactNo(e.target.value)} />
  
      <label>Event:</label>
      <input type="text" value={event} onChange={(e) => setEvent(e.target.value)} />
  
      <label>Date:</label>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
  
      <label>Time:</label>
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
  
      <h2>Menu</h2>
      <table>
        <thead>
          <tr>
            <th>Food</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item) => (
            <tr key={item.Food}>
              <td>{item.Food}</td>
              <td>{item.price}</td>
              <td>
              <input
                type="checkbox"
                onChange={(e) => handleMenuChange(item.Food, item.price, e.target.checked ? 1 : 0)}
              />
               <input
                  type="number"
                  min="0"
                  value={selectedMenu.find((selectedItem) => selectedItem.food === item.Food)?.quantity || 0}
                  onChange={(e) => handleMenuChange(item.Food, item.price, parseInt(e.target.value, 10))}
                />
              </td>
              <td>
                {selectedMenu.find((selectedItem) => selectedItem.food === item.Food)?.price || 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  
      <h2>Venue Options</h2>
      <div>
        {venueOptions.map((venue) => (
          <div key={venue.Room_Name}>
            <input
              type="radio"
              name="venue"
              value={venue.Room_Name}
              checked={selectedVenue === venue.Room_Name}
              onChange={() => handleVenueChange(venue.Room_Name, venue.Price)}
            />
            {venue.Room_Name} - ${venue.Price}
          </div>
        ))}
      </div>
  
      <h2>Total Price</h2>
      <input type="text" value={totalPrice} readOnly />
  
      <label>Status:</label>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Reserved">Reserved</option>
        <option value="Paid">Paid</option>
        <option value="Cancelled">Cancelled</option>
      </select>
  
      <button onClick={handleSubmit}>Submit Reservation</button>
    </div>
  );
  
};

export default ReservationForm;
*/


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './reserve.module.css';


const ReservationForm = () => {
  // State for form fields
  const [name, setName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [venue, setVenue] = useState('');
  const [menu, setMenu] = useState([]);
  const [event, setEvent] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [totalOrders, setTotalOrders] = useState('');
  const [status, setStatus] = useState('Reserved'); // Default status

  // State for menu items
  const [menuItems, setMenuItems] = useState([]);

  // State for selected menu items with quantity
  const [selectedMenu, setSelectedMenu] = useState([]);

  // State for venue options
  const [venueOptions, setVenueOptions] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState('');
  const [venuePrice, setVenuePrice] = useState(0);

  // State for total price
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8081/api/menu')
      .then(response => {
        console.log('Menu Items Response:', response.data);
        setMenuItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching menu:', error);
      });
      
    // Fetch venue options from the server
    axios.get('http://localhost:8081/Room_Name')
      .then(response => {
        setVenueOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching venue options:', error);
      });
  }, []);

  // Function to handle menu item selection
  const handleMenuChange = (food, price, quantity) => {
    const existingItemIndex = selectedMenu.findIndex(item => item.food === food);
    if (existingItemIndex !== -1) {
      // Update existing item
      const updatedMenu = [...selectedMenu];
      updatedMenu[existingItemIndex].quantity = quantity;
      setSelectedMenu(updatedMenu);
    } else {
      // Add new item
      setSelectedMenu(prevMenu => [...prevMenu, { food, price, quantity }]);
    }
  
    // Calculate total price after updating the menu
    const menuTotal = selectedMenu.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalPrice = menuTotal + venuePrice;
    setTotalPrice(totalPrice);
  };

  // Function to handle venue selection
  const handleVenueChange = (selectedRoom, price) => {
    setSelectedVenue(selectedRoom);
    setVenuePrice(price);
  
    // Calculate total price after updating the venue
    const menuTotal = selectedMenu.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalPrice = menuTotal + price;
    setTotalPrice(totalPrice);
  };

  // Function to calculate total price
  useEffect(() => {
    const menuTotal = selectedMenu.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalPrice = menuTotal + venuePrice;
    setTotalPrice(totalPrice);
  }, [selectedMenu, venuePrice]);

  // Function to handle form submission
  const handleSubmit = () => {
    // Prepare data for the POST request

    const selectedFoodNames = selectedMenu.map(item => item.food);

    const reservationData = {
      Name: name,
      Contact_No: contactNo,
      Venue: selectedVenue,
      Menu: selectedFoodNames.join(', '),
      Event: event,
      Date: date,
      Time: time,
      Total_Orders: totalPrice,
      Status: status,
    };

    // Send reservation data to the server
    axios.post('http://localhost:8081/api/saveReservation', reservationData)
  .then(response => {
    console.log('Reservation saved successfully:', response.data);
    // Reset form fields
    // TODO: Add logic to redirect or show a success message
  })
  .catch(error => {
    console.error('Error saving reservation:', error);
    // Log more details about the error
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Server responded with an error status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from the server');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up the request:', error.message);
    }
    // TODO: Handle error, show an error message, etc.
  });

  };

  return (
    <div>
      {/* Form Fields */}
      <h2>Customers Information</h2>
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
  
      <label>Contact Number:</label>
      <input type="text" value={contactNo} onChange={(e) => setContactNo(e.target.value)} />
  
      <label>Event:</label>
      <input type="text" value={event} onChange={(e) => setEvent(e.target.value)} />
  
      <label>Date:</label>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
  
      <label>Time:</label>
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
  
      {/* Menu Table */}
      <h2>Menu</h2>
      <table>
        <thead>
          <tr>
            <th>Food</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item) => (
            <tr key={item.Food}>
              <td>{item.Food}</td>
              <td>{item.price}</td>
              <td>
                <input
                  type="checkbox"
                  onChange={(e) => handleMenuChange(item.Food, item.price, e.target.checked ? 1 : 0)}
                />
                <input
                  type="number"
                  min="0"
                  value={selectedMenu.find((selectedItem) => selectedItem.food === item.Food)?.quantity || 0}
                  onChange={(e) => handleMenuChange(item.Food, item.price, parseInt(e.target.value, 10))}
                />
              </td>
              <td>
                {selectedMenu.find((selectedItem) => selectedItem.food === item.Food)?.price * 
                  selectedMenu.find((selectedItem) => selectedItem.food === item.Food)?.quantity || 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  
      {/* Venue Options */}
      <h2>Venue Options</h2>      
      <div className= "venue-container">
        {venueOptions.map((venue) => (
            <div key={venue.Room_Name} className= "venue-option">
            <input
              type="radio"
              name="venue"
              value={venue.Room_Name}
              checked={selectedVenue === venue.Room_Name}
              onChange={() => handleVenueChange(venue.Room_Name, venue.Price)}
            />
            {venue.Room_Name} - P{venue.Price}
          </div>
        ))}
      </div>
  
      {/* Total Price */}
      <h2>Total Price and Reservation Status</h2>
      <input type="text" value={totalPrice} readOnly />
  
      {/* Status */}
      <label>Status:</label>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Reserved">Reserved</option>
        <option value="Paid">Paid</option>
        <option value="Cancelled">Cancelled</option>
      </select>
  
      {/* Submit Button */}
      <div className={styles.btnContainer}>
      <div className={styles.buttonSubmit}>
      <button onClick={handleSubmit}> Place Reservation</button>
      </div>
      </div>
    </div>
  );
  
};

export default ReservationForm;
