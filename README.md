# CarCar

Team:

* Joyce Lum - Services
* Jonathan Yoo - Sales

## Design
Using the concept of domain driven design, we first started thinking of what would be entities
and value objects. In inventory, we had manufacturers, models and cars as the entities which were
value objects in our services and sales apps. We thought about how certain models grouped together
such as salespeople and technicians since they are both employee types so we combined them into the
same category through an "Employees" tab in the nav bar. Although they technically live in different
microservices and do not share a bounded context, it made sense for the creation forms to live together
for the best user experience.

When drawing out a context map, it was easy to see that our sales and services apps pull data from the
inventory app. This exercise also made it easy to see what the bounded contexts were.

For the Service Apointment related forms, features and list, we decided to display them all on one page
which is accessible through the "Appointments" tab since they all have the same bounded context.

On the Sales related portion of our project, we put together the add new customer form, create new sale form
and the sales record list along with the drop down filter feature all live on the "Sales" page since it is
all part of the same bounded context as well.

For our small scale project, we didn't really need to create aggregates because there are limited models
unless you consider the manufacturer, model and car models in the inventory app to be the root aggregate
of their corresponding vo models within our individual sales/services apps since we must change data from
that "parent" model or root aggregate in order to change what's in the value object models.

In order to prevent bad data from entering our apps, we are using an anti-corruption layer. In our sales 
poller when sending over the data from inventory to the sales app, we had to consider that we only wanted
some fields from the entity model. We also reformatted it by converting all the foreign key objects to 
string representations of their names because to we could filter our sales record list. FOr the service poller,
we did something similar but instead we just whittled it down to one singular property field that was ported
over because all we really needed was the VIN and nothing else to make our search by VIN bar work.

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
  - List of past service appointments filterable by VIN


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
- When an automobile is purchased, remove it from inventory

- Create navbar links:
  - Create salesperson form
  - Potential customer form
  - New sale record form
  - List of all sales
  - Specific sales person's sales history