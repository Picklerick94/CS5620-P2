function Login() {
  const clientIndex = {};
  // redirect
  async function getCurrentUser() {
    let res;
    try {
      res = await fetch("/api/getCurrUser");
      const resUser = await res.json();
      if (resUser.isLoggedIn) {
        currentUser = resUser.user;
      } else {
        currentUser = null;
        redirect("login");
      }
    } catch (err) {
      // TODO implement error handling for the user;
      console.log(err);
      return showMessage("Error getting current User");
    }
  }

  // authenticate
  clientIndex.setupLogin = function () {
    const form = document.querySelector("form#login");
    let res;
    form.addEventListener("submit", async (evt) => {
      evt.preventDefault();
      console.log("Authenticating");
      try {
        res = await fetch("/api/authenticate", {
          method: "POST",
          body: new URLSearchParams(new FormData(form)),
        });
        const resUser = await res.json();
        console.log(66666666, resUser);
        if (resUser.isLoggedIn) {
          redirect("index");
        } else {
          showMessage(resUser.err);
        }
      } catch (err) {
        // TODO implement error handling for the user;
        console.log(err);
      }
    });
  };

  // Client side redirectiong
  function redirect(page) {
    setTimeout(() => {
      window.location.replace(page + ".html");
    }, 500);
  }

  return clientIndex;
}

export default Login();
