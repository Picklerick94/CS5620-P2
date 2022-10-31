const tweets = [
  {
    username: "Yixiang Xie",
    twitterHandle: "@YixiangXie4",
    content:
      "Repainting is triggered each time real DOM is updated, and it becomes slow when there're too many nodes. React keeps a virtual DOM and updates it first, and chooses the right time to update real DOM. This reduces repainting and gains better performance.\n#WebDev @NortheasternCA",
    dateTime: "Oct 25 02:21:31",
    nuid: "",
    legalName: "",
  },
  {
    username: "Han Deng",
    twitterHandle: "@Cleoraaaa",
    content:
      "Week7 React has a concept of Virtual DOM. When there is a difference which occurs between VirtualDOM and real HTML DOM, changes are pushed to the realDOM. This is what makes it fast. #webdev @NortheasternCA",
    dateTime: "Oct 25 03:51:13",
    nuid: "",
    legalName: "",
  },
  {
    username: "Lingyi_Zheng",
    twitterHandle: "@LingyiZheng2",
    content:
      "I found out express session can provide cookies that operate login interception. For example, it could set the restricted time period for users to login to homepage, so that user are asked to log in again after specific time period #WebDev @NortheasternCA",
    dateTime: "Oct 25 01:23:19",
    nuid: "",
    legalName: "",
  },
  {
    username: "Yi Zhou",
    twitterHandle: "@YiZhou88874392",
    content:
      'In MVC, data flows in no single direction and makes it hard to track the exact location of a state when the architecture gets complicated. Facebook released Flux to simplify the data flow to single directional by cashing and handling data with a "store"\n#WebDev @NortheasternCA',
    dateTime: "Oct 25 01:19:21",
    nuid: "",
    legalName: "",
  },
  {
    username: "Zhiyi Jin",
    twitterHandle: "@victoryjzy",
    content:
      "React fully leverages the capabilities of the JS language itself to write the UI, rather than making wheels to enhance the functionality of HTML. #WebDev @NortheasternCA",
    dateTime: "Oct 25 01:09:18",
    nuid: "",
    legalName: "",
  },
  {
    username: "Xingjian Bi",
    twitterHandle: "@HarryBi17",
    content:
      "#WebDev @NortheasternCA I’m amazed by the idea of react virtual DOM where stores in the memory. It’s lite weight and cheap to create. We can change our state of the component to update the virtual DOM and it will automatically update the browser DOM.",
    dateTime: "Oct 25 01:09:18",
    nuid: "",
    legalName: "",
  },
];

const content = document.querySelector(".content");

const displayContent = () => {
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }

  tweets.forEach((tweet) => {
    const contentCard = document.createElement("div");

    contentCard.className = "content-card";
    contentCard.innerHTML = `
      <div class="personal-info">
        <img src="img/avatar-tweet.png" alt="The profile image for the twitter user.">
        <div class="info-list">
          <div class="first-row">
            <span class="student-name">${
              tweet.legalName || tweet.username
            }</span>
            <span class="nuid">${tweet.nuid ? "NUID" + tweet.nuid : ""}</span>
          </div>
          <div class="second-row">
            <span class="twitter-handle">${tweet.twitterHandle}</span>
          </div>
        </div>
      </div>
      <div class="date-time">${tweet.dateTime}</div>
      <div class="tweet-content">${tweet.content}</div>  
      <div class="operation">
        <button class="operation-button">Detail</button>
        <button class="operation-button">Edit</button>
        <button class="operation-button">Delete</button>
      </div>
    `;

    content.appendChild(contentCard);
  });
};

displayContent();

const createButton = document.querySelector("#create-button");
const modal = document.querySelector(".modal");

createButton.addEventListener("click", () => {
  modal.style.display = "block";
});

modal.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

const cancelButton = document.querySelector(".cancel-button");

cancelButton.addEventListener("click", (event) => {
  modal.style.display = "none";
});

const createStudentForm = document.querySelector(".create-student-form");
const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);

  const tweet = tweets.find(
    (tweet) => tweet.twitterHandle === formProps.twitterHandle
  );
  tweet.nuid = formProps.nuid;
  tweet.legalName = formProps.legalName;
  displayContent();
  createStudentForm.reset();
  modal.style.display = "none";
};

createStudentForm.addEventListener("submit", handleSubmit);
