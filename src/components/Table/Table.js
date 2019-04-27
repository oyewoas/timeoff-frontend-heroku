import React, { Component } from 'react';


class Table extends Component {
    render(){
        return(
            <div>
                <div className="container-fluid">
                <div className="row">
                <div className="col-sm-12">
                <table class="table">
  <thead>
    <tr>
      <th scope="col">Type</th>
      <th scope="col">Deducted</th>
      <th scope="col">Dates</th>
      <th scope="col">Approved by</th>
      <th scope="col"></th>
      <th scope="col">Status </th>

    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>@twitter</td>
      <td>@twitter</td>

    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
      <td>@twitter</td>
      <td>@twitter</td>

    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
      <td>@twitter</td>
      <td>@twitter</td>

    </tr>
    <tr>
      <th scope="row">4</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
      <td>@twitter</td>
      <td>@twitter</td>

    </tr>
    <tr>
      <th scope="row">5</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
      <td>@twitter</td>
      <td>@twitter</td>

    </tr>
  </tbody>
</table>
                </div>
                </div>
                </div>
                </div>
            
        )
    }
}

export default Table;