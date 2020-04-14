const getbutton = document.getElementById('all_users')
const postbutton = document.getElementById('post_user')

const getData = () => {
axios.get('http://localhost:3000/users/').then(response => {
    console.log(response)
  });
}

const sendData = () => {
axios.post('http://localhost:3000/users/signup', {
    firstName: 'Thomas',
    lastName: 'Lindskov',
    tlfNumber:'17898',
    dateOfBirth: '1',
    password: '123'
}).then(peterplys => {
    console.log(peterplys.data)
})
    .catch(error => {
        console.log(error.message)
    });
}

getbutton.addEventListener("click", getData)
postbutton.addEventListener("click", sendData)