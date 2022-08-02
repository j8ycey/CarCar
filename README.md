# CarCar

Team:

* Joyce Lum - Service
* Jonathan Yoo - Sales

## Design

## Inventory micrservice
We decided to create an inventory list page which houses the list of manufacturers, models and cars with inventory on one page because they are all part of the same bounded context. 

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.

------------------------------------------------------------------------------------------------------------

## Inventory To Do
- Show a list of manufacturers
- Create a manufacturer form
- Show a list of vehicle models
- Create a vehicle model form
- Show a list of automobiles in inventory
- Create an automobile in inventory form

------------------------------------------------------------------------------------------------------------


# Service To Do's
- Technician creation form:
  - tech's name (char field)
  - employee id (small positive integer field)
- Service appointment form:
  - VIN (positive integer field)
  - customer name (char field)
  - date/time of the appointment (date/time field)
  - assigned technician (foreign key)
  - reason for the service appointment (text field)
- Show list of scheduled appointments:
  - VIN, customer name, date/time of appt, assigned technician, reason for service
  - If there's a VIN, the car was purchased from the dealership. Mark as VIP
  - Cancel (delete) button for each appointment
  - If appointment has finished, show a finished status
  * If appt is canceled or finished, it should no longer show up in the list of appointments
- Create a page that allows someone to search for a list of past service appoints by VIN. List should have:
  - Customer name, date and time of the appointment, the assigned technician, and reason for service

- Create navbar links:
  - Create technician form
  - Service appointment form
  - List of appointments
  - List of past service appointments by VIN search

------------------------------------------------------------------------------------------------------------

# Sales To Do's
- Salesperson creation form:
  - salesperson's name (char field)
  - salesperson's id (small positive integer field)
- Potential customer form:
  - customer name (char field)
  - customer address (char field)
  - customer phone number (phone field)
- Record a new sale form:
  - Choose an automobile (foreign key) - drop down
  - Choose a salesperson (foreign key) - drop down
  - Choose a customer (foreign key) - drop down
  - sale price (large positive integer form)
- List all sales
  - sales person's name
  - sales person's employee number
  - the purchaser's name
  - VIN
  - price of the sale
- List of specific sales person's sales history via drop down. List should show:
  - sales person, customer, VIN, price of the sale

- Create navbar links:
  - Create salesperson form
  - Potential customer form
  - New sale record form
  - List of all sales
  - Specific sales person's sales history