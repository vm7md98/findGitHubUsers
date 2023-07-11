//Test the JS Works or not:
console.log('Hello, World!')

// Create an array to store searched usernames
const usernames = []

//DOMContentLoaded + get the form reference:
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form')

    //Add a submit event listener:
    form.addEventListener('submit', async (event) => { //add 'async' here!

    //And now add an 'event.preventDefault()' to prevent the default behavior (the page reload) to happen:
    event.preventDefault()

    //Try an alert() call, to verify it's working:
        // alert('Pressed button!')

    //Now print the typed username in the alert():
    const username = document.querySelector('input').value

    //Prevent empty username: (Or use 'required' in html form)
    if (!username) {
        alert("Enter a username")
        return
      }
        // alert(username) //testing

    // Check if the username has already been searched
    if (usernames.includes(username)) {
        alert("You already searched for this")
        return
    }
    // Add the username to the array
    usernames.push(username)


    //Clear the input field after typing the username:
    document.querySelector("input").value = ""

    //^ Note that I used form and input as selectors because those are the only ones I have on the page. If I had multiple input elements, I would need to use 'id' or 'class' values to make the selectors more specific.

    //Use GitHub HTTP GET method on the URL https://api.github.com/users/<username>
    const respone = await fetch(`https://api.github.com/users/${username}`)

    if (respone.status === 200) { //This code is to Handle user not found:
    const data = await respone.json()
    console.log(data)

    //And since you are using 'await' don't forge to add 'async' on the form.addEventListener() up there!


    //Create a 'createCard()' function that that receives the data and generates an HTML string:
    //Pay attention to the backticks (`) that surround the code, they are important.
    const createCard = (data) => `
    <div class="px-4 py-5 sm:px-6 -ml-4 -mt-4 border-b border-gray-200 pb-8 flex justify-between items-center flex-wrap sm:flex-no-wrap">
    <div class="ml-4 mt-4">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <img class="h-12 w-12 rounded-full" src="${
            data.avatar_url
          }" alt="User avatar" />
        </div>
        <div class="ml-4">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            ${data.name}
            <span class="text-sm leading-5 text-gray-500">
                @${data.login}
            </span>
          </h3>
          <p class="text-sm leading-5 text-gray-500">
            ${
              data.public_repos
            } repositories. User since ${data.created_at.slice(0, 4)}
          </p>
          <p class="text-sm leading-5 text-gray-500">
            ${data.location || ""}
          </p>
          <p class="mt-1 text-sm leading-5 text-gray-500">
            ${data.bio}
          </p>
        </div>
      </div>
    </div>
    <div class="ml-4 mt-4 flex-shrink-0 flex">
      <span class="ml-3 inline-flex rounded-md shadow-sm">
        <a href="${
          data.html_url
        }"><button type="button" class="mr-2 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-50 active:text-gray-800">
          <span>
            Profile
          </span>
        </button>
        </a>
        <a href="${
          data.blog
        }"><button type="button" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-50 active:text-gray-800">
          <span>
            Website
          </span>
        </button>
        </a>
      </span>
    </div>
  </div>
`

    //Call it after you got the server response
    const card = createCard(data)

    //Then insert the HTML generated into the page, using insertAdjacentHTML():
    document.querySelector('#container').insertAdjacentHTML('afterbegin', card)

    } else {
    alert('Username not found')
    }

    //'beforeend' | 'afterbegin' (Last-User shows at top) and vice versa.

    //^ 'insertAdjacentHTML()' is a method we can call on any element, and we pass the beforeend parameter to position a string of HTML after its last child.


    })
})


//--------- Same but shorter form ---------///
// const usernames = []

// document.addEventListener('DOMContentLoaded', () => {
//   const form = document.querySelector('form')
//   form.addEventListener('submit', async (event) => {
//     event.preventDefault()
//     const username = document.querySelector('input').value

//     if (usernames.includes(username)) {
//       alert('You already searched for this')
//       return
//     }

//     usernames.push(username)

//     const response = await fetch(`https://api.github.com/users/${username}`)

//     if (response.status === 200) {
//       const data = await response.json()
//       const card = createCard(data)
//       document.querySelector('#container').insertAdjacentHTML('beforeend', card)
//       document.querySelector('input').value = ''
//     } else {
//       alert('Username not found')
//     }
//   })
// })

// const createCard = (data) => `
//   <div class="px-4 py-5 sm:px-6 -ml-4 -mt-4 border-b border-gray-200 pb-8 flex justify-between items-center">
//     <div class="ml-4 mt-4">
//       <div class="flex items-center">
//         <div class="flex-shrink-0">
//           <img class="h-12 w-12 rounded-full" src="${data.avatar_url}" alt="User avatar" />
//         </div>
//         <div class="ml-4">
//           <h3 class="text-lg leading-6 font-medium text-gray-900">
//             ${data.name}
//             <span class="text-sm leading-5 text-gray-500">
//                 @${data.login}
//             </span>
//           </h3>
//           <p class="text-sm leading-5 text-gray-500">
//             ${
//               data.public_repos
//             } repositories. User since ${data.created_at.slice(0, 4)}
//           </p>
//           <p class="text-sm leading-5 text-gray-500">
//             ${data.location || ''}
//           </p>
//           <p class="mt-1 text-sm leading-5 text-gray-500">
//             ${data.bio}
//           </p>
//         </div>
//       </div>
//     </div>
//     <div class="ml-4 mt-4 flex-shrink-0 flex">
//       <span class="ml-3 inline-flex rounded-md shadow-sm">
//         <a href="${
//           data.html_url
//         }"><button type="button" class="mr-2 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-50 active:text-gray-800">
//           <span>
//             Profile
//           </span>
//         </button>
//         </a>
//         <a href="${
//           data.blog
//         }"><button type="button" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-50 active:text-gray-800">
//           <span>
//             Website
//           </span>
//         </button>
//         </a>
//       </span>
//     </div>
//   </div>
// `