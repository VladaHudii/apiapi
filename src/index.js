function UsersService(url) {
    this.baseUrl = url;
  }
  
  
  UsersService.prototype.getAllUsers = async function () {
  try {
    const response = await fetch(this.baseUrl);
    const data = response.json();
    return data;
  } catch(err) {
    console.error('Error receive the list:', err);
    return [];
  }
  }
  
  
  UsersService.prototype.getUserById = async function(id) {
    try {
        const response = await fetch(`${this.baseUrl}/${id}`);
        const data = response.json();
        return data;
      } catch(err) {
        console.error('Error receive id:', err);
        return [];
      }
  }
  
  
  UsersService.prototype.renderUsersList = function (list) {
   const listElement = document.querySelector('#message-list');
  
  
   list.forEach((value) => {
    const itemElement = document.createElement('li');
  
  
    const imgUrlParams = new URLSearchParams({ w: 120, h: 120 });
    imgUrlParams.append('r', value.id );
  
  
    itemElement.innerHTML = `
    <figure>
    <img src="https://api.lorem.space/image/face?${imgUrlParams.toString()}" />    
    <figcaption>
    <span>${value.email}</span>
    <span>${value.name}</span>
    </figcaption>
    </figure>
   
    `;
  
  
    itemElement.addEventListener( 'click', async () => {
        const detail = await this.getUserById(value.id);
        console.e.log(detail);
    })
  
  
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
  
  