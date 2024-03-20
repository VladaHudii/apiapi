function UsersService(url) {
    this.baseUrl = url;
}


UsersService.prototype.getAllUsers = async function () {
  try {
    const response = await fetch(this.baseUrl);
    const data = await response.json();
    return data;
  } catch(err) {
    console.error('Error receive the list:', err);
    return [];
  }
}

UsersService.prototype.getUserById = async function(id) {
    try {
        const response = await fetch(`${this.baseUrl}/${id}`);
        const data = await response.json();
        return data;
      } catch(err) {
        console.error('Error receive the id:', err);
        return [];
      }
    }


   UsersService.prototype.renderUsersList = function (list) {
   const listElement = document.querySelector('.message-list');
   const userDetailsContainer = document.querySelector('.user-details');


    list.forEach((value) => {
    const itemElement = document.createElement('li');

    const imgUrlParams = new URLSearchParams({ w: 120, h: 120});
    imgUrlParams.append('r', value.id);

    itemElement.innerHTML = `
    <figure> 
    <img src="https://api.lorem.space/image/face?${imgUrlParams.toString()}" /> 
    <figcaption>
    <span class="name">${value.name}</span>
    <span>Company: ${value.company.name}</span>
    </figcaption>
    </figure>
   
    `;

    itemElement.addEventListener('click', async () => {

    const detailItem = document.createElement('loading');
    userDetailsContainer.innerHTML = `
    <span class="loading">Loading...</span>
    `;
    userDetailsContainer.append(detailItem);

    const detail = await this.getUserById(value.id);
    userDetailsContainer.innerHTML = `
                <figure>
                <img src="https://api.lorem.space/image/face?${imgUrlParams.toString()}" />
                <figcaption>
                <div class="value">
                <span class="name">${value.name}</span> 
                <span class="username">Username: ${value.username}</span>
                </div>
                
                <br>
                <div class="text">
                <div class="left-column">
                <p>Company</p>
                <p>Phone</p>
                <p>Email</p>
                <p>Address</p>
                </div>

                <div class="right-column">
                <p>${value.company.name}</p>
                <p>${detail.phone}</p>
                <p><a href="#">${detail.email}</a></p>
                <p>${value.address.street}, ${value.address.suite}, ${value.address.city}, ${value.address.zipcode}</p>
                </div>
                </div>
                </figcaption>
                </figure>
            `;
    });

    listElement.appendChild(itemElement);
    });
}

const userService = new UsersService('https://jsonplaceholder.typicode.com/users');
userService.getAllUsers()
  .then(list => {
    userService.renderUsersList(list);
  })
  .catch(err => {
    console.error (err)
  })

