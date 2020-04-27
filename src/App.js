import React, { useEffect, useState } from 'react';
import './App.scss';
import axios from "axios";
import { MDBDataTable } from 'mdbreact';
function createData(Country, newCase, allCase, newDeath, allDeaths, newRecovered, allRecovered) {
  return { Country, newCase, allCase, newDeath, allDeaths, newRecovered, allRecovered };
}


function App() {
  const [data1, setdata] = useState({})
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://api.covid19api.com/summary"
    }).then(res => setdata(res.data))
      .catch(err => alert(err))
  }, [])

  const renderTable = () => {
    let Countries1 = data1.Countries

    if (Countries1) {
      const data = {
        columns: [
          {
            label: "Country",
            field: "Country",
            sort: "arc",
            width: 100
          },

          {
            label: "New Confirmed",
            field: "NewConfirmed",
            sort: "arc",
            width: 100
          },
          {
            label: "Total Confirmed",
            field: "TotalConfirmed",
            sort: "arc",
            width: 100
          },
          {
            label: "New Deaths",
            field: "NewDeaths",
            sort: "arc",
            width: 100
          },
          {
            label: "Total Deaths",
            field: "TotalDeaths",
            sort: "arc",
            width: 100
          },
          {
            label: "New Recovered",
            field: "NewRecovered",
            sort: "arc",
            width: 100
          },
          {
            label: "Total Recovered",
            field: "TotalRecovered",
            sort: "arc",
            width: 100
          },
        ],
        rows: Countries1
      }
      return <MDBDataTable
        striped
        bordered
        small
        data={data}
      />





    }

  }
  const renderCard = () => {
    let Countries = data1.Countries
    if (Countries) {
      return Countries.map((item, index) => {
        return (
          <div key={index} className="card cardItem col-4">
            <div className="card-body">
              <h3 className="card-title">{item.Country}</h3>
              <p style={{ color: "blue" }}>New case :   +{item.NewConfirmed}</p>
              <p style={{ color: "blue" }}>Total case:   {item.TotalConfirmed}</p>
              <p style={{ color: "red" }}>New Deaths:   +{item.NewDeaths}</p>
              <p style={{ color: "red" }}>Total Deaths:   {item.TotalDeaths}</p>
              <p style={{ color: "green" }}>New recovered:   +{item.NewRecovered}</p>
              <p style={{ color: "green" }}>Total recovered:   {item.TotalRecovered}</p>
              <p>Date Updatad: {new Date(item.Date).toDateString()}</p>
            </div>
          </div>

        )
      })
    }
  }
  return (
    <section className="container-fluid body">
      <h1>The value about case of Covid-19 viruss in the world</h1>
      <h3>Date updated: {new Date(data1.Date).toDateString()}</h3>
      {/* <div className="row">
        {renderCard()}
      </div> */}
      {renderTable()}
    </section >
  );
}
export default App;
