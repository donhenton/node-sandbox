let rp = require('request-promise')

module.exports = function (app) {

  const BASE_URL = 'http://donhenton-spring-boot.herokuapp.com/birt/'

  var orderedPromisesRender = function (req, res) {

    res.render('promises/orderDemo', {
      title: 'Ordered Promise Demonstation'
    });
  };

  var asyncDemoRender = function (req, res) {

    res.render('promises/asyncDemo', {
      title: 'Async Demonstation',
      offices: [],
      customers: [],
      selectedEmployees: []
    });

  };

  let getOfficesRender = async function (req, res) {

    let url = BASE_URL + 'offices/all';
    let options = {
      method: 'GET',
      json: true,
      uri: url

    }
    let enrichedOffices = [];
    let offices = await rp(options);

    let empFunction = async  (officeId) => {
      let empOptions = {
        method: 'GET',
        json: true,
        uri: BASE_URL + 'employees/office/' + officeId
      };

      let officeEmployees = await rp(empOptions);
      return  officeEmployees;
    }

    /*
     offices.forEach(off => {
     
     let employees =   await empFunction(off.officeCode)
     off['employees'] = employees;
     enrichedOffices.push(off);
     
     });
     */

    // https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop

    for (let office of offices) {
      const employees = await empFunction(office.officeCode);
      const mE = employees.map(e => {
        return {id: e.employeeNumber, lastName: e.lastName, firstName: e.firstName, email: e.email}
      })

      office['employees'] = mE;

      enrichedOffices.push(office);
    }

    req.session.enrichedOffices = enrichedOffices;
    req.session.selectedOffice = enrichedOffices[0];
    res.render('promises/asyncDemo', {
      title: 'Async Demonstation',
      offices: enrichedOffices,
      customers: [],
      selectedOffice: enrichedOffices[0],
      selectedEmployees: []
    });

  }

  let getEmployeeCustomersRender = async function (req, res, next) {

    let employeeChoices = req.query.selectedEmployees;
   // console.log('form array 1 '+employeeChoices + " "+(typeof employeeChoices))
    //array of strings
    if (!employeeChoices) {
      employeeChoices = [];
    }
    
    // if only one select it's returned as an array
    
    if ((typeof employeeChoices) === 'string') {
      employeeChoices = [employeeChoices]; 
    }
    
    let customers = [];

    let empCustomers = async function (empId) {

      let options = {
        method: 'GET',
        json: true,
        uri: BASE_URL + 'employees/' + empId
      };
      let cust = [];

      cust = await rp(options);

      return cust;
    }


    try {
     //  console.log('form array 2 '+employeeChoices)
      for (let empId of employeeChoices) {
       // console.log("getting empid " + empId)
        const employeeWithCustomers = await empCustomers(empId);
        customers.push(employeeWithCustomers);

      }

      customers = customers.map(e => {

        const cust = e.customers.map(c => {
          return {customerName: c.customerName, country: c.country}
        })
        return {employeeName: e.firstName + " " + e.lastName,
          customers: cust}

      });

      res.render('promises/asyncDemo', {
        title: 'Async Demonstation',
        offices: req.session.enrichedOffices,
        selectedOffice: req.session.selectedOffice,
        customers: customers,
        selectedEmployees: employeeChoices
      });
    } catch (e) {
      next(e)
    }
  }
  

  let changeOfficeRender = function(req,res) {
    
    
    let officeId = req.query.office;
    foundOffice = req.session.enrichedOffices.filter(o => {
      return o.officeCode === officeId;
    })

    foundOffice = foundOffice[0];
    
    req.session.selectedOffice = foundOffice;
    res.render('promises/asyncDemo', {
      title: 'Async Demonstation',
      offices: req.session.enrichedOffices,
      customers: [],
      selectedOffice:  foundOffice,
      selectedEmployees: []
    });
    
    
  }
  
  
  
  

  // routes

  app.get('/promiseOrderDemo.doc', orderedPromisesRender);
  app.get('/asyncDemo.doc', asyncDemoRender);
  app.get('/asyncDemo/getOffices.doc', getOfficesRender);
  app.get('/asyncDemo/employeeCustomers.doc', getEmployeeCustomersRender);
  app.get('/asyncDemo/changeOffice.doc', changeOfficeRender);


}