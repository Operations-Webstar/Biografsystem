import {Showing} from './Entities/Showing.js'

const data = new Showing('1','1','1','1')
console.log(data)

const getbutton = document.getElementById('all_users')
const postbutton = document.getElementById('post_user')

const getData = () => {
axios.get('http://localhost:3000/users/').then(response => {
    console.log(response.data)
  });
}

const sendData = () => {
axios.post('http://localhost:3000/cinemahalls', {
    hallName: 'lille Sal',
    rows: '10',
    columns:'8'
}).then(peterplys => {
    console.log(peterplys.data)
})
    .catch(error => {
        console.log(error.message)
    });
}

const get = () => {axios.get('http://localhost:3000/cinemahalls').then(result => {console.log(result)})}

getbutton.addEventListener("click", get)
postbutton.addEventListener("click", sendData)