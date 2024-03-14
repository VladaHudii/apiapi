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
   const listElement = document.querySelector('#message-list');


    list.forEach((value) => {
    const itemElement = document.createElement('li');

    const imgUrlParams = new URLSearchParams({ w: 120, h: 120});
    imgUrlParams.append('r', value.id);

    itemElement.textContent = `
    <figure> 
    <img src="https://api.lorem.space/image/face?${imgUrlParams.toString}" /> 
    <figcaption>
    <span>${value.name}</span>
    <span>${value.username}</span>
    </figcaption>
    </figure>
   
    `;


    itemElement.addEventListener('click', async () => {
    const detail = await this.getUserById(value.id);
    const detailItem = document.createElement('p');
    detailItem.textContent = `
    Company: ${value.company.name},
    Phone: ${detail.phone},
    Email: ${detail.email},
    Address: ${value.address.street}, ${value.address.suite}, ${value.address.city}, ${value.address.zipcode},
     `;

    itemElement.append(detailItem);
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

