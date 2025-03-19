// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
const likeHearts = document.querySelectorAll(".like-glyph");

likeHearts.forEach(likeHeart => { //looping through the hearts and adding listener
  likeHeart.addEventListener("click", () => {
    console.log(likeHeart)
    handleLike(likeHeart)
  })
})

function handleLike(likeHeart) { //handle the heart click and send request to mimicserv..
  console.log("sending request to mimicServerCall ....")

  mimicServerCall()
    .then(() => {
      console.log("I have responded to you")
      togglelikeHeart(likeHeart);
    })
    .catch((error) => {
      console.log("I have received your error:", error)
      showError(error);
    })
}

function togglelikeHeart(likeHeart) {
  if (likeHeart.textContent === EMPTY_HEART) {
    console.log("I will change to red")
    likeHeart.textContent = FULL_HEART;
    likeHeart.classList.add("activated-heart") //make the heart red
  } else {
    likeHeart.textContent = EMPTY_HEART;
    console.log("Ok i will not be red")
    likeHeart.classList.remove("activated-heart") //no more red heart
  }
}

function showError(errorMsg) {
  const modal = document.getElementById("modal");
  const modalMsg = document.getElementById("modal-message");

  modalMsg.textContent = errorMsg;
  modal.classList.add("hidden");
}

setTimeout(() => {
  console.log("hiding error modal after 3 seconds...")
  modal.classList.add("hidden")
}, 3000)

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
